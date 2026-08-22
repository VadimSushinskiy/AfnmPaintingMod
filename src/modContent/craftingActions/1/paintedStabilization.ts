import { CraftingTechnique } from "afnm-types";
import { colorPaints } from "../colorPaints";
import iconAsset from '../../../assets/techniques/stabilize/PaintedStabilization.png';

export const paintedStabilization: CraftingTechnique = {
    name: 'Painted Stabilization',
    icon:iconAsset,
    poolCost: 44,
    stabilityCost: 0,
    successChance: 1,
    noMaxStabilityLoss: true,
    buffRequirement: {
        buff: colorPaints.yellow,
        amount: 1
    },
    effects: [
        {
            kind: 'stability',
            amount: {
                value: 2,
                stat: undefined,
                scaling: colorPaints.yellow.name,
                upgradeKey: 'stability',
            }
        },
    ],
    type: 'stabilize',
    realm: 'bodyForging',
    cooldown: 12,
    currentCooldown: 0,
    upgradeMasteries: {
        'stability': window.modAPI.utils.createCraftingUpgradeMapSimple(
            'stability',
            'resplendent', 
            'Increase stability restoration by <num>{change}</num>.',
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