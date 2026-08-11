import { Buff, Technique } from "afnm-types";
import { inks, paintingTechsType } from "../painting";
import iconAsset from '../../../assets/techniques/PaintEarthquake.png';

export const paintEarthquakeTrigger = 'paintEarthquake';

export const paintEarthquakePreviewBuff: Buff = {
    name: 'Earthquake',
    icon: iconAsset,
    canStack: false,
    stacks: 1,
    stats: {
        power: {value: 0.3, stat: 'power'}
    },
    afterTechniqueEffects: [
        {
            kind: 'damage',
            amount: { value: 0.3, stat: 'power' }
        }
    ]
}

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
        },
        {
            kind: 'buffSelf',
            buff: paintEarthquakePreviewBuff,
            amount: {value: 0, stat: undefined},
            condition: {
                kind: 'chance',
                percentage: 0,
            }
        }
    ],
    disableCrystalDrop: true,
    tooltip: `Deal {damage.amount} damage and add <name>Painting: Earthquake</name> to all your <name>Painting Surfaces</name>.<br/>`,
}