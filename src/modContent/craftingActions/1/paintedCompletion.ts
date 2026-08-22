import { CraftingTechnique } from "afnm-types";
import { colorPaints } from "../colorPaints";
import iconAsset from '../../../assets/techniques/fusion/PaintedCompletion.png';

export const paintedCompletion: CraftingTechnique = {
    name: 'Painted Completion',
    icon: iconAsset,
    poolCost: 10,
    stabilityCost: 5,
    successChance: 1,
    buffRequirement: {
        buff: colorPaints.green,
        amount: 1
    },
    effects: [
        {
            kind: 'completion',
            amount: {
                value: 0.15,
                stat: 'intensity',
                scaling: colorPaints.green.name,
            }
        },
        {
            kind: 'createBuff',
            buff: colorPaints.green,
            stacks: {
                value: 1,
                stat: undefined,
            }
        },
    ],
    type: 'fusion',
    realm: 'bodyForging',
    cooldown: 0,
    currentCooldown: 0,
}