import { Buff, Technique } from "afnm-types";
import iconAsset from '../../../assets/techniques/ManifestCanvas.png';
import { paintingSurfaceBuffType, paintingTechsType } from "../painting";
import { paintFloodTrigger } from "./paintFlood";
import { paintEarthquakeTrigger } from "./paintEarthquake";

const canvasActivatePlayerBuff: Buff = {
    name: 'Canvas: Manifested Painting',
    icon: iconAsset,
    allowMultipleInstances: true,
    maxInstances: 3,
    canStack: true,
    stacks: 1,
    stats: {
        power: { value: 0.01, stat: 'power', eqn: 'paintPower', tooltipCondition: '0'},
        protection: {value: 1, stat: undefined, eqn: 'paintProtection', tooltipCondition: '0'}
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

const canvasActivateEnemyBuff: Buff = {
    name: 'Canvas: Manifested Painting (Enemy)',
    icon: iconAsset,
    allowMultipleInstances: true,
    maxInstances: 3,
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

const canvasBuff: Buff = {
    name: 'Canvas',
    icon:iconAsset,
    canStack: false,
    stacks: 1,
    stats: {},
    initialState: { freeSpace: '2', usedSpace: '0', paintFlood: '0', paintEarthquake: '0' },
    triggeredBuffEffects: [
        {
            trigger: paintFloodTrigger,
            effects: [
                {
                    kind: 'setState',
                    key: 'paintFlood',
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
                    buff: canvasActivatePlayerBuff,
                    amount: { value: 3, stat: undefined },
                    condition: {
                        kind: 'condition',
                        condition: 'usedSpace >= freeSpace'
                    },
                    hideBuff: true,
                    initialState: { 
                        paintProtection: { value: 1, stat: undefined, eqn: '20 * paintFlood'}, 
                        paintPower: { value: 1, stat: undefined, eqn: '30 * paintEarthquake'},
                        paintDmgAfterTech: {value: 1, stat: undefined, eqn: '0.3 * paintEarthquake'} 
                    },
                },
                {
                    kind: 'buffTarget',
                    buff: canvasActivateEnemyBuff,
                    amount: { value: 3, stat: undefined },
                    condition: {
                        kind: 'condition',
                        condition: 'usedSpace >= freeSpace'
                    },
                    hideBuff: true,
                    initialState: { paintWeakness: { value: 1, stat: undefined, eqn: '20 * paintFlood'} }
                }
            ],
        },
        {
            trigger: paintEarthquakeTrigger,
            effects: [
                {
                    kind: 'setState',
                    key: 'paintEarthquake',
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
                    buff: canvasActivatePlayerBuff,
                    amount: { value: 3, stat: undefined },
                    condition: {
                        kind: 'condition',
                        condition: 'usedSpace >= freeSpace'
                    },
                    hideBuff: true,
                    initialState: { 
                        paintProtection: { value: 1, stat: undefined, eqn: '20 * paintFlood'}, 
                        paintPower: { value: 1, stat: undefined, eqn: '30 * paintEarthquake'},
                        paintDmgAfterTech: {value: 1, stat: undefined, eqn: '0.3 * paintEarthquake'} 
                    }
                },
                {
                    kind: 'buffTarget',
                    buff: canvasActivateEnemyBuff,
                    amount: { value: 3, stat: undefined },
                    condition: {
                        kind: 'condition',
                        condition: 'usedSpace >= freeSpace'
                    },
                    hideBuff: true,
                    initialState: { paintWeakness: { value: 1, stat: undefined, eqn: '20 * paintFlood'} }
                }
            ],
        }
    ],
    tooltip: 'Canvas for painting, use sketch techniques to add sketches on it.',
    stateTooltip: `<br/>Spaces used: <num>{usedSpace}</num> / <num>{freeSpace}</num><br/>Current effects:`,
    tooltipFragments: {
        fragments: [
            {
                tooltip: '<name>Flood</name>',
                condition: 'paintFlood > 0'
            },
            {
                tooltip: '<name>Earthquake</name>',
                condition: 'paintEarthquake > 0'
            }
        ],
        separator: ', '
    },
    type: 'none',
    noneType: paintingTechsType,
    buffType: paintingSurfaceBuffType
}

export const manifestCanvas: Technique = {
    name: 'Manifest Canvas',
    icon:iconAsset,
    type: 'none',
    noneType: paintingTechsType,
    realm: 'bodyForging',
    effects: [
        {
            kind: 'buffSelf',
            buff: canvasBuff,
            amount: {
                value: 1,
                stat: undefined
            }
        }
    ],
    disableCrystalDrop: true,
}