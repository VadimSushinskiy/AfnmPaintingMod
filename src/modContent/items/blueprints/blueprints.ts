import { BlueprintItem } from "afnm-types";
import { rooms } from "../../house/rooms";

export const blueprints: BlueprintItem[] = rooms.map((e) => ({
  kind: 'blueprint',
  name: 'Blueprint: ' + e.name,
  displayName: window.modAPI.utils.tr('Blueprint: {roomName}', { roomName: e.displayName ?? e.name }),
  description: e.description,
  icon: window.modAPI.gameData.items['Blueprint: Cloud-Infusion Bath (I)'].icon,
  room: e,
  stacks: 1,
  rarity: e.rarity,
  realm: e.realm,
  valueTier: e.valueTier,
}));

export const blueprintMap = blueprints.reduce<Record<string, BlueprintItem>>(
  (map, obj) => {
    map[obj.room.name] = obj;
    return map;
  },
  {},
);
