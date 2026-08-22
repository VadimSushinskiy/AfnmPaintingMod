import { CraftingTechnique } from "afnm-types";
import { colorPaints } from "../colorPaints";
import iconAsset from '../../../assets/techniques/support/ColorBlur.png';

export const colorBlur: CraftingTechnique = {
    name: 'Colour Blur',
    icon: iconAsset,
    poolCost: 20,
    stabilityCost: 5,
    successChance: 1,
    effects: [
        {
            kind: 'createBuff',
            buff: {
                name: 'Colour Blur',
                icon: iconAsset,
                canStack: true,
                stats: {
                    intensity: {
                        value: 0.03,
                        stat: 'intensity',
                        scaling: colorPaints.blue.name,
                        upgradeKey: 'intensityBonus'
                    },
                    control: {
                        value: 0.03,
                        stat: 'control',
                        scaling: colorPaints.green.name,
                        upgradeKey: 'controlBonus',
                    }
                },
                effects: [
                    {
                        kind: 'addStack',
                        stacks: {
                            value: -1,
                            stat: undefined,
                        }
                    }
                ],
                stacks: 1,
                displayLocation: 'none'
            },
            stacks: {
                value: 7,
                stat: undefined,
                upgradeKey: 'stacks',
            }
        },
    ],
    type: 'support',
    realm: 'bodyForging',
    cooldown: 7,
    upgradeKey: 'stacks',
    currentCooldown: 0,
    upgradeMasteries: {
        stacks: window.modAPI.utils.createCraftingStacksUpgradeMap('stacks', 'resplendent', 'Colour Blur', 2),
        intensityBonus: window.modAPI.utils.createCraftingUpgradeMapSimple(
            'intensityBonus',
            'incandescent',
            `Increase intensity bonus by <num>{change}%</num> per <name>${colorPaints.blue.name}</name> stack.`,
            false,
            {
                mundane: undefined,
                qitouched: undefined,
                empowered: undefined,
                resplendent: undefined,
                incandescent: 0.01,
                transcendent: 0.02,
            },
            (value: number) => value * 100,
        ),
        controlBonus: window.modAPI.utils.createCraftingUpgradeMapSimple(
            'controlBonus',
            'incandescent',
            `Increase control bonus by <num>{change}%</num> per <name>${colorPaints.green.name}</name> stack.`,
            false,
            {
                mundane: undefined,
                qitouched: undefined,
                empowered: undefined,
                resplendent: undefined,
                incandescent: 0.01,
                transcendent: 0.02,
            },
            (value: number) => value * 100,
        ),
    },
}