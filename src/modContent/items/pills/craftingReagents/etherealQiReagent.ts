import { CraftingReagentItem, Realm, realms, realmToTier } from "afnm-types";
import iconAsset from '../../../../assets/item/reagent/EtherealQiReagent.png';

export const etherealQiReagents: CraftingReagentItem[] = realms.map((e) => ({
  kind: 'reagent',
  toxicity: Math.floor(window.modAPI.utils.getMaxToxicity(e) * 0.35),
  effects: [
    {
      kind: 'createBuff',
      buff: {
        name: `Ethereal Qi Reagent`,
        icon: iconAsset,
        canStack: false,
        stats: undefined,
        effects: [],
        tooltip: `Each time you spend Qi Pool, you have a <num>${10 + realms.indexOf(e) - 1}%</num> chance to restore the spent Qi Pool.`,
        triggeredEffects: [
            {
                trigger: 'poolSpent',
                effects: [
                    {
                        kind: 'pool',
                        amount: {value: 1, stat: undefined, eqn: 'amount'},
                        condition: {kind: 'chance', percentage: 10 + realms.indexOf(e) - 1}
                    }
                ]
            }
        ],
        stacks: 1,
        displayLocation: 'none',
      },
      stacks: {
        value: 1,
        stat: undefined,
      },
    },
  ],
  name: `Ethereal Qi Reagent (${realmToTier[e]})`,
  description: `A blended powder reagent to be applied at the start of an alchemist's craft. When applied to the lining of the cauldron it sometimes redirects energetic influences from the crafting process into some unseen dimension without affecting Qi Pool of the craftsman himself.`,
  icon: iconAsset,
  stacks: 1,
  rarity: 'resplendent',
  realm: e,
}));

export const etherealQiReagentMap: Record<Realm, CraftingReagentItem> = etherealQiReagents.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CraftingReagentItem>,
);