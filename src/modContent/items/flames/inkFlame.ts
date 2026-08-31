import { FlameItem } from "afnm-types";
import iconAsset from '../../../assets/item/flame/InkFlame.png';
import { colorPaintsBuffType } from "../../craftingActions/colorPaints";

// const eqn = Object.entries(colorPaints).map(entry => {
//     return entry[1].name;
// }).join(' + ') + ' > 0 ? 1 : 0';

export const inkFlame: FlameItem = {
    kind: 'flame',
    name: 'Ink Flame',
    description: 'A weightless mass of grayish-black flame, devoid of the heat typical of fire. Its tongues flow upward like drops of ink, leaving slowly fading calligraphic strokes in the air. The light around it is hardly reflected, being absorbed by the flame itself.',
    icon:iconAsset,
    stats: window.modAPI.utils.getCraftingEquipmentStats(
        'bodyForging',
        'Late',
        {
            pool: 0.5,
            control: 0.5,
            intensity: 0.5,
        },
        'flame'
    ),
    buffs: [
        {
            buff: {
                name: 'Ink Flame',
                icon: iconAsset,
                stats: {
                    control: {
                        value: 0.2,
                        stat: 'control',
                        // eqn,
                        eqn: `${window.modAPI.utils.flag(colorPaintsBuffType)} > 0`
                    },
                    intensity: {
                        value: 0.2,
                        stat: 'intensity',
                        // eqn,
                        eqn: `${window.modAPI.utils.flag(colorPaintsBuffType)} > 0`
                    }
                },
                effects: [
                    // {
                    //     kind: ,
                    // }
                ],
                canStack: false,
                stacks: 1,
                displayLocation: 'none',
            },
            buffStacks: {
                value: 1,
                stat: undefined,
            }
        }
    ],
    stacks: 1,
    rarity: 'resplendent',
    realm: 'bodyForging',
    valueTier: 0,
}