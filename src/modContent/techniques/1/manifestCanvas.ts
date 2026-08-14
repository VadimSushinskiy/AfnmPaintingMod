import { Technique } from "afnm-types";
import iconAsset from '../../../assets/techniques/1/ManifestCanvas.png';
import { paintingTechsType } from "../painting";
import { createPaintingSurface } from "../helpers/createPaintingSurface";

const canvasBuff = createPaintingSurface('Canvas', iconAsset, 2, 2);

export const manifestCanvas: Technique = {
    name: 'Manifest Canvas',
    icon:iconAsset,
    type: 'none',
    noneType: paintingTechsType,
    realm: 'bodyForging',
    effects: [
        {
            kind: 'barrier',
            amount: {
                value: 0.5,
                stat: 'power',
            }
        },
        {
            kind: 'buffSelf',
            buff: canvasBuff,
            amount: {
                value: 1,
                stat: undefined
            }
        }
    ],
    disableCrystalDrop: true,
}