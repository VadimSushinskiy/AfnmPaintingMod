import { Technique } from "afnm-types";
import { inks, paintingTechsType } from "../painting";
import iconAsset from '../../../assets/techniques/1/InkSplashing.png';

export const inkSplashing: Technique = {
    name: 'Ink Splashing',
    icon: iconAsset,
    type: 'none',
    noneType: paintingTechsType,
    realm: 'bodyForging',
    effects: [
        {
            kind: 'barrier',
            amount: {
                value: 0.9,
                stat: 'power',
                upgradeKey: 'power'
            }
        },
        {
            kind: 'buffSelf',
            buff: inks,
            amount: {
                value: 5,
                stat: undefined,
                upgradeKey: 'stacks'
            }
        },
    ],
    upgradeMasteries: {
        power: window.modAPI.utils.createPowerUpgradeMap('power', 'empowered'),
        stacks: window.modAPI.utils.createStacksUpgradeMap('stacks', 'empowered', inks.name, 3),
    },
    disableCrystalDrop: true,
}