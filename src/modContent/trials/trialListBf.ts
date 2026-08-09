import { techniqueItems } from "../items/technique/technique";
import { Trial } from "../types/Trial";
import { createCombat, createCrafting, getGameEnemies, getGameItems, getGameRecipe, getTechniquesItems } from "./trialHelpers";
import { trialCombatBuffs } from "./trialsCombatBuffs";

const trial1Enemies = getGameEnemies(['Ratascar']);
const trial1Rewards = getGameItems([
    {itemName: 'Spirit Fruit (Blood)', itemStacks: 3},
    {itemName: 'Spirit Fruit (Blossom)', itemStacks: 3},
    {itemName: 'Spirit Fruit (Celestial)', itemStacks: 3},
    {itemName: 'Spirit Fruit (Cloud)', itemStacks: 3},
    {itemName: 'Spirit Fruit (Fist)', itemStacks: 3},
    {itemName: 'Spirit Fruit (Weapon)', itemStacks: 3},
]);

const trial2Recipe = getGameRecipe('Healing Pill (I) Recipe');
const trial2Rewards = getGameItems([
    {itemName: 'Healing Pill+ (I)', itemStacks: 5},
    {itemName: 'Inner Fury Pill+ (I)', itemStacks: 5},
    {itemName: 'Ironskin Pill+ (I)', itemStacks: 5},
    {itemName: 'Lesser Shui Blossom', itemStacks: 10},
    {itemName: 'Lesser Yuhe Herb', itemStacks: 10},
    {itemName: 'Lesser Spirit Grass', itemStacks: 30},
]);

const trial3Enemies = getGameEnemies(['Ratascar', 'Gorashi', 'Xiaobu']);
const trial3Rewards = getGameItems([
    {itemName: 'Cold Iron', itemStacks: 5},
    {itemName: 'Condensed Qi Elixir (I)', itemStacks: 3},
    {itemName: 'Recuperation Pill (I)', itemStacks: 10},
]);

const trial4Enemies = getGameEnemies(['Leachong', 'Wenziao', 'Feicuiman']);
const trial4Rewards = getGameItems([
    {itemName: 'Leachong Leaf', itemStacks: 10},
    {itemName: 'Wenziao Proboscis', itemStacks: 10},
    {itemName: 'Feicuiman Chitin', itemStacks: 5},
    {itemName: 'Regeneration Pill+ (I)', itemStacks: 5},
    {itemName: 'Copperedge Pill+ (I)', itemStacks: 5},
    {itemName: 'Barrier Pill+ (I)', itemStacks: 5},
]);

const trial5Recipe = getGameRecipe('Bottleneck Pill (I) Recipe');
const trial5Rewards = getGameItems([
    {itemName: 'Bottleneck Pill (I)', itemStacks: 1},
    {itemName: 'Flaring Yang Bud', itemStacks: 5},
    {itemName: 'Qi Pool Pill (I)', itemStacks: 5},
    {itemName: 'Control Pill (I)', itemStacks: 3},
    {itemName: 'Intensity Pill (I)', itemStacks: 3},
]);

const trial6Enemies = getGameEnemies(['Hungry Ghoul', 'Restless Ancestor']);
const trial6PlayerBuffs = [trialCombatBuffs.graveStench]
const trial6Rewards = getTechniquesItems(['Ink Splashing', 'Ink Wall']);

export const trialListBf: Trial[] = [
    createCombat('First Steps', trial1Enemies, trial1Rewards),
    createCrafting('Crafting Basics', trial2Recipe, trial2Rewards),
    createCombat('Real First Steps', trial3Enemies, trial3Rewards),
    createCombat('Forest Brawl', trial4Enemies, trial4Rewards),
    createCrafting('Minimum Qualifications', trial5Recipe, trial5Rewards),
    createCombat('Walking Corpses', trial6Enemies, trial6Rewards, trial6PlayerBuffs),
];