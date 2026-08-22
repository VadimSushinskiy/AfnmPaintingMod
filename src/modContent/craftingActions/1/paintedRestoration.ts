import { CraftingTechnique } from "afnm-types";
import { colorPaints } from "../colorPaints";
import iconAsset from '../../../assets/techniques/support/PaintedRestoration.png';

export const paintedRestoration: CraftingTechnique = {
    name: 'Painted Restoration',
    icon:iconAsset,
    poolCost: 0,
    stabilityCost: 10,
    successChance: 1,
    buffRequirement: {
        buff: colorPaints.purple,
        amount: 1
    },
    effects: [
        {
            kind: 'pool',
            amount: {
                value: 3,
                stat: undefined,
                scaling: colorPaints.purple.name,
                upgradeKey: 'pool',
            }
        },
    ],
    type: 'support',
    realm: 'bodyForging',
    cooldown: 12,
    currentCooldown: 0,
    upgradeMasteries: {
        'pool': window.modAPI.utils.createCraftingUpgradeMapSimple(
            'pool',
            'resplendent', 
            'Increase Qi Pool restoration by <num>{change}</num>.',
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