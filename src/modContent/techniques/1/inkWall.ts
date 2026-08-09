import { Technique } from "afnm-types";
import iconAsset from '../../../assets/techniques/InkWall.png';
import { inks } from "../painting";

export const inkWall: Technique = {
    name: 'Ink Wall',
    icon: iconAsset,
    type: 'none',
    noneType: 'Painting',
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
                value: 2,
                stat: 'power',
                // upgradeKey: 'power',
            }
        }
    ],
    // upgradeMasteries: {
    //     basePower: createPowerUpgradeMap('power', 'empowered'),
    // },
    disableCrystalDrop: true,
}