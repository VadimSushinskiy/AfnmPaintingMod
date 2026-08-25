import { BuffRoom, Realm, realms, realmToTier } from "afnm-types";
import { ink } from "../techniques/painting";
import { HotTub } from "@mui/icons-material";

export const inkBathRooms: BuffRoom[] = realms.map(
  (realm): BuffRoom => ({
    kind: 'buff',
    buffs: [
      {
        name: `Ink Infusion`,
        icon: ink.icon,
        canStack: true,
        stats: undefined,
        onCombatStartEffects: [
            {
                kind: 'buffSelf',
                buff: ink,
                amount: {
                    value: realms.indexOf(realm),
                    stat: undefined,
                }
            }
        ],
        stacks: 2,
        stacksAreDays: true,
      },
    ],
    moneyCost: window.modAPI.utils.getNumericReward(15, realm, 'Early'),
    name: `Ink Bath (${realmToTier[realm]})`,
    description: `A room filled to the brim with black spirit ink. By infusing cultivator's body and blood, it allows them to create a small amount of ink at any time and instantly use powerful painting techniques.`,
    realm: realm,
    rarity: 'qitouched',
    icon: HotTub,
    buildMonths: 7,
  }),
);

export const inkBathPlusRooms: BuffRoom[] = realms.map(
  (realm): BuffRoom => ({
    kind: 'buff',
    buffs: [
      {
        name: `Ink Infusion`,
        icon: ink.icon,
        canStack: true,
        stats: undefined,
        onCombatStartEffects: [
            {
                kind: 'buffSelf',
                buff: ink,
                amount: {
                    value: realms.indexOf(realm) + 1,
                    stat: undefined,
                }
            }
        ],
        stacks: 2,
        stacksAreDays: true,
      },
    ],
    moneyCost: window.modAPI.utils.getNumericReward(20, realm, 'Early'),
    name: `Ink Bath+ (${realmToTier[realm]})`,
    description: `A room filled to the brim with black spirit ink. By infusing cultivator's body and blood, it allows them to create a small amount of ink at any time and instantly use powerful painting techniques.`,
    realm: realm,
    rarity: 'empowered',
    icon: HotTub,
    buildMonths: 7,
  }),
);

export const inkBathSRooms: BuffRoom[] = realms.map(
  (realm): BuffRoom => ({
    kind: 'buff',
    buffs: [
      {
        name: `Ink Infusion`,
        icon: ink.icon,
        canStack: true,
        stats: undefined,
        onCombatStartEffects: [
            {
                kind: 'buffSelf',
                buff: ink,
                amount: {
                    value: realms.indexOf(realm) + 2,
                    stat: undefined,
                }
            }
        ],
        stacks: 2,
        stacksAreDays: true,
      },
    ],
    moneyCost: window.modAPI.utils.getNumericReward(20, realm, 'Early'),
    name: `Ink Bath S (${realmToTier[realm]})`,
    description: `A room filled to the brim with black spirit ink. By infusing cultivator's body and blood, it allows them to create a small amount of ink at any time and instantly use powerful painting techniques.`,
    realm: realm,
    rarity: 'resplendent',
    icon: HotTub,
    buildMonths: 7,
  }),
);

export const inkBathRoomsAll: BuffRoom[] = [
    ...inkBathRooms,
    ...inkBathPlusRooms,
    ...inkBathSRooms,
]

export const inkBathRoomMap: Record<Realm, BuffRoom> = inkBathRooms.reduce(
  function (map, obj) {
    map[obj.realm as Realm] = obj;
    return map;
  },
  {} as Record<Realm, BuffRoom>,
);

export const inkBathPlusRoomMap: Record<Realm, BuffRoom> = inkBathPlusRooms.reduce(
  function (map, obj) {
    map[obj.realm as Realm] = obj;
    return map;
  },
  {} as Record<Realm, BuffRoom>,
);

export const inkBathSRoomMap: Record<Realm, BuffRoom> = inkBathSRooms.reduce(
  function (map, obj) {
    map[obj.realm as Realm] = obj;
    return map;
  },
  {} as Record<Realm, BuffRoom>,
);