import { Buff, EnemyEntity, EventStep, Item, RecipeItem } from "afnm-types";

export interface BaseTrial {
    title: string;
    rewards: Item[];
    playerBuffs?: Buff[];
    additionalBeforeTrialSteps?: EventStep[];
    additionalAfterTrialFailSteps?: EventStep[];
    additionalAfterTrialSuccessSteps?: EventStep[];
}

export interface CombatTrial extends BaseTrial {
    kind: 'combat';
    enemies: EnemyEntity[];
    enemiesBuffs?: Buff[];
}

export interface CraftingTrial extends BaseTrial {
    kind: 'crafting';
    recipe: RecipeItem;
}

export type Trial = CombatTrial | CraftingTrial;