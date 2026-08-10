import { Buff } from "afnm-types";
import iconAsset from '../../assets/trialsBuffs/GraveStench.png';

const graveStench: Buff = {
    name: 'Grave Stench',
    icon: iconAsset,
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