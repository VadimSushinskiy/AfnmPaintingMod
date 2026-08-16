import { Buff, CombatPillItem, Realm, realms, realmToTier } from "afnm-types";
import iconAsset from '../../../assets/item/pill/FantasyZenithPill.png';

const createBuff = (e: Realm): Buff => {
    return {
        name: `Fantasy Zenith`,
        icon: iconAsset,
        canStack: true,
        buffType: 'Pill',
        stats: {
            maxhp: {
                value: -Math.floor(window.modAPI.utils.getExpectedHealth(e, 'Late') * 0.25),
                stat: undefined
            },
            maxbarrier: {
                value: Math.floor(window.modAPI.utils.getExpectedBarrier(e, 'Late') * 0.3),
                stat: undefined,
                isItem: true,
            },
            barrierMitigation: {
                value: 3 + realms.indexOf(e),
                stat: undefined,
                isItem: true,
            },
        },
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

export const fantasyZenithPills: CombatPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'combat',
    name: `Fantasy Zenith Pill (${realmToTier[e]})`,
    description: 'One of the strangest pills, knowledge of which comes from the Painted Worlds. When consumed, the connection with the physical world weakens, but instead, the connection with a mysterious world of fantasy, dreams, and imagination greatly increases. Understanding this world eludes even the most powerful cultivators and there is no known case of anyone successfully entering this world completely, but it\'s said that if someone succeeds in reaching this place and leaving the physical world, they will immediately achieve immortality. However, no one has ever been able to confirm these rumors.',
    icon:iconAsset,
    toxicity: Math.floor(window.modAPI.utils.getMaxToxicity(e) * 0.25),
    effects: [
        {
            kind: 'buffSelf',
            buff: createBuff(e),
            amount: {
                value: 4,
                stat: undefined,
            }
        }
    ],
    stacks: 1,
    rarity: 'qitouched',
    realm: e,
}));

export const fantasyZenithPillsPlus: CombatPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'combat',
    name: `Fantasy Zenith Pill+ (${realmToTier[e]})`,
    description: 'One of the strangest pills, knowledge of which comes from the Painted Worlds. When consumed, the connection with the physical world weakens, but instead, the connection with a mysterious world of fantasy, dreams, and imagination greatly increases. Understanding this world eludes even the most powerful cultivators and there is no known case of anyone successfully entering this world completely, but it\'s said that if someone succeeds in reaching this place and leaving the physical world, they will immediately achieve immortality. However, no one has ever been able to confirm these rumors.',
    icon:iconAsset,
    toxicity: Math.floor(window.modAPI.utils.getMaxToxicity(e) * 0.25),
    effects: [
        {
            kind: 'buffSelf',
            buff: createBuff(e),
            amount: {
                value: 6,
                stat: undefined,
            }
        }
    ],
    stacks: 1,
    rarity: 'empowered',
    realm: e,
}));

export const fantasyZenithPillsS: CombatPillItem[] = realms.map((e) => ({
    kind: 'pill',
    pillKind: 'combat',
    name: `Fantasy Zenith Pill S (${realmToTier[e]})`,
    description: 'One of the strangest pills, knowledge of which comes from the Painted Worlds. When consumed, the connection with the physical world weakens, but instead, the connection with a mysterious world of fantasy, dreams, and imagination greatly increases. Understanding this world eludes even the most powerful cultivators and there is no known case of anyone successfully entering this world completely, but it\'s said that if someone succeeds in reaching this place and leaving the physical world, they will immediately achieve immortality. However, no one has ever been able to confirm these rumors.',
    icon:iconAsset,
    toxicity: Math.floor(window.modAPI.utils.getMaxToxicity(e) * 0.25),
    effects: [
        {
            kind: 'buffSelf',
            buff: createBuff(e),
            amount: {
                value: 8,
                stat: undefined,
            }
        }
    ],
    stacks: 1,
    rarity: 'resplendent',
    realm: e,
}));

export const fantasyZenithPillMap: Record<Realm, CombatPillItem> = fantasyZenithPills.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CombatPillItem>,
);

export const fantasyZenithPillPlusMap: Record<Realm, CombatPillItem> = fantasyZenithPillsPlus.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CombatPillItem>,
);

export const fantasyZenithPillSMap: Record<Realm, CombatPillItem> = fantasyZenithPillsS.reduce(
  (map, e) => {
    map[e.realm as Realm] = e;
    return map;
  },
  {} as Record<Realm, CombatPillItem>,
);