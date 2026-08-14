import { Buff, BuffEffect, Scaling, TooltipFragment } from "afnm-types";
import { ManifestationSource, PHASE_PREFIXES, PhaseKey, PREFIX_MAP, SketchTechniqueActiveEffect, SketchTechniqueEffect, SketchTechniqueSignature, TargetKind, TimingPhase } from "./sketchTypes";
import { createStateKey, createStateKeyWithoutTypeCheck } from "./createStateKey";
import { sketchTechniquesSignatures } from "../sketchTechniquesSignatures";
import { paintingSurfaceBuffType, paintingTechsType } from "../painting";

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
                addFormulaPart(createStateKeyWithoutTypeCheck(key), `${sig.stateKey} * ${val}`);
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
            amount: {value: 1, stat: 'power', eqn: `${prefix}Damage` },
        },
        {
            kind: 'barrier',
            amount: {value: 1, stat: 'power', eqn: `${prefix}Barrier` }
        },
        {
            kind: 'heal',
            amount: {value: 1, stat: 'power', eqn: `${prefix}Heal` }
        },
        {
            kind: 'temporaryHealth',
            amount: {value: 1, stat: 'power', eqn: `${prefix}Temphp` }
        },
    ]
}

const createStatLine = (baseValue: number, stat: Scaling['stat'], stateVariableName: keyof SketchTechniqueEffect): Scaling => {
    return {value: baseValue, stat, eqn: createStateKey(stateVariableName), tooltipCondition: '0'}
}

const buffStats: Buff["stats"] = {
    power: createStatLine(0.01, 'power', 'power'),
    artefactpower: createStatLine(0.01, 'artefactpower', 'artefactPower'),
    protection: createStatLine(1, undefined, 'protection'),
    defense: createStatLine(1, undefined, 'defense'),
    dr: createStatLine(1, undefined, 'dr'),
    maxhp: createStatLine(0.01, 'maxhp', 'maxHealth'),
    maxbarrier: createStatLine(0.01, 'maxbarrier', 'maxBarrier'),
    maxtoxicity: createStatLine(0.01, 'maxtoxicity', 'maxToxicity'),
    itemEffectiveness: createStatLine(1, undefined, 'itemEffectiveness'),
    critchance: createStatLine(1, undefined, 'critChance'),
    critmultiplier: createStatLine(1, undefined, 'critDamage'),
    overcrit: createStatLine(1, undefined, 'overcrit'),
    barrierMitigation: createStatLine(1, undefined, 'barrierEffectiveness'),
    damageBoost: createStatLine(1, undefined, 'damageBoost'),
    barrierBoost: createStatLine(1, undefined, 'barrierBoost'),
    healingBoost: createStatLine(1, undefined, 'healingBoost'),
    temphpBoost: createStatLine(1, undefined, 'temphpBoost'),
    barrierBleed: createStatLine(1, undefined, 'barrierBleed'),
    overheal: createStatLine(1, undefined, 'bulwarkOverheal'),
    vitalOverheal: createStatLine(1, undefined, 'vitalOverheal'),
    bloodBoost: createStatLine(1, undefined, 'bloodBoost'),
    blossomBoost: createStatLine(1, undefined, 'blossomBoost'),
    fistBoost: createStatLine(1, undefined, 'fistBoost'),
    cloudBoost: createStatLine(1, undefined, 'cloudBoost'),
    weaponBoost: createStatLine(1, undefined, 'weaponBoost'),
    celestialBoost: createStatLine(1, undefined, 'celestialBoost'),
    bloodResistance: createStatLine(1, undefined, 'bloodResistance'),
    blossomResistance: createStatLine(1, undefined, 'blossomResistance'),
    fistResistance: createStatLine(1, undefined, 'fistResistance'),
    cloudResistance: createStatLine(1, undefined, 'cloudResistance'),
    weaponResistance: createStatLine(1, undefined, 'weaponResistance'),
    celestialResistance: createStatLine(1, undefined, 'celestialResistance'),
    vulnerability: createStatLine(1, undefined, 'vulnerability'),
    weakness: createStatLine(1, undefined, 'weakness'),
    pillsPerRound: createStatLine(1, undefined, 'itemsPerRound'),
    dropletBoost: createStatLine(1, undefined, 'dropletBoost'),
    openerBoost: createStatLine(1, undefined, 'openerBoost'),
    finisherBoost: createStatLine(1, undefined, 'finisherBoost'),
};

const buffBaseTooltipFragments: TooltipFragment[] = [
    {
        tooltip: `Power: <num>+{${createStateKey('power')}}%</num>`,
        condition: `${createStateKey('power')} > 0`
    },
    {
        tooltip: `Artefact Power: <num>+{${createStateKey('artefactPower')}}%</num>`,
        condition: `${createStateKey('artefactPower')} > 0`
    },
    {
        tooltip: `Protection: <num>+{${createStateKey('protection')}}</num>`,
        condition: `${createStateKey('protection')} > 0`
    },
    {
        tooltip: `Defense: <num>+{${createStateKey('defense')}}</num>`,
        condition: `${createStateKey('defense')} > 0`
    },
    {
        tooltip: `Damage Resistance: <num>+{${createStateKey('dr')}}%</num>`,
        condition: `${createStateKey('dr')} > 0`
    },
    {
        tooltip: `Max Health: <num>+{${createStateKey('maxHealth')}}%</num>`,
        condition: `${createStateKey('maxHealth')} > 0`
    },
    {
        tooltip: `Max Barrier: <num>+{${createStateKey('maxBarrier')}}%</num>`,
        condition: `${createStateKey('maxBarrier')} > 0`
    },
    {
        tooltip: `Max Toxicity: <num>+{${createStateKey('maxToxicity')}}%</num>`,
        condition: `${createStateKey('maxToxicity')} > 0`
    },
    {
        tooltip: `Item Effectiveness: <num>+{${createStateKey('itemEffectiveness')}}%</num>`,
        condition: `${createStateKey('itemEffectiveness')} > 0`
    },
    {
        tooltip: `Crit Chance: <num>+{${createStateKey('critChance')}}%</num>`,
        condition: `${createStateKey('critChance')} > 0`
    },
    {
        tooltip: `Crit Multiplier: <num>+{${createStateKey('critDamage')}}%</num>`,
        condition: `${createStateKey('critDamage')} > 0`
    },
    {
        tooltip: `Overcrit: <num>+{${createStateKey('overcrit')}}%</num>`,
        condition: `${createStateKey('overcrit')} > 0`
    },
    {
        tooltip: `Barrier Effectiveness: <num>+{${createStateKey('barrierEffectiveness')}}%</num>`,
        condition: `${createStateKey('barrierEffectiveness')} > 0`
    },
    {
        tooltip: `Damage Boost: <num>+{${createStateKey('damageBoost')}}%</num>`,
        condition: `${createStateKey('damageBoost')} > 0`
    },
    {
        tooltip: `Barrier Boost: <num>+{${createStateKey('barrierBoost')}}%</num>`,
        condition: `${createStateKey('barrierBoost')} > 0`
    },
    {
        tooltip: `Healing Boost: <num>+{${createStateKey('healingBoost')}}%</num>`,
        condition: `${createStateKey('healingBoost')} > 0`
    },
    {
        tooltip: `Temporary Health Boost: <num>+{${createStateKey('temphpBoost')}}%</num>`,
        condition: `${createStateKey('temphpBoost')} > 0`
    },
    {
        tooltip: `Barrier Bleed: <num>+{${createStateKey('barrierBleed')}}%</num>`,
        condition: `${createStateKey('barrierBleed')} > 0`
    },
    {
        tooltip: `Bulwark Overheal: <num>+{${createStateKey('bulwarkOverheal')}}%</num>`,
        condition: `${createStateKey('bulwarkOverheal')} > 0`
    },
    {
        tooltip: `Vital Overheal: <num>+{${createStateKey('vitalOverheal')}}%</num>`,
        condition: `${createStateKey('vitalOverheal')} > 0`
    },
    {
        tooltip: `Blood Boost: <num>+{${createStateKey('bloodBoost')}}%</num>`,
        condition: `${createStateKey('bloodBoost')} > 0`
    },
    {
        tooltip: `Blossom Boost: <num>+{${createStateKey('blossomBoost')}}%</num>`,
        condition: `${createStateKey('blossomBoost')} > 0`
    },
    {
        tooltip: `Fist Boost: <num>+{${createStateKey('fistBoost')}}%</num>`,
        condition: `${createStateKey('fistBoost')} > 0`
    },
    {
        tooltip: `Cloud Boost: <num>+{${createStateKey('cloudBoost')}}%</num>`,
        condition: `${createStateKey('cloudBoost')} > 0`
    },
    {
        tooltip: `Weapon Boost: <num>+{${createStateKey('weaponBoost')}}%</num>`,
        condition: `${createStateKey('weaponBoost')} > 0`
    },
    {
        tooltip: `Celestial Boost: <num>+{${createStateKey('celestialBoost')}}%</num>`,
        condition: `${createStateKey('celestialBoost')} > 0`
    },
    {
        tooltip: `Blood Resistance: <num>+{${createStateKey('bloodResistance')}}%</num>`,
        condition: `${createStateKey('bloodResistance')} > 0`
    },
    {
        tooltip: `Blossom Resistance: <num>+{${createStateKey('blossomResistance')}}%</num>`,
        condition: `${createStateKey('blossomResistance')} > 0`
    },
    {
        tooltip: `Fist Resistance: <num>+{${createStateKey('fistResistance')}}%</num>`,
        condition: `${createStateKey('fistResistance')} > 0`
    },
    {
        tooltip: `Cloud Resistance: <num>+{${createStateKey('cloudResistance')}}%</num>`,
        condition: `${createStateKey('cloudResistance')} > 0`
    },
    {
        tooltip: `Weapon Resistance: <num>+{${createStateKey('weaponResistance')}}%</num>`,
        condition: `${createStateKey('weaponResistance')} > 0`
    },
    {
        tooltip: `Celestial Resistance: <num>+{${createStateKey('celestialResistance')}}%</num>`,
        condition: `${createStateKey('celestialResistance')} > 0`
    },
    {
        tooltip: `Vulnerability: <num>+{${createStateKey('vulnerability')}}%</num>`,
        condition: `${createStateKey('vulnerability')} > 0`
    },
    {
        tooltip: `Weakness: <num>+{${createStateKey('weakness')}}%</num>`,
        condition: `${createStateKey('weakness')} > 0`
    },
    {
        tooltip: `Items Per Round: <num>+{${createStateKey('itemsPerRound')}}</num>`,
        condition: `${createStateKey('itemsPerRound')} > 0`
    },
    {
        tooltip: `Droplet Boost: <num>+{${createStateKey('dropletBoost')}}%</num>`,
        condition: `${createStateKey('dropletBoost')} > 0`
    },
    {
        tooltip: `Opener Boost: <num>+{${createStateKey('openerBoost')}}%</num>`,
        condition: `${createStateKey('openerBoost')} > 0`
    },
    {
        tooltip: `Finisher Boost: <num>+{${createStateKey('finisherBoost')}}%</num>`,
        condition: `${createStateKey('finisherBoost')} > 0`
    },
    {
        tooltip: 'Before each technique deal <num>{damage.amount}</num> damage.', // Wrong numberы, need to fix!!!!!!!!
        condition: 'BETDamage > 0'
    },
    {
        tooltip: 'Before each technique gain <num>{barrier.amount}</num> barrier.', // Wrong numberы, need to fix!!!!!!!!
        condition: 'BETBarrier > 0'
    },
    {
        tooltip: 'Before each technique heal <num>{healing.amount}</num> health.', // Wrong numberы, need to fix!!!!!!!!
        condition: 'BETHeal > 0'
    },
    {
        tooltip: 'Before each technique gain <num>{temphp.amount}</num> temporary health.', // Wrong numberы, need to fix!!!!!!!!
        condition: 'BETTemphp > 0'
    },
    {
        tooltip: 'After each technique deal <num>{damage.amount}</num> damage.', // Wrong numberы, need to fix!!!!!!!!
        condition: 'AETDamage > 0'
    },
    {
        tooltip: 'After each technique gain <num>{barrier.amount}</num> barrier.', // Wrong numberы, need to fix!!!!!!!!
        condition: 'AETBarrier > 0'
    },
    {
        tooltip: 'After each technique heal <num>{healing.amount}</num> health.', // Wrong numberы, need to fix!!!!!!!!
        condition: 'AETHeal > 0'
    },
    {
        tooltip: 'After each technique gain <num>{temphp.amount}</num> temporary health.', // Wrong numberы, need to fix!!!!!!!!
        condition: 'AETTemphp > 0'
    },
    {
        tooltip: 'At the start of each round deal <num>{damage.amount}</num> damage.', // Wrong numberы, need to fix!!!!!!!!
        condition: 'RSEDamage > 0'
    },
    {
        tooltip: 'At the start of each round gain <num>{barrier.amount}</num> barrier.', // Wrong numberы, need to fix!!!!!!!!
        condition: 'RSEBarrier > 0'
    },
    {
        tooltip: 'At the start of each round heal <num>{healing.amount}</num> health.', // Wrong numberы, need to fix!!!!!!!!
        condition: 'RSEHeal > 0'
    },
    {
        tooltip: 'At the start of each round gain <num>{temphp.amount}</num> temporary health.', // Wrong numberы, need to fix!!!!!!!!
        condition: 'RSETemphp > 0'
    },
    {
        tooltip: 'At the end of each round deal <num>{damage.amount}</num> damage.', // Wrong numberы, need to fix!!!!!!!!
        condition: 'REEDamage > 0'
    },
    {
        tooltip: 'At the end of each round gain <num>{barrier.amount}</num> barrier.', // Wrong numberы, need to fix!!!!!!!!
        condition: 'REEBarrier > 0'
    },
    {
        tooltip: 'At the end of each round heal <num>{healing.amount}</num> health.', // Wrong numberы, need to fix!!!!!!!!
        condition: 'REEHeal > 0'
    },
    {
        tooltip: 'At the end of each round gain <num>{temphp.amount}</num> temporary health.', // Wrong numberы, need to fix!!!!!!!!
        condition: 'REETemphp > 0'
    },
]

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
        stats: buffStats,
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
                ...buffBaseTooltipFragments,
                ...playerBeforeTechSelf.filter(b => b.kind === 'buffSelf').map(b => ({
                    tooltip: `Before each technique gain 1 stack of <name>${b.buff.displayName ?? b.buff.name}</name>.`,
                    condition: ''
                })),
                ...playerBeforeTechTarget.filter(b => b.kind === 'buffTarget').map(b => ({
                    tooltip: `Before each technique inflict 1 stack of <name>${b.buff.displayName ?? b.buff.name}</name>.`,
                    condition: ''
                })),
                ...playerAfterTechSelf.filter(b => b.kind === 'buffSelf').map(b => ({
                    tooltip: `After each technique gain 1 stack of <name>${b.buff.displayName ?? b.buff.name}</name>.`,
                    condition: ''
                })),
                ...playerAfterTechTarget.filter(b => b.kind === 'buffTarget').map(b => ({
                    tooltip: `After each technique inflict 1 stack of <name>${b.buff.displayName ?? b.buff.name}</name>.`,
                    condition: ''
                })),
                ...playerRoundStartSelf.filter(b => b.kind === 'buffSelf').map(b => ({
                    tooltip: `At the start of each round gain 1 stack of <name>${b.buff.displayName ?? b.buff.name}</name>.`,
                    condition: ''
                })),
                ...playerRoundStartTarget.filter(b => b.kind === 'buffTarget').map(b => ({
                    tooltip: `At the start of each round inflict 1 stack of <name>${b.buff.displayName ?? b.buff.name}</name>.`,
                    condition: ''
                })),
                ...playerRoundEndSelf.filter(b => b.kind === 'buffSelf').map(b => ({
                    tooltip: `At the end of each round gain 1 stack of <name>${b.buff.displayName ?? b.buff.name}</name>.`,
                    condition: ''
                })),
                ...playerRoundEndTarget.filter(b => b.kind === 'buffTarget').map(b => ({
                    tooltip: `At the end of each round inflict 1 stack of <name>${b.buff.displayName ?? b.buff.name}</name>.`,
                    condition: ''
                })),
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
    stats: buffStats,
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
                ...buffBaseTooltipFragments,
                ...enemyBeforeTechSelf.filter(b => b.kind === 'buffSelf').map(b => ({
                    tooltip: `Before each technique gain 1 stack of <name>${b.buff.displayName ?? b.buff.name}</name>.`,
                    condition: ''
                })),
                ...enemyBeforeTechTarget.filter(b => b.kind === 'buffTarget').map(b => ({
                    tooltip: `Before each technique inflict 1 stack of <name>${b.buff.displayName ?? b.buff.name}</name>.`,
                    condition: ''
                })),
                ...enemyAfterTechSelf.filter(b => b.kind === 'buffSelf').map(b => ({
                    tooltip: `After each technique gain 1 stack of <name>${b.buff.displayName ?? b.buff.name}</name>.`,
                    condition: ''
                })),
                ...enemyAfterTechTarget.filter(b => b.kind === 'buffTarget').map(b => ({
                    tooltip: `After each technique inflict 1 stack of <name>${b.buff.displayName ?? b.buff.name}</name>.`,
                    condition: ''
                })),
                ...enemyRoundStartSelf.filter(b => b.kind === 'buffSelf').map(b => ({
                    tooltip: `At the start of each round gain 1 stack of <name>${b.buff.displayName ?? b.buff.name}</name>.`,
                    condition: ''
                })),
                ...enemyRoundStartTarget.filter(b => b.kind === 'buffTarget').map(b => ({
                    tooltip: `At the start of each round inflict 1 stack of <name>${b.buff.displayName ?? b.buff.name}</name>.`,
                    condition: ''
                })),
                ...enemyRoundEndSelf.filter(b => b.kind === 'buffSelf').map(b => ({
                    tooltip: `At the end of each round gain 1 stack of <name>${b.buff.displayName ?? b.buff.name}</name>.`,
                    condition: ''
                })),
                ...enemyRoundEndTarget.filter(b => b.kind === 'buffTarget').map(b => ({
                    tooltip: `At the end of each round inflict 1 stack of <name>${b.buff.displayName ?? b.buff.name}</name>.`,
                    condition: ''
                })),
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
        initialState: { 
            freeSpace: `${freeSpace}`, 
            usedSpace: '0', 
            ...sketchTechniquesSignatures.reduce((acc, sig) => {
                acc[sig.stateKey] = '0';
                return acc;
            }, {} as Record<string, string>),
        },
        triggeredBuffEffects: sketchTechniquesSignatures.map(sig => createTriggeredBuffEffect(sig.trigger, sig.stateKey)),
        tooltip: `${name} for painting, use sketch techniques to add sketches on it. With this ${name} you can manifest ${maxInstances} paintings at the same time.`,
        stateTooltip: `<br/>Spaces used: <num>{usedSpace}</num> / <num>{freeSpace}</num><br/>Current effects:`,
        tooltipFragments: {
            fragments: sketchTechniquesSignatures.map(sig => ({
                tooltip: `<name>${sig.name}</name>`,
                condition: `${sig.stateKey} > 0`
            })),
            separator: ', '
        },
        type: 'none',
        noneType: paintingTechsType,
        buffType: paintingSurfaceBuffType
    }

    return paintingSurfaceBuff;
}