import { RecipeItem } from "afnm-types";
import { recipeIcons } from "../recipeIcons";
import { inkRecyclingTalisman, inkRecyclingTalismanPlus } from "../../talismans/inkRecyclingTalisman";
import { spiritInk } from "../../materials/spiritInk";

export const inkRecyclingTalismanRecipe: RecipeItem = {
    kind: 'recipe',
    name: 'Ink Recycling Talisman Recipe',
    description: 'A recipe for an Ink Recycling Talisman.',
    icon: recipeIcons.talisman,
    stacks: 1,
    rarity: 'qitouched',
    realm: 'bodyForging',
    baseItem: inkRecyclingTalisman,
    perfectItem: inkRecyclingTalismanPlus,
    ingredients: [
        {
            item: window.modAPI.gameData.items['Spirit Core (I)'],
            quantity: 1
        },
        {
            item: spiritInk,
            quantity: 3
        },
        {
            item: window.modAPI.gameData.items['Talisman Blank (I)'],
            quantity: 1
        }
    ],
    realmProgress: 'Late',
    difficulty: 'hard'
}