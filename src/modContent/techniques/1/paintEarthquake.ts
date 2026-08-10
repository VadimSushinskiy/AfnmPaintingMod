import { Technique } from "afnm-types";
import { inks, paintingTechsType } from "../painting";
import iconAsset from '../../../assets/techniques/PaintEarthquake.png';

export const paintEarthquakeTrigger = 'paintEarthquake';

export const paintEarthquake: Technique = {
    name: 'Paint Earthquake',
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
            triggerKey: paintEarthquakeTrigger,
            amount: { value: 1, stat: undefined }
        }
    ],
    disableCrystalDrop: true,
}