import { RecipeItem } from "afnm-types";
import { recipeIcons } from "../recipeIcons";
import { stabilityConversionPillMap, stabilityConversionPillPlusMap } from "../../pills/craftingPills/stabilityConversionPill";
import { spiritInk } from "../../materials/spiritInk";

export const stabilityConversionPillIRecipe: RecipeItem = {
    kind: 'recipe',
    name: 'Stability Conversion Pill (I) Recipe',
    description: 'A recipe for a Stability Conversion Pill (I).',
    icon: recipeIcons.pill,
    stacks: 1,
    rarity: 'qitouched',
    realm: 'bodyForging',
    baseItem: { ...stabilityConversionPillMap.bodyForging, stacks: 3},
    perfectItem: { ...stabilityConversionPillPlusMap.bodyForging, stacks: 3},
    ingredients: [
        {
            item: window.modAPI.gameData.items['Lesser Spirit Grass'],
            quantity: 3
        },
        {
            item: window.modAPI.gameData.items['Lesser Shui Blossom'],
            quantity: 2
        },
        {
            item: spiritInk,
            quantity: 1
        },
    ],
    realmProgress: 'Late',
    difficulty: 'medium',
}