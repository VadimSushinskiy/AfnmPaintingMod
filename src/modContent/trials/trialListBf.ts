import { fourColorArray } from "../craftingActions/1/fourColorArray";
import { inkIron } from "../items/materials/inkIron";
import { spiritInk } from "../items/materials/spiritInk";
import { inkBrushRecipe } from "../items/recipes/mounts/inkBrushRecipe";
import { bindingAgonyPillIRecipe } from "../items/recipes/pills/bindingAgonyPillRecipe";
import { fantasyZenithPillIRecipe } from "../items/recipes/pills/fantasyZenithPillRecipe";
import { craftingActionItemsMap } from "../items/techniques/craftingAction";
import { techniqueItemsMap } from "../items/techniques/technique";
import { youngPhoenix } from "../monsters/phoenix";
import { inkSplashing } from "../techniques/1/inkSplashing";
import { inkWall } from "../techniques/1/inkWall";
import { Trial } from "../types/Trial";
import { createCombat, createCrafting, getGameEnemies, getGameItems, getGameRecipe, getTrialRecipe } from "./trialHelpers";
import { trialCombatBuffs, trialCraftingBuffs } from "./trialsCombatBuffs";

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
const trial6PlayerBuffs = [trialCombatBuffs.graveStench];
const trial6Rewards = [techniqueItemsMap[inkSplashing.name], techniqueItemsMap[inkWall.name], {...spiritInk, stacks: 1}];

const trial7Recipe = getTrialRecipe('bodyForging', 'Middle', 'hard', 'Trial 7 Recipe', 'normal');
const trial7Buffs = [trialCraftingBuffs.naughtyCauldron];
const trial7Rewards = [craftingActionItemsMap[fourColorArray.name], {...spiritInk, stacks: 3}];

const trial8Recipe = getTrialRecipe('bodyForging', 'Middle', 'hard', 'Trial 8 Recipe');
const trial8Buffs = [trialCraftingBuffs.misfortune];
const trial8Rewards = [{...spiritInk, stacks: 5}, {...inkIron, stacks: 2}];

const trial9Enemies = getGameEnemies(['Poeyu', 'Lingyu Lurker'], 'alpha');
const trial9EnemyBuffs = [trialCombatBuffs.elitePower];
const trial9Rewards = [bindingAgonyPillIRecipe, fantasyZenithPillIRecipe, {...spiritInk, stacks: 2}];

const trial10Enemies = [youngPhoenix]; 
const trial10PlayerBuffs = [trialCombatBuffs.seaOfFire];
const trial10EnemyBuffs = [trialCombatBuffs.phoenixBlessing];
const trial10Rewards = [inkBrushRecipe, {...spiritInk, stacks: 3}];

export const trialListBf: Trial[] = [
    createCombat('First Steps', trial1Enemies, trial1Rewards),
    createCrafting('Crafting Basics', trial2Recipe, trial2Rewards, 'normal'),
    createCombat('Real First Steps', trial3Enemies, trial3Rewards),
    createCombat('Forest Brawl', trial4Enemies, trial4Rewards),
    createCrafting('Minimum Qualifications', trial5Recipe, trial5Rewards, 'normal'),
    createCombat('Walking Corpses', trial6Enemies, trial6Rewards, trial6PlayerBuffs),
    createCrafting('Naughty Cauldron', trial7Recipe, trial7Rewards, 'normal', false, trial7Buffs),
    createCrafting('Misfortune', trial8Recipe, trial8Rewards, 'perfect', false, trial8Buffs),
    createCombat('Outstanding Beasts', trial9Enemies, trial9Rewards, [], trial9EnemyBuffs),
    createCombat('Phoenix Presence', trial10Enemies, trial10Rewards, trial10PlayerBuffs, trial10EnemyBuffs),
];