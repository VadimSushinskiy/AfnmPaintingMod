import { CraftingTechnique } from "afnm-types";
import { colorPaints } from "../colorPaints";
import iconAsset from '../../../assets/techniques/refine/PaintedPerfection.png';

export const paintedPerfection: CraftingTechnique = {
    name: 'Painted Perfection',
    icon:iconAsset,
    poolCost: 10,
    stabilityCost: 5,
    successChance: 1,
    buffRequirement: {
        buff: colorPaints.blue,
        amount: 1
    },
    effects: [
        {
            kind: 'perfection',
            amount: {
                value: 0.1,
                stat: 'control',
                scaling: colorPaints.blue.name,
            }
        },
        {
            kind: 'createBuff',
            buff: colorPaints.blue,
            stacks: {
                value: 1,
                stat: undefined,
            }
        },
    ],
    type: 'refine',
    realm: 'bodyForging',
    cooldown: 0,
    currentCooldown: 0,
}