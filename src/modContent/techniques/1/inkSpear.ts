import { Buff, Technique } from "afnm-types";
import { inks, paintingTechsType } from "../painting";
import iconAsset from '../../../assets/techniques/1/InkSpear.png';
import buffIconAsset from '../../../assets/techniques/1/InkyCorrosion.png';

const inkyCorrosionBuff: Buff = {
    name: 'Inky Corrosion',
    icon: buffIconAsset,
    canStack: true,
    stacks: 1,
    stats: {
        barrierBoost: {
            value: -20,
            stat: undefined,
            upgradeKey: 'boostDebuff',
        },
        barrierMitigation: {
            value: -20,
            stat: undefined,
            upgradeKey: 'mitigationDebuff',
        }
    },
    onRoundEffects: [
        {
            kind: 'add',
            amount: {
                value: -1,
                stat: undefined,
            }
        }
    ],
    type: 'none',
    noneType: paintingTechsType,
}

export const inkSpear: Technique = {
    name: 'Ink Spear',
    icon:iconAsset,
    type: 'none',
    noneType: paintingTechsType,
    realm: 'bodyForging',
    costs: [
        {
            buff: inks,
            amount: 2
        }
    ],
    effects: [
        {
            kind: 'damage',
            amount: {
                value: 1.5, 
                stat: 'power',
                upgradeKey: 'power',
            }
        },
        {
            kind: 'buffTarget',
            buff: inkyCorrosionBuff,
            amount: {
                value: 3,
                stat: undefined,
                upgradeKey: 'stacks',
            }
        }
    ],
    disableCrystalDrop: true,
    upgradeMasteries: {
        power: window.modAPI.utils.createPowerUpgradeMap('power', 'empowered'),
        stacks: window.modAPI.utils.createStacksUpgradeMap('stacks', 'empowered', inkyCorrosionBuff.name, 1),
        boostDebuff: window.modAPI.utils.createUpgradeMapSimple(
            'boostDebuff',
            'empowered', 
            `Decrease Barrier Boost by additional <num>{change}%</num>.`, 
            false,
            {
                mundane: undefined,
                qitouched: undefined,
                empowered: undefined,
                resplendent: undefined,
                incandescent: 5,
                transcendent: 10,
            },
            (value: number) => Math.floor(value * 1),
        ),
        mitigationDebuff: window.modAPI.utils.createUpgradeMapSimple(
            'mitigationDebuff',
            'empowered', 
            `Decrease Barrier Effectiveness by an additional <num>{change}%</num>.`, 
            false,
            {
                mundane: undefined,
                qitouched: undefined,
                empowered: undefined,
                resplendent: undefined,
                incandescent: 5,
                transcendent: 10,
            },
            (value: number) => Math.floor(value * 1),
        ),
    }
}