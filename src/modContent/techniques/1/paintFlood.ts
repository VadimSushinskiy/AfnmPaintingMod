import { Technique } from "afnm-types";
import { inks, paintingTechsType } from "../painting";
import iconAsset from '../../../assets/techniques/PaintFlood.png';

export const paintFloodTrigger = 'paintFlood';

export const paintFlood: Technique = {
    name: 'Paint Flood',
    icon:iconAsset,
    type: 'none',
    noneType: paintingTechsType,
    realm: 'bodyForging',
    costs: [
        {
            buff: inks,
            amount: 2,
        }
    ],
    effects: [
        {
            kind: 'damage',
            amount: {
                value: 1,
                stat: 'power',
            }
        },
        {
            kind: 'trigger',
            triggerKey: paintFloodTrigger,
            amount: { value: 1, stat: undefined }
        }
    ],
    disableCrystalDrop: true,
    childTooltips: [
        {
            title: 'Flood',
            body: 'When manifested:<br/>Give <num>+20</num> Protection<br/>Inflict <num>+20%</num> Weakness',
            condition: '1',
        }
    ]
}