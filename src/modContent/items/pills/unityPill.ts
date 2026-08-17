import { CraftingBuff, CraftingPillItem, Realm, realms, realmToTier } from "afnm-types";
import iconAsset from '../../../assets/item/pill/UnityPill.png';

const createBuff = (e: Realm, additionalMult: number = 0): CraftingBuff => {
    return {
        name: `Unity Pill`,
        icon: iconAsset,
        canStack: true,
        stats: undefined,
        stacks: 1,
        tooltip: `Each time you restore stability, restore Qi Pool equal to <num>${50 + additionalMult * 100 + (realms.indexOf(e) - 1) * 10}%</num> of the stability restored and lose a stack.`,
        effects: [],
        triggeredEffects: [
            {
                trigger: 'stabilityRestored',
                effects: [
                    {
                        kind: 'pool',
                        amount: { value: 1, stat: undefined, eqn: `floor(amount * ${0.5 + additionalMult + (realms.indexOf(e) - 1) / 10})`}
                    },
                    {
                        kind: 'addStack',
                        stacks: { value: -1, stat: undefined }
                    },
                ]
            }
        ],
        displayLocation: 'none',
    }
}

export const unityPills: CraftingPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'crafting',
    name: `Unity Pill (${realmToTier[e]})`,
    description: 'This pill is a practical application of the philosophy of the unity of material and spiritual. This teaching asserts that matter and energy are one and the same, and only we, with our minds and consciousness, distinguish between these concepts. Like most similar schools of thought, it only became widespread after Ying Meihua brought the "Painted Worlds" paintings to her sect and is considered heretical and delusional by most cultivators.',
    icon:iconAsset,
    toxicity: Math.floor(window.modAPI.utils.getMaxToxicity(e) * 0.3),
    effects: [
        {
            kind: 'createBuff',
            buff: createBuff(e),
            stacks: {
                value: 2,
                stat: undefined,
                isItem: true,
            }
        }
    ],
    stacks: 1,
    rarity: 'qitouched',
    realm: e,
}));

export const unityPillsPlus: CraftingPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'crafting',
    name: `Unity Pill+ (${realmToTier[e]})`,
    description: 'This pill is a practical application of the philosophy of the unity of material and spiritual. This teaching asserts that matter and energy are one and the same, and only we, with our minds and consciousness, distinguish between these concepts. Like most similar schools of thought, it only became widespread after Ying Meihua brought the "Painted Worlds" paintings to her sect and is considered heretical and delusional by most cultivators.',
    icon:iconAsset,
    toxicity: Math.floor(window.modAPI.utils.getMaxToxicity(e) * 0.3),
    effects: [
        {
            kind: 'createBuff',
            buff: createBuff(e, 0.15),
            stacks: {
                value: 4,
                stat: undefined,
                isItem: true,
            }
        }
    ],
    stacks: 1,
    rarity: 'empowered',
    realm: e,
}));

export const unityPillsS: CraftingPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'crafting',
    name: `Unity Pill S (${realmToTier[e]})`,
    description: 'This pill is a practical application of the philosophy of the unity of material and spiritual. This teaching asserts that matter and energy are one and the same, and only we, with our minds and consciousness, distinguish between these concepts. Like most similar schools of thought, it only became widespread after Ying Meihua brought the "Painted Worlds" paintings to her sect and is considered heretical and delusional by most cultivators.',
    icon:iconAsset,
    toxicity: Math.floor(window.modAPI.utils.getMaxToxicity(e) * 0.3),
    effects: [
        {
            kind: 'createBuff',
            buff: createBuff(e, 0.3),
            stacks: {
                value: 6,
                stat: undefined,
                isItem: true,
            }
        }
    ],
    stacks: 1,
    rarity: 'resplendent',
    realm: e,
}));

export const unityPillMap: Record<Realm, CraftingPillItem> = unityPills.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CraftingPillItem>,
);

export const unityPillPlusMap: Record<Realm, CraftingPillItem> = unityPillsPlus.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CraftingPillItem>,
);

export const unityPillSMap: Record<Realm, CraftingPillItem> = unityPillsS.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CraftingPillItem>,
);