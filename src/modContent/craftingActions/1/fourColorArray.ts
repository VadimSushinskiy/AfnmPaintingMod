import { CraftingBuff, CraftingBuffEffect, CraftingTechnique, CraftingTechniqueCondition } from "afnm-types";
import iconAsset from '../../../assets/techniques/support/Four-colorArray.png';
import { colorPaints } from "../colorPaints";

const paintCostCondition: CraftingTechniqueCondition = {
    kind: 'condition',
    condition: 'pool >= -count',
    count: -5,
    upgradeKey: 'paintCost'
}

const decreaseQiPoolEffect: CraftingBuffEffect = {
    kind: 'pool',
    condition: paintCostCondition,
    amount: {
        value: -5,
        stat: undefined,
        upgradeKey: 'paintCost'
    }
}

const fourColorArrayBuff: CraftingBuff = {
    name: 'Four-Colour Array',
    icon:iconAsset,
    canStack: false,
    stats: undefined,
    tooltip: `After each action spend {refine.[1].amount} <name>Qi Pool</name>.<br/>After each fusion action gain <num>1</num> stack of <name>Green Paint</name>.<br/>After each refine action gain <num>1</num> stack of <name>Blue Paint</name>.<br/>After each stabilize action gain <num>1</num> stack of <name>Yellow Paint</name>.<br/>After each support action gain <num>1</num> stack of <name>Purple Paint</name>.`,
    effects: [],
    onFusion: [
        {
            kind: 'createBuff',
            buff: colorPaints.green,
            stacks: { value: 1, stat: undefined },
            condition: paintCostCondition
        },
        decreaseQiPoolEffect
    ],
    onRefine: [
        {
            kind: 'createBuff',
            buff: colorPaints.blue,
            stacks: { value: 1, stat: undefined },
            condition: paintCostCondition
        },
        decreaseQiPoolEffect
    ],
    onStabilize: [
        {
            kind: 'createBuff',
            buff: colorPaints.yellow,
            stacks: { value: 1, stat: undefined },
            condition: paintCostCondition
        },
        decreaseQiPoolEffect
    ],
    onSupport: [
        {
            kind: 'createBuff',
            buff: colorPaints.purple,
            stacks: { value: 1, stat: undefined },
            condition: paintCostCondition
        },
        decreaseQiPoolEffect
    ],
    stacks: 1,
    displayLocation: 'none'
}

export const fourColorArray: CraftingTechnique = {
    name: 'Four-color Array',
    icon: iconAsset,
    poolCost: 50,
    stabilityCost: 0,
    successChance: 1,
    cooldown: 99999999,
    effects: [
        {
            kind: 'createBuff',
            buff:fourColorArrayBuff,
            stacks: {
                value: 1,
                stat: undefined,
            }
        }
    ],
    type: 'support',
    realm: 'bodyForging',
    currentCooldown: 0,
    upgradeMasteries: {
        'paintCost': window.modAPI.utils.createCraftingUpgradeMapSimple(
            'paintCost',
            'incandescent', 
            'Reduce Qi Pool cost for Paints creation by <num>{change}</num>.',
            false,
            {
                mundane: undefined,
                qitouched: undefined,
                empowered: undefined,
                resplendent: undefined,
                incandescent: 1,
                transcendent: 2,
            }
        )
    }
}