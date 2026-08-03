import { ModScreenFC } from "afnm-types";
import { Avatar, Badge, Box, Divider, Stack, Typography } from "@mui/material";
import bg from "../../../assets/bg.png";
import dialogBg from "../../../assets/testBg4.jpg";
import textBg from "../../../assets/textBg.png";
import testButton from "../../../assets/startButton.png";
import { useState } from "react";
import { FloorItem } from "./FloorItem";
import { MonsterFormation } from "./MonsterFormation";

export const TestScreen: ModScreenFC = ({ screenAPI }) => {
    const { useSelector, usePlaySfx, actions, components } = screenAPI;
    const { GameDialog, BackgroundImage, PlayerComponent, GameTooltip, GameButton } = components;
    

    const player = useSelector((state) => state.player.player);
    const breakthrough = useSelector((state) => state.breakthrough);
    const playSfx = usePlaySfx();

    const [selectedFloor, setSelectedFloor] = useState(13);

    const floorsData = Array.from({ length: 20 }, (_, i) => i);

    const buffExample = window.modAPI.gameData.mysticalRegionBlessings[0].buff;
    const itemExample = window.modAPI.gameData.items["Eon Glass"];

    const floorText = `Floor 7 ● Flesh Withering`;

    const createTitle = (text: string)  => {
        return (
            <Typography 
                fontSize="180%" 
                alignSelf="start" 
                mb={0.5} 
                // color='#8b1a1a' 
                // fontWeight={600}
                // sx={
                //     {
                //         textShadow: '0 1px 0 rgba(255,255,255,.4), 0 -1px 0 rgba(90, 0, 0, 0.35)',
                //         background: `url('${textBg}') center/ 100% 100% no-repeat`,
                //         width: 'fit-content',
                //         pl: 5,
                //         pr: 7,
                //         py: 1
                //     }
                // }
                color="#d8c5a0"
                fontWeight={600} 
                sx={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.6)',
                    background: `url('${textBg}') center / 100% 100% no-repeat`,
                    width: 'fit-content',
                    pl: 5, pr: 7, py: 1,
                }}
            >
                {text}
            </Typography>
        );
    }

    return (
        <Box position="relative" flexGrow={1} display="flex" flexDirection="column">
            <BackgroundImage image={bg} screenEffect="sun"/>
            <GameDialog title="Tower Screen" onClose={() => actions.setScreen('location')} id="TestId1264" borderType="mystic" removePad={true}>
                <Box flexGrow={1} display="flex" flexDirection="row" overflow='hidden' sx={{background: `url('${dialogBg}') center/cover no-repeat`}}>
                    <Box flex={35} px={1} sx={{overflowY: 'auto', scrollbarWidth: 'none'}} id='tower-scroll-container'>
                        <Stack spacing={2} py={2} alignItems='center'>
                            {floorsData.map((i) => {
                                const isLocked = i < 10;
                                const isSelected = i === selectedFloor;

                                return (
                                    <FloorItem
                                        key={i}
                                        index={i}
                                        isLocked={isLocked}
                                        isSelected={isSelected}
                                        onClick={() => {
                                            setSelectedFloor(i);
                                            playSfx('Select');
                                        }}
                                    />
                                );
                            })}
                        </Stack>
                    </Box>
                    <Box flex={65} display="flex" flexDirection="column" py={2}>
                        <Box 
                            display='flex' 
                            mt={2}
                            width='100%' 
                            alignItems='center'
                            justifyContent='center'
                        >
                            {/* <Divider sx={{ alignSelf: 'center', flexGrow: 1, mx: 3, backgroundColor: 'linear-gradient(to right, #8b1a1a00 0%, #8b1a1a33 10%, #8b1a1a66 25%, #8b1a1a99 40%, #8b1a1a 50%, #8b1a1a99 60%, #8b1a1a66 75%, #8b1a1a33 90%, #8b1a1a00 100%)' }} /> */}
                            <Typography 
                                fontSize="160%" 
                                alignSelf="center" 
                                fontWeight={800}
                                sx={{
                                    // color: '#2a1d15', 
                                    // textShadow: '0px 1px 1px rgba(255, 255, 255, 0.6)', 
                                    letterSpacing: '0.5px',
                                    background: `url('${textBg}') center / 100% 100% no-repeat`,
                                    width: 'fit-content',
                                    pl: `calc(${floorText.length} * 0.3ch)`,
                                    pr: `calc(${floorText.length} * 0.35ch)`,
                                    py: 1,
                                    // pl: 13, pr: 16, py: 1,
                                    color: '#8b1a1a',
                                    textShadow: '0 1px 0 rgba(255,255,255,.4), 0 -1px 0 rgba(90, 0, 0, 0.35)',
                                }}>
                                {floorText}
                            </Typography>
                            {/* <Divider color='#8b1a1a' sx={{ alignSelf: 'center', flexGrow: 1, mx: 3, textShadow: '0 1px 0 rgba(255,255,255,.4), 0 -1px 0 rgba(90, 0, 0, 0.35)'  }} /> */}
                        </Box>
                        <Box flex={6} display='flex' alignItems='center' flexDirection="column">
                            {/* <Typography fontSize="200%" alignSelf="start" color='#8b1a1a' fontWeight={600} sx={{textShadow: '0 1px 0 rgba(255,255,255,.4), 0 -1px 0 rgba(90, 0, 0, 0.35)' }}>
                                    Enemies:
                            </Typography> */}
                            {createTitle("Enemies")}
                            <MonsterFormation/>
                        </Box>
                        <Box flex={4} mt={5} display='flex' flexDirection='row'>
                            <Box flex={5}>
                                {/* <Typography 
                                    fontSize="180%" 
                                    alignSelf="start" 
                                    mb={0.5} 
                                    color='#8b1a1a' 
                                    fontWeight={600}
                                    sx={
                                        {
                                            textShadow: '0 1px 0 rgba(255,255,255,.4), 0 -1px 0 rgba(90, 0, 0, 0.35)',
                                            background: `url('${textBg}') center/ 100% 100% no-repeat`,
                                            width: 'fit-content',
                                            pl: 5,
                                            pr: 7,
                                            py: 1
                                        }
                                    }
                                >
                                    Effects
                                </Typography> */}
                                {createTitle("Effects")}
                                {/* <GameTooltip 
                                    provider={() => (
                                        <BuffTooltip
                                            buff={{ ...buffExample, buffType: 'House' }}
                                            entity={window.modAPI.utils.createPlayerCombatEntity(player, breakthrough)}
                                        />
                                    )}
                                >
                                    Put Buff here
                                </GameTooltip> */}
                                <Box display="flex" gap="15px" alignItems='center' ml={3} flexWrap='wrap'>
                                    <Box>
                                        <Badge
                                        badgeContent={
                                            <Box
                                            sx={{
                                                background: 'black',
                                                color: 'white',
                                                borderRadius: '50%',
                                                p: 0.25,
                                                marginTop: '-32px',
                                                marginRight: '35px',
                                                width: '28px',
                                                height: '28px',
                                                border: '1px outset gold',
                                            }}
                                            >
                                            <Typography textAlign="center" fontSize="190%" lineHeight="25px" ml="-1px">
                                                {buffExample.stacks}
                                            </Typography>
                                            </Box>
                                        }
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        >
                                        <Avatar
                                            sx={{
                                            width: '75px',
                                            height: '75px',
                                            border: '1px outset gold',
                                            background: buffExample.colour ?? 'rgb(50,50,50)',
                                            }}
                                            src={buffExample.icon}
                                        />
                                        </Badge>
                                    </Box>
                                    <Box>
                                        <Badge
                                        badgeContent={
                                            <Box
                                            sx={{
                                                background: 'black',
                                                color: 'white',
                                                borderRadius: '50%',
                                                p: 0.25,
                                                marginTop: '-32px',
                                                marginRight: '35px',
                                                width: '28px',
                                                height: '28px',
                                                border: '1px outset gold',
                                            }}
                                            >
                                            <Typography textAlign="center" fontSize="190%" lineHeight="25px" ml="-1px">
                                                {buffExample.stacks}
                                            </Typography>
                                            </Box>
                                        }
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        >
                                        <Avatar
                                            sx={{
                                            width: '75px',
                                            height: '75px',
                                            border: '1px outset gold',
                                            background: buffExample.colour ?? 'rgb(50,50,50)',
                                            }}
                                            src={buffExample.icon}
                                        />
                                        </Badge>
                                    </Box>
                                    <Box>
                                        <Badge
                                        badgeContent={
                                            <Box
                                            sx={{
                                                background: 'black',
                                                color: 'white',
                                                borderRadius: '50%',
                                                p: 0.25,
                                                marginTop: '-32px',
                                                marginRight: '35px',
                                                width: '28px',
                                                height: '28px',
                                                border: '1px outset gold',
                                            }}
                                            >
                                            <Typography textAlign="center" fontSize="190%" lineHeight="25px" ml="-1px">
                                                {buffExample.stacks}
                                            </Typography>
                                            </Box>
                                        }
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        >
                                        <Avatar
                                            sx={{
                                            width: '75px',
                                            height: '75px',
                                            border: '1px outset gold',
                                            background: buffExample.colour ?? 'rgb(50,50,50)',
                                            }}
                                            src={buffExample.icon}
                                        />
                                        </Badge>
                                    </Box>
                                    <Box>
                                        <Badge
                                        badgeContent={
                                            <Box
                                            sx={{
                                                background: 'black',
                                                color: 'white',
                                                borderRadius: '50%',
                                                p: 0.25,
                                                marginTop: '-32px',
                                                marginRight: '35px',
                                                width: '28px',
                                                height: '28px',
                                                border: '1px outset gold',
                                            }}
                                            >
                                            <Typography textAlign="center" fontSize="190%" lineHeight="25px" ml="-1px">
                                                {buffExample.stacks}
                                            </Typography>
                                            </Box>
                                        }
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        >
                                        <Avatar
                                            sx={{
                                            width: '75px',
                                            height: '75px',
                                            border: '1px outset gold',
                                            background: buffExample.colour ?? 'rgb(50,50,50)',
                                            }}
                                            src={buffExample.icon}
                                        />
                                        </Badge>
                                    </Box>
                                    <Box>
                                        <Badge
                                        badgeContent={
                                            <Box
                                            sx={{
                                                background: 'black',
                                                color: 'white',
                                                borderRadius: '50%',
                                                p: 0.25,
                                                marginTop: '-32px',
                                                marginRight: '35px',
                                                width: '28px',
                                                height: '28px',
                                                border: '1px outset gold',
                                            }}
                                            >
                                                <Typography textAlign="center" fontSize="190%" lineHeight="25px" ml="-1px">
                                                    {buffExample.stacks}
                                                </Typography>
                                            </Box>
                                        }
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        >
                                        <Avatar
                                            sx={{
                                            width: '75px',
                                            height: '75px',
                                            border: '1px outset gold',
                                            background: buffExample.colour ?? 'rgb(50,50,50)',
                                            }}
                                            src={buffExample.icon}
                                        />
                                        </Badge>
                                    </Box>
                                </Box>
                            </Box>
                            <Box flex={5} display='flex' flexDirection='column'>
                                {/* <Typography fontSize="200%" alignSelf="start" mb={0.5} color='#8b1a1a' fontWeight={600} sx={{textShadow: '0 1px 0 rgba(255,255,255,.4), 0 -1px 0 rgba(90, 0, 0, 0.35)' }}>
                                        Rewards:
                                </Typography> */}
                                {createTitle("Rewards")}
                                
                                <Box display="flex" gap="15px" alignItems='center' ml={3} flexWrap='wrap'>
                                    {/* <GameTooltip
                                            provider={() => (
                                                <ItemTooltip
                                                item={itemExample}
                                                equipped={undefined}
                                                entity={window.modAPI.utils.createPlayerCombatEntity(player, breakthrough)}
                                                craftingEntity={window.modAPI.utils.createPlayerCraftingEntity(player, breakthrough)}
                                                player={player}
                                                />
                                            )}
                                            >

                                        </GameTooltip> */}
                                        <Box height='75px' width='75px' border='1px solid gold'></Box>
                                        <Box height='75px' width='75px' border='1px solid gold'></Box>
                                        <Box height='75px' width='75px' border='1px solid gold'></Box>
                                        <Box height='75px' width='75px' border='1px solid gold'></Box>
                                        <Box height='75px' width='75px' border='1px solid gold'></Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='flex-end' flexGrow={1}>
                                {/* <GameButton 
                                    onClick={() => {
                                        playSfx('Confirm');
                                    }}
                                    disabled={false}
                                    keybinding='Enter'
                                    keyPriority={1}
                                    fancyBorder={true}
                                    
                                    sx={{minWidth: '30%', fontSize: '130%'}}
                                >
                                    Begin Trial
                                </GameButton> */}
                                <Box 
                                    display='flex' 
                                    alignItems='center' 
                                    justifyContent='center' 
                                    py={2.5} 
                                    px={3} 
                                    fontSize='200%'
                                    color='#691212'
                                    // color = '#ffd700'
                                    fontWeight={800}
                                    letterSpacing={1.5}
                                    borderRadius='12px'

                                    sx={{ 
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        outline: 'none',
                                        background: `url('${testButton}') center/ 100% 100% no-repeat`,
                                        textShadow: '0 1px 0 rgba(255,255,255,.4), 0 -1px 0 rgba(90, 0, 0, 0.35)',
                                        // textShadow: '0px 2px 4px rgba(0,0,0,0.9), 0px 0px 15px rgba(255, 215, 0, 0.5)',
                                        minWidth: '50%',
                                        
                                        // boxShadow: '0px 10px 20px rgba(0,0,0,0.8), 0px 0px 30px rgba(180, 20, 20, 0.6)',
                                        
                                        // filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5)) drop-shadow(0px 0px 15px rgba(180, 20, 20, 0.6))',
    
                                        // animation: 'breatheButton 2.5s infinite ease-in-out',
                                        // boxShadow: 'none',
                                        // '@keyframes breatheButton': {
                                        //     '0%, 100%': { 
                                        //         filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5)) drop-shadow(0px 0px 10px rgba(180, 20, 20, 0.3))',
                                        //         transform: 'scale(1)' 
                                        //     },
                                        //     '50%': { 
                                        //         filter: 'drop-shadow(0px 8px 12px rgba(0,0,0,0.7)) drop-shadow(0px 0px 25px rgba(220, 30, 30, 0.8))',
                                        //         transform: 'scale(1.03)' 
                                        //     }
                                        // }

                                        // position: 'relative',
                                        // overflow: 'hidden', // Чтобы блик не вылезал за края пергамента
                                        // '&::after': {
                                        //     content: '""',
                                        //     position: 'absolute',
                                        //     top: 0, 
                                        //     left: '-100%',
                                        //     width: '50%', 
                                        //     height: '100%',
                                        //     // Полупрозрачный белый/золотой градиент под углом
                                        //     background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent)',
                                        //     animation: 'shimmer 2s infinite linear',
                                        // },
                                        // '@keyframes shimmer': {
                                        //     '0%': { left: '-100%' },
                                        //     '40%': { left: '200%' }, // Блик пробегает быстро
                                        //     '100%': { left: '200%' } // И долго ждет до следующего раза
                                        // }
                                    }}
                                >
                                    BEGIN TRIAL
                                </Box>
                            </Box>
                    </Box>
                </Box>
            </GameDialog>

            <Box position="absolute" width="100%" height="100%" display="flex" flexDirection="column">
                <Box flexGrow={1}/>
                <Box display="flex">
                    <PlayerComponent/>
                </Box>
            </Box>
        </Box>
    );
}