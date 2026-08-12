import { Buff, Technique } from "afnm-types";
import { inks, paintingTechsType } from "../painting";
import iconAsset from '../../../assets/techniques/1/PaintFlood.png';

export const paintFloodTrigger = 'paintFloodTrigger';
export const paintFloodState = 'paintFlood';

export const paintFloodPreviewBuff: Buff = {
    name: 'Flood',
    icon: iconAsset,
    canStack: false,
    stacks: 1,
    stats: {},
    tooltip: 'When manifested:<br/>Gain <num>+20</num> Protection<br/>Inflict <num>+20%</num> Weakness',
    buffType: 'Sketch',
}

// Add correct weakness calculation!!
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
        },
        {
            kind: 'buffSelf',
            buff: paintFloodPreviewBuff,
            amount: {value: 0, stat: undefined},
            condition: {
                kind: 'chance',
                percentage: 0,
            }
        }
    ],
    tooltip: `Deal {damage.amount} damage and add <name>Sketch: Flood</name> to all your <name>Painting Surfaces</name>.<br/>`,
    disableCrystalDrop: true,
    // childTooltips: [
    //     {
    //         title: 'Flood',
    //         body: 'When manifested:<br/>Gain <num>+20</num> Protection<br/>Inflict <num>+20%</num> Weakness',
    //         condition: '1',
    //     }
    // ]
}