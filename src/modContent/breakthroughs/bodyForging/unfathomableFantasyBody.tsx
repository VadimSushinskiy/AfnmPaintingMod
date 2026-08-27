import { Breakthrough } from "afnm-types";
import iconAsset from '../../../assets/breakthrough/UnfathomableFantasyBody.png';
import { paintingColor } from "../../techniques/painting";
import { fantasyOfPower } from "../../items/breakthrough/fantasyOfPower";
import { inkIron } from "../../items/materials/inkIron";
import { fleshObliterationPill } from "../../items/breakthrough/fleshObliterationPill";
import { Box, Typography } from "@mui/material";
import { inkIronRecipe } from "../../items/recipes/materials/inkIronRecipe";
import { fleshObliterationPillRecipe } from "../../items/recipes/breakthrough/fleshObliterationPillRecipe";

const {TooltipLine, GameTooltip, tooltips } = window.modAPI.components;
const spiritCore = window.modAPI.gameData.items['Spirit Core (I)'];

export const unfathomableFantasyBody: Breakthrough = {
    name: 'Unfathomable Fantasy Body',
    description: `Discard your mortal form via the obliteration pill, and perfect it, reducing its attachment to the physical world and strengthening its connection to the world of fantasy.`,
    physicalStats: {
        eyes: 2,
        meridians: 1,
        dantian: 2,
        muscles: 1,
        flesh: -1,
        digestion: 1,
    },
    socialStats: {
        lifespan: 60,
        charisma: window.modAPI.utils.getBreakthroughCharisma('meridianOpening', 1),
    },
    combatBuffs: [
        {
            buff: {
                name: 'Unfathomable Fantasy Body',
                icon: iconAsset,
                canStack: false,
                stacks: 1,
                stats: {
                    dr: {
                        value: 10,
                        stat: undefined,
                    }
                },
                colour: paintingColor,
                type: 'none',
            },
            buffStacks: {
                value: 1,
                stat: undefined,
            }
        },
    ],
    allowedSlotItems: {
        brain: [fantasyOfPower.name],
        heart: [inkIron.name],
        pill: [fleshObliterationPill.name],
        groin: [spiritCore.name],
    },
    unlocked: (flags) => true,
    hint: () => (
        <TooltipLine>{window.modAPI.utils.t('Complete enough Painted Trials to unlock.')}</TooltipLine>
    ),
    requirements: [
        (args) => ({
            done: args.breakthrough.bodyForging?.brain === fantasyOfPower.name,
            preview: (
                <GameTooltip
                    provider={() => (
                        <tooltips.ItemTooltipWithLocation
                            item={fantasyOfPower}
                            location={`Fight`}
                        />
                    )}
                    >
                    <Box display="flex">
                        <Typography fontSize="120%">
                            {
                                window.modAPI.utils.t('<itm>{itemName}</itm> in the Brain slot', { itemName: fantasyOfPower.name })
                            }
                        </Typography>
                    </Box>
                </GameTooltip>
            )
        }),
        (args) => ({
            done: args.breakthrough.bodyForging?.heart === inkIron.name,
            preview: (
                <GameTooltip
                    provider={() => (
                        <tooltips.ItemTooltipWithLocation
                            item={inkIron}
                            location={`Craft from <itm>${inkIronRecipe.name}</itm> or get from <loc>Painted Trials</loc>`}
                        />
                    )}
                    >
                    <Box display="flex">
                        <Typography fontSize="120%">
                            {
                                window.modAPI.utils.t('<itm>{itemName}</itm> in the Heart slot', { itemName: inkIron.name })
                            }
                        </Typography>
                    </Box>
                </GameTooltip>
            )
        }),
        (args) => ({
            done: args.breakthrough.bodyForging?.pill === fleshObliterationPill.name,
            preview: (
                <GameTooltip
                    provider={() => (
                        <tooltips.ItemTooltipWithLocation
                            item={fleshObliterationPill}
                            location={`Craft from <itm>${fleshObliterationPillRecipe.name}</itm>`}
                        />
                    )}
                    >
                    <Box display="flex">
                        <Typography fontSize="120%">
                            {
                                window.modAPI.utils.t('<itm>{itemName}</itm> in the Pill slot', { itemName: fleshObliterationPill.name })
                            }
                        </Typography>
                    </Box>
                </GameTooltip>
            )
        }),
        (args) => ({
            done: args.breakthrough.bodyForging?.groin === spiritCore.name,
            preview: (
                <GameTooltip
                    provider={() => (
                        <tooltips.ItemTooltipWithLocation
                            item={spiritCore}
                            location={`Defeat large spirit beasts in the <loc>${window.modAPI.gameData.locations['Spirit Well'].name}</loc>`}
                        />
                    )}
                    >
                    <Box display="flex">
                        <Typography fontSize="120%">
                            {
                                window.modAPI.utils.t('<itm>{itemName}</itm> in the Groin slot', { itemName: spiritCore.name })
                            }
                        </Typography>
                    </Box>
                </GameTooltip>
            )
        }),
    ],
    totalRequirements: 4,
    getNumDone: (args): number => {
        let count = 0;
        if (args.breakthrough.bodyForging?.brain === fantasyOfPower.name) {
        count++;
        }
        if (args.breakthrough.bodyForging?.heart === inkIron.name) {
        count++;
        }
        if (args.breakthrough.bodyForging?.pill === fleshObliterationPill.name) {
        count++;
        }
        if (args.breakthrough.bodyForging?.groin === spiritCore.name) {
        count++;
        }
        return count;
    },
}