import { Buff, BuffEffect, Scaling } from "afnm-types";
import iconAsset from '../../assets/techniques/Inks.png';
import { paintFloodState, paintFloodTrigger } from "./1/paintFlood";
import { paintShieldState, paintShieldTrigger } from "./1/paintShield";
import { paintEarthquakeState, paintEarthquakeTrigger } from "./1/paintEarthquake";
import { sketchTechniquesSignatures } from "./sketchTechniquesSignatures";

export const paintingTechsType = 'Painting';
export const paintingSurfaceBuffType = 'Painting Surfaces';

export const inks: Buff = {
    name: 'Inks',
    icon: iconAsset,
    canStack: true,
    stats: undefined,
    effectHint: 'Spent to activate certain Painting techniques',
    stacks: 1,
    cantUpgrade: true
}

export interface SketchTechniqueActiveEffect {
    damage?: number;
    barrier?: number;
    heal?: number;
    temphp?: number;
    buffSelf?: Buff[];
    buffTarget?: Buff[];
}

export interface SketchTechniqueEffect {
    power?: number;
    artefactPower?: number;
    protection?: number;
    defense?: number;
    dr?: number;
    maxHealth?: number;
    maxBarrier?: number;
    maxToxicity?: number;
    itemEffectiveness?: number;
    critChance?: number;
    critDamage?: number;
    overcrit?: number;
    barrierEffectiveness?: number;
    damageBoost?: number;
    barrierBoost?: number;
    healingBoost?: number;
    temphpBoost?: number;
    barrierBleed?: number;
    bulwarkOverheal?: number;
    vitalOverheal?: number;
    bloodBoost?: number;
    blossomBoost?: number;
    fistBoost?: number;
    cloudBoost?: number;
    weaponBoost?: number;
    celestialBoost?: number;
    bloodResistance?: number;
    blossomResistance?: number;
    fistResistance?: number;
    cloudResistance?: number;
    weaponResistance?: number;
    celestialResistance?: number;
    vulnerability?: number;
    weakness?: number;
    itemPerRound?: number;
    dropletBoost?: number;
    openerBoost?: number;
    finisherBoost?: number;
    beforeTechEffects?: SketchTechniqueActiveEffect;
    afterTechEffects?: SketchTechniqueActiveEffect;
    roundStartEffects?: SketchTechniqueActiveEffect;
    roundEndEffects?: SketchTechniqueActiveEffect;
}

export interface SketchTechniqueSignature {
    name: string;
    stateKey: string;
    trigger: string;
    playerManifestationEffects: SketchTechniqueEffect;
    enemyManifestationEffects: SketchTechniqueEffect;
}

const PREFIX_MAP: Record<TimingPhase, Record<TargetKind, string>> = {
    afterTechEffects: { buffSelf: 'AETP', buffTarget: 'AETT' },
    beforeTechEffects: { buffSelf: 'BETP', buffTarget: 'BETT' },
    roundStartEffects: { buffSelf: 'RSEP', buffTarget: 'RSET' }, 
    roundEndEffects: { buffSelf: 'REEP', buffTarget: 'REET' }  
};

const PHASE_PREFIXES = {
    afterTechEffects: 'AET',
    beforeTechEffects: 'BET',
    roundStartEffects: 'RSE',
    roundEndEffects: 'REE'
} as const;
type PhaseKey = keyof typeof PHASE_PREFIXES;

function buildBuffInitialState(signatures: SketchTechniqueSignature[], isPlayer: boolean): Record<string, Scaling> {
    const formulasMap: Record<string, string[]> = {};

    const sourceKey = isPlayer ? 'playerManifestationEffects' : 'enemyManifestationEffects';

    const addFormulaPart = (key: string, part: string) => {
        if (!formulasMap[key]) formulasMap[key] = [];
        formulasMap[key].push(part);
    };

    for (const sig of signatures) {
        const effects = sig[sourceKey];

        for (const [key, val] of Object.entries(effects)) {
            if (val === undefined) continue;

            if (typeof val === 'number') {
                const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                addFormulaPart(`paint${capitalizedKey}`, `${sig.stateKey} * ${val}`);
            }

            else if (typeof val === 'object' && key in PHASE_PREFIXES) {
                const phaseKey = key as PhaseKey;
                const phaseObj = val as SketchTechniqueActiveEffect;

                const numericPhaseKeys = ['damage', 'barrier', 'heal', 'temphp'] as const;
                for (const numKey of numericPhaseKeys) {
                    const numVal = phaseObj[numKey];
                    if (typeof numVal === 'number') {
                        const capitalizedNumKey = numKey.charAt(0).toUpperCase() + numKey.slice(1);
                        const stateKey = `${PHASE_PREFIXES[phaseKey]}${capitalizedNumKey}`;
                        addFormulaPart(stateKey, `${sig.stateKey} * ${numVal}`);
                    }
                }

                const targetPhaseKeys = ['buffSelf', 'buffTarget'] as const;
                for (const targetKey of targetPhaseKeys) {
                    const buffs = phaseObj[targetKey];
                    if (Array.isArray(buffs)) {
                        const targetPrefix = PREFIX_MAP[phaseKey][targetKey];
                        for (const buff of buffs) {
                            const stateKey = `${targetPrefix}${buff.name}`;

                            addFormulaPart(stateKey, `${sig.stateKey} * 1`);
                        }
                    }
                }
            }
        }
    }

    const finalState: Record<string, Scaling> = {};
    for (const [stateKey, formulaParts] of Object.entries(formulasMap)) {
        finalState[stateKey] = {
            value: 1,
            stat: undefined,
            eqn: formulaParts.join(' + ')
        };
    }

    return finalState;
}

type ManifestationSource = 'playerManifestationEffects' | 'enemyManifestationEffects';
type TimingPhase = 'afterTechEffects' | 'beforeTechEffects' | 'roundStartEffects' | 'roundEndEffects';
type TargetKind = 'buffSelf' | 'buffTarget';

const extractBuffs = (
    source: ManifestationSource, 
    phase: TimingPhase, 
    target: TargetKind
): BuffEffect[] => {
    const prefix = PREFIX_MAP[phase][target];

    return sketchTechniquesSignatures.reduce<BuffEffect[]>((acc, sign) => {
        const buffs = sign[source]?.[phase]?.[target];
        
        if (buffs) {
            const mappedBuffs = buffs.map(buff => ({
                kind: target,
                buff: buff,
                amount: { value: 1, stat: undefined, eqn: `${prefix}${buff.name}` },
                hideBuff: true
            } as BuffEffect));
            
            acc.push(...mappedBuffs);
        }
        
        return acc;
    }, []);
};

const createAdditionalBuffEffects = (phase: PhaseKey): BuffEffect[] => {
    const prefix = PHASE_PREFIXES[phase];

    return [
        {
            kind: 'damage',
            amount: {value: 1, stat: 'power', eqn: `${prefix}Damage ?? 0` },
        },
        {
            kind: 'barrier',
            amount: {value: 1, stat: 'power', eqn: `${prefix}Barrier ?? 0` }
        },
        {
            kind: 'heal',
            amount: {value: 1, stat: 'power', eqn: `${prefix}Heal ?? 0` }
        },
        {
            kind: 'temporaryHealth',
            amount: {value: 1, stat: 'power', eqn: `${prefix}Temphp ?? 0` }
        },
    ]
}

export const createPaintingSurface = (name: string, icon: string, freeSpace: number, maxInstances: number): Buff => {
    const playerAfterTechSelf = extractBuffs('playerManifestationEffects', 'afterTechEffects', 'buffSelf');
    const playerAfterTechTarget = extractBuffs('playerManifestationEffects', 'afterTechEffects', 'buffTarget');
    const playerBeforeTechSelf = extractBuffs('playerManifestationEffects', 'beforeTechEffects', 'buffSelf');
    const playerBeforeTechTarget = extractBuffs('playerManifestationEffects', 'beforeTechEffects', 'buffTarget');
    const playerRoundStartSelf = extractBuffs('playerManifestationEffects', 'roundStartEffects', 'buffSelf');
    const playerRoundStartTarget = extractBuffs('playerManifestationEffects', 'roundStartEffects', 'buffTarget');
    const playerRoundEndSelf = extractBuffs('playerManifestationEffects', 'roundEndEffects', 'buffSelf');
    const playerRoundEndTarget = extractBuffs('playerManifestationEffects', 'roundEndEffects', 'buffTarget');

    const enemyAfterTechSelf = extractBuffs('enemyManifestationEffects', 'afterTechEffects', 'buffSelf');
    const enemyAfterTechTarget = extractBuffs('enemyManifestationEffects', 'afterTechEffects', 'buffTarget');
    const enemyBeforeTechSelf = extractBuffs('enemyManifestationEffects', 'beforeTechEffects', 'buffSelf');
    const enemyBeforeTechTarget = extractBuffs('enemyManifestationEffects', 'beforeTechEffects', 'buffTarget');
    const enemyRoundStartSelf = extractBuffs('enemyManifestationEffects', 'roundStartEffects', 'buffSelf');
    const enemyRoundStartTarget = extractBuffs('enemyManifestationEffects', 'roundStartEffects', 'buffTarget');
    const enemyRoundEndSelf = extractBuffs('enemyManifestationEffects', 'roundEndEffects', 'buffSelf');
    const enemyRoundEndTarget = extractBuffs('enemyManifestationEffects', 'roundEndEffects', 'buffTarget');

    const paintingSurfaceActivatePlayerBuff: Buff = {
        name: `${name}: Manifested Painting`,
        icon,
        allowMultipleInstances: maxInstances > 1,
        maxInstances,
        canStack: true,
        stacks: 1,
        stats: {
            power: { value: 0.01, stat: 'power', eqn: 'paintPower', tooltipCondition: '0'},
            protection: {value: 1, stat: undefined, eqn: 'paintProtection', tooltipCondition: '0'},
            barrierMitigation: {value: 1, stat: undefined, eqn: 'paintBarrierMitigation', tooltipCondition: '0'},
            maxbarrier: {value: 0.01, stat: 'maxbarrier', eqn: 'paintMaxBarrier', tooltipCondition: '0'},
        },
        beforeTechniqueEffects: [
            ...createAdditionalBuffEffects('beforeTechEffects'),
            ...playerBeforeTechSelf,
            ...playerBeforeTechTarget,
        ],
        afterTechniqueEffects: [
            ...createAdditionalBuffEffects('afterTechEffects'),
            ...playerAfterTechSelf,
            ...playerAfterTechTarget
        ],
        onRoundStartEffects: [
            ...createAdditionalBuffEffects('roundStartEffects'),
            ...playerRoundStartSelf,
            ...playerRoundStartTarget,
        ],
        onRoundEffects: [
            ...createAdditionalBuffEffects('roundEndEffects'),
            ...playerRoundEndSelf,
            ...playerRoundEndTarget,
            {
                kind: 'add',
                amount: {value: -1, stat: undefined}
            }
        ],
        tooltip: `Manifested painting.`,
        tooltipFragments: {
            fragments: [
                {
                    tooltip: 'Power: <num>+{paintPower}%</num>',
                    condition: 'paintPower > 0'
                },
                {
                    tooltip: 'Protection: <num>+{paintProtection}</num>',
                    condition: 'paintProtection > 0'
                },
                {
                    tooltip: 'Max Barrier: <num>+{paintMaxBarrier}%</num>',
                    condition: 'paintMaxBarrier > 0'
                },
                {
                    tooltip: 'Barrier Effectiveness: <num>+{paintBarrierMitigation}%</num>',
                    condition: 'paintBarrierMitigation > 0'
                },
                {
                    tooltip: 'After each technique deal <num>{damage.amount}</num> damage.', // Wrong damage number, need to fix
                    condition: 'paintDmgAfterTech > 0'
                },
                {
                    tooltip: 'At the end of each round lose a stack.',
                    condition: '1'
                },
            ],
            separator: '<br/>'
        }
    }

    const paintingSurfaceActivateEnemyBuff: Buff = {
    name: `${name}: Manifested Painting (Enemy)`,
    icon,
    allowMultipleInstances: maxInstances > 1,
    maxInstances,
    canStack: true,
    stacks: 1,
    stats: {
        weakness: { value: 1, stat: undefined, additiveEqn: 'paintWeakness', tooltipCondition: '0'},
    },
    beforeTechniqueEffects: [
        ...createAdditionalBuffEffects('beforeTechEffects'),
        ...enemyBeforeTechSelf,
        ...enemyBeforeTechTarget,
    ],
    afterTechniqueEffects: [
        ...createAdditionalBuffEffects('afterTechEffects'),
        ...enemyAfterTechSelf,
        ...enemyAfterTechTarget
    ],
    onRoundStartEffects: [
        ...createAdditionalBuffEffects('roundStartEffects'),
        ...enemyRoundStartSelf,
        ...enemyRoundStartTarget,
    ],
    onRoundEffects: [
        ...createAdditionalBuffEffects('roundEndEffects'),
        ...enemyRoundEndSelf,
        ...enemyRoundEndTarget,
        {
            kind: 'add',
            amount: {value: -1, stat: undefined}
        }
    ],
    tooltip: `Manifested painting.`,
    tooltipFragments: {
        fragments: [
            {
                tooltip: 'Weakness: <num>+{paintWeakness}%</num>',
                condition: 'paintWeakness > 0'
            },
            {
                tooltip: 'At the end of each round lose a stack.',
                condition: '1'
            },
        ],
        separator: '<br/>'
    }
}

    const createTriggeredBuffEffect = (trigger: string, stateKey: string): 
        {
            trigger: string;
            effects: BuffEffect[];
            listenToOpponent?: boolean;
            triggerOnSelfTick?: boolean;
        } => (
        {
            trigger,
            effects: [
                {
                    kind: 'setState',
                    key: stateKey,
                    value: { value: 1, stat: undefined },
                    mode: 'add',
                },
                {
                    kind: 'setState',
                    key: 'usedSpace',
                    value: { value: 1, stat: undefined },
                    mode: 'add',
                },
                {
                    kind: 'negate',
                    condition: {
                        kind: 'condition',
                        condition: 'usedSpace >= freeSpace'
                    }
                },
                {
                    kind: 'buffSelf',
                    buff: paintingSurfaceActivatePlayerBuff,
                    amount: { value: 3, stat: undefined },
                    condition: {
                        kind: 'condition',
                        condition: 'usedSpace >= freeSpace'
                    },
                    hideBuff: true,
                    initialState: buildBuffInitialState(sketchTechniquesSignatures, true),
                },
                {
                    kind: 'buffTarget',
                    buff: paintingSurfaceActivateEnemyBuff,
                    amount: { value: 3, stat: undefined },
                    condition: {
                        kind: 'condition',
                        condition: 'usedSpace >= freeSpace'
                    },
                    hideBuff: true,
                    initialState: buildBuffInitialState(sketchTechniquesSignatures, false),
                }
            ]
        }
    )

    const paintingSurfaceBuff: Buff = {
        name,
        icon,
        canStack: false,
        stacks: 1,
        stats: {},
        initialState: { freeSpace: `${freeSpace}`, usedSpace: '0', paintFlood: '0', paintEarthquake: '0', paintShield: '0' },
        triggeredBuffEffects: [
            createTriggeredBuffEffect(paintFloodTrigger, paintFloodState),
            createTriggeredBuffEffect(paintEarthquakeTrigger, paintEarthquakeState),
            createTriggeredBuffEffect(paintShieldTrigger, paintShieldState),
        ],
        tooltip: `${name} for painting, use sketch techniques to add sketches on it. With this ${name} you can manifest ${maxInstances} paintings at the same time.`,
        stateTooltip: `<br/>Spaces used: <num>{usedSpace}</num> / <num>{freeSpace}</num><br/>Current effects:`,
        tooltipFragments: {
            fragments: [
                {
                    tooltip: '<name>Flood</name>',
                    condition: `${paintFloodState} > 0`
                },
                {
                    tooltip: '<name>Earthquake</name>',
                    condition: `${paintEarthquakeState} > 0`
                },
                {
                    tooltip: '<name>Shield</name>',
                    condition: `${paintShieldState} > 0`
                }
            ],
            separator: ', '
        },
        type: 'none',
        noneType: paintingTechsType,
        buffType: paintingSurfaceBuffType
    }

    return paintingSurfaceBuff;
}