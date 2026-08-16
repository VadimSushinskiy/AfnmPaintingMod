import { FlameItem } from "afnm-types";
import iconAsset from '../../../assets/item/flame/InkFlame.png';

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
    stacks: 1,
    rarity: 'resplendent',
    realm: 'bodyForging',
    valueTier: 0,
}