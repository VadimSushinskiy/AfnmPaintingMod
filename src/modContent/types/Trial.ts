import { Buff, CraftingBuff, EnemyEntity, EventStep, Item, RecipeItem } from "afnm-types";

export interface BaseTrial {
    title: string;
    rewards: Item[];
    additionalBeforeTrialSteps?: EventStep[];
    additionalAfterTrialFailSteps?: EventStep[];
    additionalAfterTrialSuccessSteps?: EventStep[];
}

export interface CombatTrial extends BaseTrial {
    kind: 'combat';
    enemies: EnemyEntity[];
    playerBuffs?: Buff[];
    enemiesBuffs?: Buff[];
}

export interface CraftingTrial extends BaseTrial {
    kind: 'crafting';
    recipe: RecipeItem;
    result: 'normal' | 'perfect' | 'sublime';
    isSublime: boolean;
    playerBuffs?: CraftingBuff[];
}

export type Trial = CombatTrial | CraftingTrial;