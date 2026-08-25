import { RecipeItem } from "afnm-types";
import { recipeIcons } from "../recipeIcons";
import { fantasyOfPower } from "../../breakthrough/fantasyOfPower";
import { spiritInk } from "../../materials/spiritInk";

export const fantasyOfPowerRecipe: RecipeItem = {
    kind: 'recipe',
    name: 'Fantasy of Power Recipe',
    description: 'A recipe for a Fantasy of Power.',
    icon: recipeIcons.breakthrough,
    stacks: 1,
    rarity: 'empowered',
    realm: 'bodyForging',
    baseItem: window.modAPI.gameData.items['Remembrance of Power'],
    perfectItem: fantasyOfPower,
    displayPerfect: true,
    ingredients: [
        {
            item: window.modAPI.gameData.items['Remembrance of Power'],
            quantity: 1
        },
        {
            item: spiritInk,
            quantity: 3
        },
    ],
    realmProgress: 'Late',
    difficulty: 'hard'
}