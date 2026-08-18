import { Buff, CombatPillItem, Realm, realms, realmToTier } from "afnm-types";
import iconAsset from '../../../../assets/item/pill/EnergyResonancePill.png';

const createBuff = (e: Realm): Buff => {
    return {
        name: `Energy Resonance`,
        icon: iconAsset,
        canStack: true,
        buffType: 'Pill',
        stats: undefined,
        tooltip: 'Each time you gain barrier, gain <num>1</num> stack of <name>Energy Resonance Amplification</name>.<br/>At the end of each round lose a stack.',
        triggeredBuffEffects: [
            {
                trigger: 'barrierGained',
                effects: [
                    {
                        kind: 'buffSelf',
                        buff: {
                            name: 'Energy Resonance Amplification',
                            icon: iconAsset,
                            canStack: true,
                            stats: {
                                barrierMitigation: { value: 1, stat: undefined, scaling: 'stacks'}
                            },
                            onRoundEffects: [
                                {
                                    kind: 'multiply',
                                    amount: {
                                        value: -0.5,
                                        stat: undefined,
                                    }
                                }
                            ],
                            stacks: 1,
                            maxStacks: (realms.indexOf(e) + 1) * 10
                        },
                        amount: {value: 1, stat: undefined}
                    }
                ]
            }
        ],
        onRoundEffects: [
            {
                kind: 'add',
                amount: {
                    value: -1,
                    stat: undefined,
                },
            },
        ],
        stacks: 1,
    }
}

export const energyResonancePills: CombatPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'combat',
    name: `Energy Resonance Pill (${realmToTier[e]})`,
    description: `An invaluable pill for any cultivator who relies on barrier. It enhances resonance of the consumers's energy with itself, strengthening the barrier the more it's generated, creating a nearly endless cycle of restoration and self-strengthening.`,
    icon: iconAsset,
    toxicity: Math.floor(window.modAPI.utils.getMaxToxicity(e) * 0.3),
    effects: [
        {
            kind: 'buffSelf',
            buff: createBuff(e),
            amount: {
                value: 3,
                stat: undefined,
                isItem: true,
            }
        }
    ],
    stacks: 1,
    rarity: 'qitouched',
    realm: e,
}));

export const energyResonancePillsPlus: CombatPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'combat',
    name: `Energy Resonance Pill+ (${realmToTier[e]})`,
    description: `An invaluable pill for any cultivator who relies on barrier. It enhances resonance of the consumers's energy with itself, strengthening the barrier the more it's generated, creating a nearly endless cycle of restoration and self-strengthening.`,
    icon: iconAsset,
    toxicity: Math.floor(window.modAPI.utils.getMaxToxicity(e) * 0.3),
    effects: [
        {
            kind: 'buffSelf',
            buff: createBuff(e),
            amount: {
                value: 5,
                stat: undefined,
                isItem: true,
            }
        }
    ],
    stacks: 1,
    rarity: 'empowered',
    realm: e,
}));

export const energyResonancePillsS: CombatPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'combat',
    name: `Energy Resonance Pill S (${realmToTier[e]})`,
    description: `An invaluable pill for any cultivator who relies on barrier. It enhances resonance of the consumers's energy with itself, strengthening the barrier the more it's generated, creating a nearly endless cycle of restoration and self-strengthening.`,
    icon: iconAsset,
    toxicity: Math.floor(window.modAPI.utils.getMaxToxicity(e) * 0.3),
    effects: [
        {
            kind: 'buffSelf',
            buff: createBuff(e),
            amount: {
                value: 7,
                stat: undefined,
                isItem: true,
            }
        }
    ],
    stacks: 1,
    rarity: 'resplendent',
    realm: e,
}));

export const energyResonancePillMap: Record<Realm, CombatPillItem> = energyResonancePills.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CombatPillItem>,
);

export const energyResonancePillPlusMap: Record<Realm, CombatPillItem> = energyResonancePillsPlus.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CombatPillItem>,
);

export const energyResonancePillSMap: Record<Realm, CombatPillItem> = energyResonancePillsS.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CombatPillItem>,
);