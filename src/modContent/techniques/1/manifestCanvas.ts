import { Buff, Technique } from "afnm-types";
import iconAsset from '../../../assets/techniques/ManifestCanvas.png';
import { paintingTechsType } from "../painting";
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
        power: { value: 0.01, stat: 'power', eqn: '20 * paintEarthquake'},
        protection: {value: 1, stat: undefined, eqn: '20 * paintFlood'}
    },
    onRoundEffects: [
        {
            kind: 'add',
            amount: {value: -1, stat: undefined}
        }
    ],
}

const canvasActivateEnemyBuff: Buff = {
    name: 'Canvas: Manifested Painting(Enemy)',
    icon: iconAsset,
    allowMultipleInstances: true,
    maxInstances: 3,
    canStack: true,
    stacks: 1,
    stats: {
        weakness: { value: 0, stat: undefined, additiveEqn: '20 * paintEarthquake'},
        vulnerability: {value: 0, stat: undefined, additiveEqn: '20 * paintFlood'}
    },
    onRoundEffects: [
        {
            kind: 'add',
            amount: {value: -1, stat: undefined}
        }
    ],
}

const canvasBuff: Buff = {
    name: 'Canvas',
    icon:iconAsset,
    canStack: false,
    stacks: 1,
    stats: {},
    initialState: { freeSpace: '2', paintFlood: '0', paintEarthquake: '0' },
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
                    kind: 'negate',
                    condition: {
                        kind: 'condition',
                        condition: 'paintFlood + paintEarthquake >= freeSpace'
                    }
                },
                {
                    kind: 'buffSelf',
                    buff: canvasActivatePlayerBuff,
                    amount: { value: 3, stat: undefined },
                    condition: {
                        kind: 'condition',
                        condition: 'paintFlood + paintEarthquake >= freeSpace'
                    },
                    initialState: { paintFlood: { value: 1, stat: undefined, eqn: 'paintFlood'}, paintEarthquake: { value: 1, stat: undefined, eqn: 'paintEarthquake'}, }
                },
                // {
                //     kind: 'buffTarget',
                //     buff: canvasActivateEnemyBuff,
                //     amount: { value: 3, stat: undefined },
                //     condition: {
                //         kind: 'condition',
                //         condition: 'paintFlood + paintEarthquake >= freeSpace'
                //     },
                //     initialState: { paintFlood: { value: 1, stat: undefined, eqn: 'paintFlood'}, paintEarthquake: { value: 1, stat: undefined, eqn: 'paintEarthquake'}, }
                // }
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
                    kind: 'negate',
                    condition: {
                        kind: 'condition',
                        condition: 'paintFlood + paintEarthquake >= freeSpace'
                    }
                },
                {
                    kind: 'buffSelf',
                    buff: canvasActivatePlayerBuff,
                    amount: { value: 3, stat: undefined },
                    condition: {
                        kind: 'condition',
                        condition: 'paintFlood + paintEarthquake >= freeSpace'
                    },
                    initialState: { paintFlood: { value: 1, stat: undefined, eqn: 'paintFlood'}, paintEarthquake: { value: 1, stat: undefined, eqn: 'paintEarthquake'}, }
                }
            ],
        }
    ]
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