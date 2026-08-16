import { MountItem } from "afnm-types";
import iconAsset from '../../../assets/item/mount/InkBrush.png';

export const inkBrush: MountItem = {
    kind: 'mount',
    name: 'Ink Brush',
    description: 'A giant brush crafted from the ink essence of the Painted Worlds. The formations on it can slightly enhance the cultivator\'s comprehension, thereby increasing the speed of technique mastery.',
    icon: iconAsset,
    stacks: 1,
    rarity: 'empowered',
    realm: 'bodyForging',
    speed: window.modAPI.utils.getMountSpeed('bodyForging', 'Late', 0.6),
    masteryPoints: 10
}

export const inkBrushPlus: MountItem = {
    kind: 'mount',
    name: 'Ink Brush+',
    description: 'A giant brush crafted from the ink essence of the Painted Worlds. The formations on it can slightly enhance the cultivator\'s comprehension, thereby increasing the speed of technique mastery.',
    icon: iconAsset,
    stacks: 1,
    rarity: 'resplendent',
    realm: 'bodyForging',
    speed: window.modAPI.utils.getMountSpeed('bodyForging', 'Late', 0.8),
    masteryPoints: 20
}

export const inkBrushes = [
    inkBrush,
    inkBrushPlus,
]