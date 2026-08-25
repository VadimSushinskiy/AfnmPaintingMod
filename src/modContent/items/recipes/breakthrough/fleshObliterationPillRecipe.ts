import { RecipeItem } from "afnm-types";
import { recipeIcons } from "../recipeIcons";
import { fleshObliterationPill } from "../../breakthrough/fleshObliterationPill";
import { spiritInk } from "../../materials/spiritInk";

export const fleshObliterationPillRecipe: RecipeItem = {
    kind: 'recipe',
    name: 'Flesh Obliteration Pill Recipe',
    description: 'A recipe for a Flesh Obliteration Pill.',
    icon: recipeIcons.breakthrough,
    stacks: 1,
    rarity: 'empowered',
    realm: 'bodyForging',
    baseItem: window.modAPI.gameData.items['Flesh Annihilation Pill'],
    perfectItem: fleshObliterationPill,
    ingredients: [
        {
            item: window.modAPI.gameData.items['Flesh Annihilation Pill'],
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