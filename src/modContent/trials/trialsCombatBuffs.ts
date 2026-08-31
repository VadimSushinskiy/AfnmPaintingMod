import { Buff, CraftingBuff } from "afnm-types";
import graveStenchIcon from '../../assets/trialsBuffs/GraveStench.png';
import naughtyCauldronIcon from '../../assets/item/item/NaughtyCauldron.png';

const graveStench: Buff = {
    name: 'Grave Stench',
    icon: graveStenchIcon,
    canStack: false,
    stacks: 1,
    stats: {
        weakness: {
            value: 20,
            stat: undefined
        }
    },
    afterTechniqueEffects: [
        {
            kind: 'damageSelf',
            amount: {value: window.modAPI.utils.getExpectedHealth('bodyForging', 'Middle') * 0.01, stat: undefined}
        }
    ],
}

export const trialCombatBuffs = {
    graveStench: graveStench
};

const naughtyCauldron: CraftingBuff = {
    name: 'Naughty Cauldron',
    icon:naughtyCauldronIcon ,
    canStack: false,
    stacks: 1,
    stats: {
        control: {
            value: -0.2, stat: 'control',
        },
        intensity: {
            value: -0.2, stat: 'intensity',
        }
    },
    effects: [],
    displayLocation: 'none',
}

export const trialCraftingBuffs = {
    naughtyCauldron: naughtyCauldron,
};