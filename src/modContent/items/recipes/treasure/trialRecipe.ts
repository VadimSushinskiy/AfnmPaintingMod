import { RecipeItem } from "afnm-types";
import { recipeIcons } from "../recipeIcons";
import { failedTrialResult } from "../../treasures/failedTrialResult";
import { successfulTrialResult } from "../../treasures/successfulTrialResult";
import { spiritInk } from "../../materials/spiritInk";
import { inkIron } from "../../materials/inkIron";

export const trialRecipe: RecipeItem = {
    kind: 'recipe',
    name: 'Trial Recipe',
    description: 'A recipe for crafting trial.',
    icon: recipeIcons.breakthrough,
    stacks: 1,
    rarity: 'mundane',
    realm: 'bodyForging',
    baseItem: failedTrialResult,
    perfectItem: successfulTrialResult,
    ingredients: [
        {
            item: inkIron,
            quantity: 3
        },
        {
            item: spiritInk,
            quantity: 3
        },
        {
            item: window.modAPI.gameData.items['Spirit Core (I)'],
            quantity: 1,
        }
    ],
    realmProgress: 'Early',
    difficulty: 'easy',
}