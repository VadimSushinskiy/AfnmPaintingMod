import { Trial } from "../types/Trial";
import { createCombat, createCrafting, getGameEnemies, getGameItems } from "./trialHelpers";

const trial1Enemies = getGameEnemies(['Ratascar', 'Ratascar', 'Ratascar']);
const trial1Rewards = getGameItems([
    {itemName: 'Spirit Fruit (Blood)', itemStacks: 3},
    {itemName: 'Spirit Fruit (Blossom)', itemStacks: 3},
    {itemName: 'Spirit Fruit (Celestial)', itemStacks: 3},
    {itemName: 'Spirit Fruit (Cloud)', itemStacks: 3},
    {itemName: 'Spirit Fruit (Fist)', itemStacks: 3},
    {itemName: 'Spirit Fruit (Weapon)', itemStacks: 3},
]);

export const trialListBf: Trial[] = [
    createCombat('First Steps', trial1Enemies, trial1Rewards)
];