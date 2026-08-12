import { Buff, Technique } from "afnm-types";
import iconAsset from '../../../assets/techniques/1/InkWall.png';
import { inks, paintingTechsType } from "../painting";

const inkWallBuff: Buff = {
    name: 'Ink Wall',
    icon: iconAsset,
    canStack: true,
    stacks: 1,
    stats: {
        protection: {
            value: 40,
            stat: undefined,
            upgradeKey: 'buff'
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
    type: 'none',
    noneType: paintingTechsType,
    additionalTooltip: 'Each time you receive damage to your <name>health</name>, lose a stack.'
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
            amount: 3,
            upgradeKey: 'cost',
        }
    ],
    effects: [
        {
            kind: 'barrier',
            amount: {
                value: 1.4,
                stat: 'power',
                upgradeKey: 'power',
            }
        },
        {
            kind: 'buffSelf',
            buff: inkWallBuff,
            amount: {
                value: 5,
                stat: undefined,
                upgradeKey: 'stacks'
            }
        }
    ],
    upgradeMasteries: {
        power: window.modAPI.utils.createPowerUpgradeMap('power', 'empowered'),
        stacks: window.modAPI.utils.createStacksUpgradeMap('stacks', 'empowered', inkWallBuff.name, 4),
        buff: window.modAPI.utils.createUpgradeMapSimple(
            'buff',
            'empowered', 
            `Increase protection buff by <num>{change}</num>.`, 
            false,
            {
                mundane: 5,
                qitouched: 10,
                empowered: 15,
                resplendent: 20,
                incandescent: 25,
                transcendent: 30,
            },
            (value: number) => Math.floor(value * 1),
        ),
        cost: window.modAPI.utils.createCostUpgradeMap('cost', 'empowered', inks.name, -1),
    },
    disableCrystalDrop: true,
}