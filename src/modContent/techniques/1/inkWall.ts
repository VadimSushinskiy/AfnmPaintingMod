import { Buff, Technique } from "afnm-types";
import iconAsset from '../../../assets/techniques/InkWall.png';
import { inks, paintingTechsType } from "../painting";

const inkWallBuff: Buff = {
    name: 'Ink Wall',
    icon: iconAsset,
    canStack: true,
    stacks: 1,
    stats: {
        protection: {
            value: 50,
            stat: undefined,
            // upgradeKey: 'protectionBuff'
        }
    },
    triggeredBuffEffects: [
        {
            trigger: 'takeDamage',
            effects: [
                {
                    kind: 'add',
                    amount: {value: -1, stat: undefined}
                }
            ]
        }
    ],
    additionalTooltip: 'Each time you receive damage to your <num>health</num>, lose a stack.'
}

export const inkWall: Technique = {
    name: 'Ink Wall',
    icon: iconAsset,
    type: 'none',
    noneType: paintingTechsType,
    realm: 'bodyForging',
    costs: [
        {
            buff: inks,
            amount: 3
        }
    ],
    effects: [
        {
            kind: 'barrier',
            amount: {
                value: 1.4,
                stat: 'power',
                // upgradeKey: 'power',
            }
        },
        {
            kind: 'buffSelf',
            buff: inkWallBuff,
            amount: {
                value: 5,
                stat: undefined,
                // upgradeKey: 'stacks'
            }
        }
    ],
    // upgradeMasteries: {
    //     basePower: createPowerUpgradeMap('power', 'empowered'),
    // },
    disableCrystalDrop: true,
}