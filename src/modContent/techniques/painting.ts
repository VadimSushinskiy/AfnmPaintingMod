import { Buff, BuffEffect } from "afnm-types";
import iconAsset from '../../assets/techniques/Inks.png';
import { paintFloodState, paintFloodTrigger } from "./1/paintFlood";
import { paintShieldState, paintShieldTrigger } from "./1/paintShield";
import { paintEarthquakeState, paintEarthquakeTrigger } from "./1/paintEarthquake";

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

export const createPaintingSurface = (name: string, icon: string, freeSpace: number, maxInstances: number): Buff => {
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
            maxbarrier: {value: 0.01, stat: 'maxbarrier', eqn: 'paintMaxBarrier', tooltipCondition: '0'}
        },
        afterTechniqueEffects: [
            {
                kind: 'damage',
                amount: {value: 1, stat: 'power', eqn: 'paintDmgAfterTech' }
            }
        ],
        onRoundEffects: [
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
    onRoundEffects: [
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
                    initialState: { 
                        paintProtection: { value: 1, stat: undefined, eqn: `20 * ${paintFloodState}`}, 
                        paintPower: { value: 1, stat: undefined, eqn: `30 * ${paintEarthquakeState}`},
                        paintDmgAfterTech: {value: 1, stat: undefined, eqn: `0.3 * ${paintEarthquakeState}`},
                        paintMaxBarrier: {value: 1, stat: undefined, eqn: `10 * ${paintShieldState}`},
                        paintBarrierMitigation: {value: 1, stat: undefined, eqn: `10 * ${paintShieldState}`},
                    },
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
                    initialState: { paintWeakness: { value: 1, stat: undefined, eqn: `20 * ${paintFloodState}`} }
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