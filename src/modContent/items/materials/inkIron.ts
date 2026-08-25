import { CraftingItem } from "afnm-types";
import iconAsset from '../../../assets/item/material/InkIron.png';

export const inkIron: CraftingItem = {
    kind: 'material',
    name: 'Ink Iron',
    description: `A dark, inky ore that doesn't form naturally, but can be created using recipes from the Painted Worlds. It's infused with the essence of spirit ink and inherits some of its mysterious effects. This material is both hard and surprisingly pliable, easily molded into any shape the crafter desires.`,
    icon: iconAsset,
    stacks: 1,
    rarity: 'resplendent',
    realm: 'bodyForging',
}