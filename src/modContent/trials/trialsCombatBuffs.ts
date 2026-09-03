import { Buff, CraftingBuff } from "afnm-types";
import graveStenchIcon from '../../assets/trialsBuffs/GraveStench.png';
import naughtyCauldronIcon from '../../assets/trialsBuffs/NaughtyCauldron.png';
import misfortuneIcon from '../../assets/trialsBuffs/Misfortune.png';
import elitePowerIcon from '../../assets/trialsBuffs/ElitePower.png';
import phoenixBlessingIcon from '../../assets/trialsBuffs/PhoenixBlessing.png';
import iconAsset from '../../assets/trialsBuffs/UnbearableHeat.png';

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

const elitePower: Buff = {
    name: 'Elite Power',
    icon: elitePowerIcon,
    canStack: false,
    stacks: 1,
    stats: {
        power: {
            value: 0.25,
            stat: 'power',
        },
        protection: {
            value: 25,
            stat: undefined,
        },
        critchance: {
            value: 10,
            stat: undefined,
        }
    },
}

const phoenixBlessing: Buff = {
    name: 'Phoenix Blessing',
    icon:phoenixBlessingIcon,
    canStack: false,
    stacks: 1,
    stats: undefined,
    onRoundEffects: [
        {
            kind: 'heal',
            amount: {
                value: 0.15,
                stat: 'maxhp',
            }
        }
    ]
}

const seaOfFire: Buff = {
    name: 'Sea ​​of F​ire',
    icon:iconAsset,
    canStack: false,
    stacks: 1,
    stats: {
        barrierMitigation: {
            value: -15,
            stat: undefined,
        }
    },
    afterTechniqueEffects: [
        {
            kind: 'damageSelf',
            amount: {value: window.modAPI.utils.getExpectedHealth('bodyForging', 'Middle') * 0.015, stat: undefined}
        }
    ]
}

export const trialCombatBuffs = {
    graveStench: graveStench,
    elitePower: elitePower,
    phoenixBlessing: phoenixBlessing,
    seaOfFire: seaOfFire,
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

const misfortune: CraftingBuff = {
    name: 'Misfortune',
    icon: misfortuneIcon,
    canStack: false,
    stacks: 1,
    stats: {
        successChanceBonus: {
            value: -0.2,
            stat: undefined,
        }
    },
    effects: [],
    displayLocation: 'none',
}

export const trialCraftingBuffs = {
    naughtyCauldron: naughtyCauldron,
    misfortune: misfortune,
};