import { Buff, CraftingBuff, EnemyEntity, EventStep, Item, Realm, RealmProgress, RecipeDifficulty, RecipeItem, TechniqueItem } from "afnm-types";
import { CombatTrial, CraftingTrial } from "../types/Trial";
import { techniqueItems } from "../items/techniques/technique";
import { trialRecipe } from "../items/recipes/treasure/trialRecipe";
import { successfulTrialResult } from "../items/treasures/successfulTrialResult";
import { failedTrialResult } from "../items/treasures/failedTrialResult";

export type CraftingResult = 'normal' | 'perfect' | 'sublime';
export type CraftingConditionName  = 'Inert' | 'Perfectable' | 'Fuseable' | 'Flowing' | 'Energised' | 'Stable' | 'Fortuitous' | 'None';

export const createCombat = (
    title: string, 
    enemies: EnemyEntity[], 
    rewards: Item[],
    buffs: Buff[] = [],
    enemiesBuffs = [],
    beforeTrial: EventStep[] = [],
    afterWin: EventStep[] = [],
    afterLose: EventStep[] = [],
): CombatTrial => ({
    kind: 'combat',
    title,
    enemies,
    rewards,
    playerBuffs: buffs,
    enemiesBuffs: enemiesBuffs,
    additionalBeforeTrialSteps: beforeTrial,
    additionalAfterTrialSuccessSteps: afterWin,
    additionalAfterTrialFailSteps: afterLose,
});

export const createCrafting = (
    title: string, 
    recipe: RecipeItem, 
    rewards: Item[],
    result: CraftingResult = 'perfect',
    isSublime: boolean = false,
    buffs: CraftingBuff[] = [],
    beforeTrial: EventStep[] = [],
    afterWin: EventStep[] = [],
    afterLose: EventStep[] = [],
): CraftingTrial => ({
    kind: 'crafting',
    title,
    recipe,
    result,
    isSublime,
    rewards,
    playerBuffs: buffs,
    additionalBeforeTrialSteps: beforeTrial,
    additionalAfterTrialSuccessSteps: afterWin,
    additionalAfterTrialFailSteps: afterLose,
});

export const getGameEnemies = (enemyNames: string[]): EnemyEntity[] => {
    return enemyNames.map(enemyName => window.modAPI.gameData.monsters.find(monster => monster.name === enemyName) ?? window.modAPI.gameData.monsters[0]);
}

export const getGameItems = (items: { itemName: string, itemStacks: number }[]): Item[] => {
    return items.map(item => {
        const gameItem = window.modAPI.gameData.items[item.itemName];
        if (!gameItem) {
            return window.modAPI.gameData.items['Healing Pill (-)'];
        }
        return {...gameItem, stacks: item.itemStacks};
    });
}

export const getGameRecipe = (recipeName: string): RecipeItem => {
    const item = window.modAPI.gameData.items[recipeName];
    return item.kind === 'recipe' ? item : window.modAPI.gameData.items['Healing Pill (-) Recipe'] as RecipeItem;
}

export const getTechniquesItems = (techNames: string[]): TechniqueItem[] => {
    return techniqueItems.filter(t => techNames.includes(t.name));
}

export const getTrialRecipe = (
    realm: Realm, 
    realmProgress: RealmProgress, 
    difficulty: RecipeDifficulty, 
    name: string,
    result: CraftingResult = 'perfect',
    conditionOverride: CraftingConditionName = 'None',
    ingredients: RecipeItem["ingredients"] = []
): RecipeItem => {
    const recipe = {...trialRecipe, realm, realmProgress, difficulty, displayName: name};

    if (result === 'normal') {
        recipe.baseItem = successfulTrialResult;
    }
    else if (result === 'sublime') {
        recipe.perfectItem = failedTrialResult;
        recipe.sublimeItem = successfulTrialResult;
        recipe.isSublimeCraft = true;
        recipe.forceSublimeCrafting = true;
    }

    if (conditionOverride !== 'None') {
        recipe.conditionEffectOverride = window.modAPI.gameData.recipeConditionEffects.find(cond => cond.name === conditionOverride);
    }

    if (ingredients && ingredients.length > 0) {
        recipe.ingredients = ingredients;
    }

    return recipe;
}

export const createTrialRecipe = (recipe: RecipeItem): void => {
    if (recipe) {
        window.modAPI.gameData.items[recipe.name] = recipe;
    }
}