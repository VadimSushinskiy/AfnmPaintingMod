import { Buff, CombatPillItem, Realm, realms, realmToTier } from "afnm-types";
import iconAsset from '../../../../assets/item/pill/blindPrecisionPill.png';

const createBuff = (e: Realm): Buff => {
    return {
        name: `Blind Precision`,
        icon: iconAsset,
        canStack: true,
        buffType: 'Pill',
        stats: {
            critchance: { value: -10 - (realms.indexOf(e) - 1) * 5, stat: undefined }
        },
        triggeredBuffEffects: [
            {
                trigger: 'critDamage',
                effects: [
                    {
                        kind: 'buffSelf',
                        buff: {
                            name: 'Blind Regeneration',
                            icon: iconAsset,
                            colour: '#075200',
                            canStack: true,
                            stats: {
                                healingBoost: { value: 1, stat: undefined, scaling: 'stacks' }
                            },
                            maxStacks: 10 + (realms.indexOf(e) - 1) * 5,
                            onRoundEffects: [
                                {
                                    kind: 'multiply',
                                    amount: { value: -0.3, stat: undefined },
                                }
                            ],
                            stacks: 1,
                        },
                        amount: { value: 1, stat: undefined }
                    }
                ]
            },
            {
                trigger: 'critHeal',
                effects: [
                    {
                        kind: 'buffSelf',
                        buff: {
                            name: 'Blind Destruction',
                            icon: iconAsset,
                            colour: '#521300',
                            canStack: true,
                            stats: {
                                damageBoost: { value: 1, stat: undefined, scaling: 'stacks' }
                            },
                            maxStacks: 10 + (realms.indexOf(e) - 1) * 5,
                            onRoundEffects: [
                                {
                                    kind: 'multiply',
                                    amount: { value: -0.3, stat: undefined },
                                }
                            ],
                            stacks: 1,
                        },
                        amount: { value: 1, stat: undefined }
                    }
                ]
            }
        ],
        tooltip: `Each time you deal critical damage, gain <num>1</num> stack of <name>Blind Regeneration</name>.<br/>Each time you do a critical heal, gain <num>1</num> stack of <name>Blind Destruction</name>.<br/>At the end of each round lose a stack.`,
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

export const blindPrecisionPills: CombatPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'combat',
    name: `Blind Precision Pill (${realmToTier[e]})`,
    description: `A pill that challenges its consumer. It blurs vision, narrows the field of view, and reduces overall accuracy, but in exchange, every precise action further enhances the cultivator's offensive and defensive capabilities, maintaining an unstoppable onslaught.`,
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

export const blindPrecisionPillsPlus: CombatPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'combat',
    name: `Blind Precision Pill+ (${realmToTier[e]})`,
    description: `A pill that challenges its consumer. It blurs vision, narrows the field of view, and reduces overall accuracy, but in exchange, every precise action further enhances the cultivator's offensive and defensive capabilities, maintaining an unstoppable onslaught.`,
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

export const blindPrecisionPillsS: CombatPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'combat',
    name: `Blind Precision Pill S (${realmToTier[e]})`,
    description: `A pill that challenges its consumer. It blurs vision, narrows the field of view, and reduces overall accuracy, but in exchange, every precise action further enhances the cultivator's offensive and defensive capabilities, maintaining an unstoppable onslaught.`,
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

export const blindPrecisionPillsAll: CombatPillItem[] = [
    ...blindPrecisionPills,
    ...blindPrecisionPillsPlus,
    ...blindPrecisionPillsS,
];

export const blindPrecisionPillMap: Record<Realm, CombatPillItem> = blindPrecisionPills.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CombatPillItem>,
);

export const blindPrecisionPillPlusMap: Record<Realm, CombatPillItem> = blindPrecisionPillsPlus.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CombatPillItem>,
);

export const blindPrecisionPillSMap: Record<Realm, CombatPillItem> = blindPrecisionPillsS.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CombatPillItem>,
);