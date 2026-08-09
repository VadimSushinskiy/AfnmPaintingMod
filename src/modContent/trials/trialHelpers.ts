import { Buff, EnemyEntity, EventStep, Item, RecipeItem } from "afnm-types";
import { CombatTrial, CraftingTrial } from "../types/Trial";

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
    buffs: Buff[] = [],
    beforeTrial: EventStep[] = [],
    afterWin: EventStep[] = [],
    afterLose: EventStep[] = [],
): CraftingTrial => ({
    kind: 'crafting',
    title,
    recipe,
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
        return {...gameItem, stacks: item.itemStacks};
    });
}