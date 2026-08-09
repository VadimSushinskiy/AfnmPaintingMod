import { Technique } from "afnm-types";
import { inks } from "../painting";
import iconAsset from '../../../assets/techniques/InkSplashing.png';

export const inkSplashing: Technique = {
    name: 'Ink Splashing',
    icon: iconAsset,
    type: 'none',
    noneType: 'Painting',
    realm: 'bodyForging',
    effects: [
        {
            kind: 'barrier',
            amount: {
                value: 0.9,
                stat: 'power',
                // upgradeKey: 'power'
            }
        },
        {
            kind: 'buffSelf',
            buff: inks,
            amount: {
                value: 5,
                stat: undefined,
                // upgradeKey: 'stacks'
            }
        },
    ],
    // upgradeMasteries: {
    //     stacks: window.modAPI.utils.createStacksUpgradeMap()
    // },
    disableCrystalDrop: true,
}