import { Buff, TalismanItem } from "afnm-types";
import { ink } from "../../techniques/painting";
import icon from '../../../assets/item/talisman/InkRecyclingTalisman.png';

const talismanBuff: Buff = {
    name: 'Ink Recycling',
    icon,
    canStack: false,
    stacks: 1,
    stats: undefined,
    tooltip: `Each time you spend <name>Ink</name>, gain <num>1</num> stack of <name>Ink Reinforcement</name>.`,
    triggeredBuffEffects: [
        {
            trigger: `spend.${ink.name}`,
            effects: [
                {
                    kind: 'buffSelf',
                    buff: {
                        name: 'Ink Reinforcement',
                        icon,
                        canStack: true,
                        stacks: 1,
                        maxStacks: 5,
                        stats: {
                            power: {
                                value: 0.05,
                                stat: 'power',
                                scaling: 'stacks'
                            },
                        },
                        onRoundEffects: [
                            {
                                kind: 'negate'
                            }
                        ],
                    },
                    amount: {
                        value: 1,
                        stat: undefined,
                    },
                }
            ]
        }
    ]
}

const talismanPlusBuff: Buff = {
    name: 'Ink Recycling+',
    icon,
    canStack: false,
    stacks: 1,
    stats: undefined,
    tooltip: `Each time you spend <name>Ink</name>, gain <num>1</num> stack of <name>Ink Reinforcement+</name>.`,
    triggeredBuffEffects: [
        {
            trigger: `spend.${ink.name}`,
            effects: [
                {
                    kind: 'buffSelf',
                    buff: {
                        name: 'Ink Reinforcement+',
                        icon,
                        canStack: true,
                        stacks: 1,
                        maxStacks: 5,
                        stats: {
                            power: {
                                value: 0.05,
                                stat: 'power',
                                scaling: 'stacks',
                            },
                            protection: {
                                value: 5,
                                stat: undefined,
                                scaling: 'stacks',
                            }
                        },
                        onRoundEffects: [
                            {
                                kind: 'negate'
                            }
                        ],
                    },
                    amount: {
                        value: 1,
                        stat: undefined,
                    },
                }
            ]
        }
    ]
}

export const inkRecyclingTalisman: TalismanItem = {
    kind: 'talisman',
    name: 'Ink Recycling Talisman',
    description: 'Talisman made from compressed ink according to mysterious recipes. The formations inscribed on it allow the remnants of used ink to be recycled into a short-term boost for cultivator\'s body.',
    icon,
    stacks: 1,
    rarity: 'empowered',
    realm: 'bodyForging',
    buffs: [
        {
            buff: talismanBuff,
            buffStacks: {
                value: 1,
                stat: undefined
            }
        }
    ]
}

export const inkRecyclingTalismanPlus: TalismanItem = {
    kind: 'talisman',
    name: 'Ink Recycling Talisman+',
    description: 'Talisman made from compressed ink according to mysterious recipes. The formations inscribed on it allow the remnants of used ink to be recycled into a short-term boost for cultivator\'s body.',
    icon,
    stacks: 1,
    rarity: 'resplendent',
    realm: 'bodyForging',
    buffs: [
        {
            buff: talismanPlusBuff,
            buffStacks: {
                value: 1,
                stat: undefined
            }
        }
    ]
}

export const inkRecyclingTalismans = [
    inkRecyclingTalisman,
    inkRecyclingTalismanPlus,
];