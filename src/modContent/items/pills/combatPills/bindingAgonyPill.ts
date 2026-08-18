import { Buff, CombatPillItem, Realm, realms, realmToTier } from "afnm-types";
import iconAsset from '../../../../assets/item/pill/BindingAgonyPill.png';

const createBuff = (e: Realm): Buff => {
    return {
        name: `Binding Agony`,
        icon: iconAsset,
        canStack: true,
        buffType: 'Pill',
        stats: {
            protection: {value: 1, stat: undefined, eqn: `floor(${100 + (realms.indexOf(e) - 1) * 20} * (1 - hp/maxhp))`}
        },
        statsTooltip: `Protection: Up to <num>${100 + (realms.indexOf(e) - 1) * 20}</num> based on your health, gaining maximum when your health is <name>empty</name>.`,
        // tooltip: `Protection: Up to <num>${100 + (realms.indexOf(e) - 1) * 20}</num> based on your health, gaining maximum when your health is <name>empty</name>.`,
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

export const bindingAgonyPills: CombatPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'combat',
    name: `Binding Agony Pill (${realmToTier[e]})`,
    description: `One of the paradoxical pills the Painted Worlds provide knowledge of. This pill, contrary to logic, temper, strengthens, and protects cultivator's body the more powerfully the body approaches destruction, binding flesh with the very force of agony. But once recovery and healing begins, the binding force quickly fades, leaving the body vulnerable once again, as if this pill desires for the pain and agony to never end.`,
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

export const bindingAgonyPillsPlus: CombatPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'combat',
    name: `Binding Agony Pill+ (${realmToTier[e]})`,
    description: `One of the paradoxical pills the Painted Worlds provide knowledge of. This pill, contrary to logic, temper, strengthens, and protects cultivator's body the more powerfully the body approaches destruction, binding flesh with the very force of agony. But once recovery and healing begins, the binding force quickly fades, leaving the body vulnerable once again, as if this pill desires for the pain and agony to never end.`,
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

export const bindingAgonyPillsS: CombatPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'combat',
    name: `Binding Agony Pill S (${realmToTier[e]})`,
    description: `One of the paradoxical pills the Painted Worlds provide knowledge of. This pill, contrary to logic, temper, strengthens, and protects cultivator's body the more powerfully the body approaches destruction, binding flesh with the very force of agony. But once recovery and healing begins, the binding force quickly fades, leaving the body vulnerable once again, as if this pill desires for the pain and agony to never end.`,
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

export const bindingAgonyPillsAll: CombatPillItem[] = [
    ...bindingAgonyPills,
    ...bindingAgonyPillsPlus,
    ...bindingAgonyPillsS,
]

export const bindingAgonyPillMap: Record<Realm, CombatPillItem> = bindingAgonyPills.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CombatPillItem>,
);

export const bindingAgonyPillPlusMap: Record<Realm, CombatPillItem> = bindingAgonyPillsPlus.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CombatPillItem>,
);

export const bindingAgonyPillSMap: Record<Realm, CombatPillItem> = bindingAgonyPillsS.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CombatPillItem>,
);
