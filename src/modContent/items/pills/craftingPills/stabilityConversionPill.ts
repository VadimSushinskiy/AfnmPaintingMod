import { CraftingPillItem, Realm, realms, realmToTier } from "afnm-types";
import iconAsset from '../../../../assets/item/pill/artgen-item-stabilityConversionPill-3_00010__upscaled (1).png';

export const stabilityConversionPills: CraftingPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'crafting',
    name: `Stability Conversion Pill (${realmToTier[e]})`,
    description: `A pill that exchanges potential for immediate gain. It significantly stabilizes the crafted item at the expense of future stability. This exchange is always unprofitable, but in critical situations, even the most unfair exchange can save the entire craft and bring enormous benefits to an experienced craftsman.`,
    icon:iconAsset,
    toxicity: Math.floor(window.modAPI.utils.getMaxToxicity(e) * 0.4),
    effects: [
        {
            kind: 'stability',
            amount: { value: 15 + (realms.indexOf(e) - 1) * 3, stat: undefined }
        },
        {
            kind: 'maxStability',
            amount: { value: -2, stat: undefined }
        }
    ],
    stacks: 1,
    rarity: 'qitouched',
    realm: e,
}));

export const stabilityConversionPillsPlus: CraftingPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'crafting',
    name: `Stability Conversion Pill+ (${realmToTier[e]})`,
    description: `A pill that exchanges potential for immediate gain. It significantly stabilizes the crafted item at the expense of future stability. This exchange is always unprofitable, but in critical situations, even the most unfair exchange can save the entire craft and bring enormous benefits to an experienced craftsman.`,
    icon:iconAsset,
    toxicity: Math.floor(window.modAPI.utils.getMaxToxicity(e) * 0.4),
    effects: [
        {
            kind: 'stability',
            amount: { value: 20 + (realms.indexOf(e) - 1) * 3, stat: undefined }
        },
        {
            kind: 'maxStability',
            amount: { value: -2, stat: undefined }
        }
    ],
    stacks: 1,
    rarity: 'empowered',
    realm: e,
}));

export const stabilityConversionPillsS: CraftingPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'crafting',
    name: `Stability Conversion Pill S (${realmToTier[e]})`,
    description: `A pill that exchanges potential for immediate gain. It significantly stabilizes the crafted item at the expense of future stability. This exchange is always unprofitable, but in critical situations, even the most unfair exchange can save the entire craft and bring enormous benefits to an experienced craftsman.`,
    icon:iconAsset,
    toxicity: Math.floor(window.modAPI.utils.getMaxToxicity(e) * 0.4),
    effects: [
        {
            kind: 'stability',
            amount: { value: 25 + (realms.indexOf(e) - 1) * 3, stat: undefined }
        },
        {
            kind: 'maxStability',
            amount: { value: -2, stat: undefined }
        }
    ],
    stacks: 1,
    rarity: 'resplendent',
    realm: e,
}));

export const stabilityConversionPillsAll: CraftingPillItem[] = [
    ...stabilityConversionPills,
    ...stabilityConversionPillsPlus,
    ...stabilityConversionPillsS,
]

export const stabilityConversionPillMap: Record<Realm, CraftingPillItem> = stabilityConversionPills.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CraftingPillItem>,
);

export const stabilityConversionPillPlusMap: Record<Realm, CraftingPillItem> = stabilityConversionPillsPlus.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CraftingPillItem>,
);

export const stabilityConversionPillSMap: Record<Realm, CraftingPillItem> = stabilityConversionPillsS.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CraftingPillItem>,
);