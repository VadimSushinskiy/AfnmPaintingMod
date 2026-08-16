import { RecipeItem } from "afnm-types";
import { recipeIcons } from "../recipeIcons";
import { fantasyZenithPillMap, fantasyZenithPillPlusMap } from "../../pills/fantasyZenithPill";
import { spiritInk } from "../../materials/spiritInk";

export const fantasyZenithPillIRecipe: RecipeItem = {
    kind: 'recipe',
    name: 'Fantasy Zenith Pill (I) Recipe',
    description: 'A recipe for a Fantasy Zenith Pill (I).',
    icon: recipeIcons.pill,
    stacks: 1,
    rarity: 'qitouched',
    realm: 'bodyForging',
    baseItem: { ...fantasyZenithPillMap.bodyForging, stacks: 5},
    perfectItem: { ...fantasyZenithPillPlusMap.bodyForging, stacks: 5},
    ingredients: [
        {
            item: window.modAPI.gameData.items['Lesser Spirit Grass'],
            quantity: 5
        },
        {
            item: spiritInk,
            quantity: 1
        },
    ],
    realmProgress: 'Late',
    difficulty: 'medium',
}