import { CraftingTechniqueItem } from "afnm-types";
import { craftingActions } from "../../craftingActions/craftingActions";

export const craftingActionItems: CraftingTechniqueItem[] = craftingActions.map((e) => ({
  technique: e.name,
  kind: 'action',
  name: e.name,
  displayName: e.displayName,
  description: window.modAPI.utils.tr("The knowledge of how to perform the '{e_name}' crafting action.", {
    e_name: e.name,
  }),
  icon: e.icon,
  stacks: 1,
  rarity: 'mundane',
  realm: e.realm,
}));

export const craftingActionItemsMap: Record<string, CraftingTechniqueItem> =
  craftingActionItems.reduce((map, e) => {
    map[e.name as string] = e;
    return map;
  }, 
{} as Record<string, CraftingTechniqueItem>);