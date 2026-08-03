import { Avatar, Badge, Box, Typography } from "@mui/material";
import { Buff, ModScreenFC } from "afnm-types";
import bg from "../../../assets/BG.jpg"
import painting from "../../../assets/Painting.png"
import smallScroll from "../../../assets/smallScroll3.png";
import bigScroll from "../../../assets/bigScroll.png";
import swordIcon from "../../../assets/autobattleIcon.png";
import { elGR } from "@mui/material/locale";

export const PaintingScreen: ModScreenFC = ({ screenAPI }) => {
    const { useSelector, usePlaySfx, useKeybinding, actions, components } = screenAPI;
    const { GameDialog, BackgroundImage, PlayerComponent, GameTooltip, tooltips, ItemComponent } = components;

    const player = useSelector((state) => state.player.player);
    const breakthrough = useSelector((state) => state.breakthrough);

     useKeybinding(
        1, // priority (higher = more important)
        {
            Escape: () => actions.setScreen('location')
        },
    );

    const buffs = Array.from({ length: 5 }, () => window.modAPI.gameData.mysticalRegionBlessings[0].buff);
    const items = Array.from({ length: 5 }, () => window.modAPI.gameData.items["Eon Glass"]);

    return (
        <Box position="relative" flexGrow={1} display="flex" flexDirection="column">
            <BackgroundImage image={bg} screenEffect="dust" />
            <Box
                width='100%'
                display='flex'
                flexDirection='row'
                alignItems='flex-start'
                height='100%'
            >
                <Box
                    width='60%'
                    position='relative'
                    ml = '10%'
                    sx={{
                        aspectRatio: '1604 / 1052',
                        backgroundImage: `url('${painting}')`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                    }}
                >
                    <Box 
                        position="absolute"
                        left='25%'
                        top='34%'
                        zIndex={3}
                        width='10%'
                        component="img" 
                        src={window.modAPI.gameData.monsters.find(m => m.name === 'Lingyu Lurker')?.image}
                        sx={{
                            transform: 'translate(-50%, -100%)',
                            filter: 'sepia(40%) saturate(60%) contrast(85%) brightness(95%)',
                        }}
                    />
                    <Box 
                        position="absolute"
                        left='73%'
                        top='40%'
                        zIndex={3}
                        width='11%'
                        component="img" 
                        src={window.modAPI.gameData.monsters.find(m => m.name === 'Jurenzai Swarmhost')?.image} 
                        sx={{
                            transform: 'translate(-50%, -100%)',
                            filter: 'sepia(40%) saturate(60%) contrast(85%) brightness(95%)',
                        }}
                    />
                    <Box 
                        position="absolute"
                        left='86%'
                        top='54%'
                        zIndex={3}
                        width='11%'
                        component="img" 
                        src={window.modAPI.gameData.monsters.find(m => m.name === 'Gorashi')?.image} 
                        sx={{
                            transform: 'translate(-50%, -100%)',
                            filter: 'sepia(40%) saturate(60%) contrast(85%) brightness(95%)',
                        }}
                    />
                    <Box 
                        position="absolute"
                        left='74%'
                        top='71%'
                        zIndex={3}
                        width='10%'
                        component="img" 
                        src={window.modAPI.gameData.monsters.find(m => m.name === 'Ratascar')?.image} 
                        sx={{
                            transform: 'translate(-50%, -100%)',
                            filter: 'sepia(40%) saturate(60%) contrast(85%) brightness(95%)',
                        }}
                    />
                    <Box 
                        position="absolute"
                        left='39%'
                        top='56%'
                        zIndex={3}
                        width='11%'
                        component="img" 
                        src={window.modAPI.gameData.monsters.find(m => m.name === 'Feathzui')?.image} 
                        sx={{
                            transform: 'translate(-50%, -100%)',
                            filter: 'sepia(40%) saturate(60%) contrast(85%) brightness(95%)',
                        }}
                    />

                    <Typography
                        onClick={() => {
                            
                            
                        }}
                        sx={{
                            position: 'absolute',
                            top: '96%', // Поднимаем чуть выше самого нижнего края свитка
                            left: '57%',
                            transform: 'translate(-50%, -100%)',
                            zIndex: 10,
                            
                            // Стилизация текста
                            color: '#102b4e', // Глубокий синий цвет, как темная вода
                            fontSize: 'clamp(20px, 2.5vw, 45px)',
                            fontWeight: 700,
                            fontStyle: 'italic',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            
                            // Эффект свечения: белая база + голубоватое рассеивание
                            textShadow: `
                                0 0 10px rgba(255, 255, 255, 0.9), 
                                0 0 20px rgba(255, 255, 255, 0.7),
                                0 0 30px rgba(173, 216, 230, 0.6)
                            `,
                            
                            cursor: 'pointer',
                            transition: 'all 0.3s ease-in-out',
                            
                            // Интерактивность при наведении
                            '&:hover': {
                                transform: 'translate(-50%, -100%) scale(1.05)', // Легкое увеличение
                                color: '#0a1d36', // Текст становится чуть контрастнее
                                textShadow: `
                                    0 0 15px rgba(255, 255, 255, 1), 
                                    0 0 30px rgba(255, 255, 255, 0.9),
                                    0 0 45px rgba(173, 216, 230, 0.8)
                                `,
                            }
                        }}
                    >
                        Enter Painting
                    </Typography>
                </Box>
                <Box
                    ml='4%'
                    mt='3%'
                    width='22%'
                    display='flex'
                    flexDirection='column'
                    gap='16px'
                    height='100%'
                >
                    <Box
                        px='7%'
                        py='6%'
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        width='100%'

                        sx={{
                            aspectRatio: '2400 / 954',
                            backgroundImage: `url('${smallScroll}')`,
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                            overflow: 'hidden'
                        }}
                    >
                        <Box
                            width='50px'
                            height='50px'
                            mb={0.5}

                            sx={{
                                background: `linear-gradient(135deg, #9e3333 0%, #701a1a 100%)`,
                                mask: `url('${swordIcon}') center/contain no-repeat`,
                                WebkitMask: `url('${swordIcon}') center/contain no-repeat`,
                                opacity: 0.9,
                                mixBlendMode: 'multiply',
                                filter: 'drop-shadow(0px 1px 0px rgba(255, 255, 255, 0.3)) drop-shadow(0px -1px 1px rgba(0,0,0,0.4))',
                                flexShrink: 1,
                            }}
                        >
                        </Box>

                        <Typography 
                            fontStyle='italic'
                            fontWeight={600}
                            sx={{
                                letterSpacing: '0.5px',
                                color: '#1b1814',
                                textShadow: `0 1px 2px rgba(255,255,255,0.2)`,
                                width: '100%',
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                fontSize: 'clamp(10px, 1.5vw, 30px)',
                                mixBlendMode: 'multiply',
                                opacity: 0.8
                            }}>
                            Trial 7 ● Flesh Withering
                        </Typography>
                    </Box>

                    <Box
                        px='12%'
                        pt='6%'
                        pb='7%'
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        width='100%'

                        sx={{
                            aspectRatio: '2346 / 1470',
                            backgroundImage: `url('${bigScroll}')`,
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                            overflow: 'hidden'
                        }}
                    >
                        <Typography 
                            fontStyle='italic'
                            fontWeight={600}
                            sx={{
                                letterSpacing: '0.5px',
                                color: '#1b1814',
                                textShadow: `0 1px 2px rgba(255,255,255,0.2)`,
                                width: '100%',
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                fontSize: 'clamp(10px, 1.5vw, 30px)',
                                mixBlendMode: 'multiply',
                                opacity: 0.8
                            }}>
                            Effects
                        </Typography>

                        <Box pl='10%' display="flex" gap="15px" alignItems="flex-start" justifyContent='flex-start' flexWrap='wrap' flexGrow={1} width='100%' sx={{minHeight: 0}}>
                            {buffs.map(el => (
                                <Box key={el.name} sx={{ height: '45%', aspectRatio: '1', flexShrink: 0 }}>
                                    {/* <GameTooltip 
                                        provider={() => (
                                            <tooltips.BuffTooltip
                                                buff={{ ...el, buffType: 'House' } as Buff}
                                                entity={window.modAPI.utils.createPlayerCombatEntity(player, breakthrough)}
                                            />
                                        )}
                                    >
                                        <Badge
                                            badgeContent={el.stacks}
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                
                                                '& .MuiBadge-badge': {
                                                    backgroundColor: 'black',
                                                    color: 'white',
                                                    width: '35%',
                                                    height: '35%',
                                                    borderRadius: '50%',
                                                    border: '1px outset gold',
                                                    fontSize: 'clamp(10px, 1.2vw, 24px)', 
                                                    minWidth: 0,
                                                    padding: 0,
                                                    
                                                    right: '20%',
                                                    bottom: '21%',
                                                    pr: '1px',
                                                    pt: '5px'
                                                }
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                width: '100%',
                                                height: '100%',
                                                border: '1px outset gold',
                                                background: el.colour ?? 'rgb(50,50,50)',
                                                }}
                                                src={el.icon}
                                            />
                                        </Badge>
                                    </GameTooltip> */}
                                    <Badge
                                    badgeContent={el.stacks}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        
                                        '& .MuiBadge-badge': {
                                            backgroundColor: 'black',
                                            color: 'white',
                                            width: '35%',
                                            height: '35%',
                                            borderRadius: '50%',
                                            border: '1px outset gold',
                                            fontSize: 'clamp(10px, 1.2vw, 24px)', 
                                            minWidth: 0,
                                            padding: 0,
                                            
                                            right: '20%',
                                            bottom: '21%',
                                            pr: '1px',
                                            pt: '5px'
                                        }
                                    }}
                                    >
                                        <Avatar
                                            sx={{
                                            width: '100%',
                                            height: '100%',
                                            border: '1px outset gold',
                                            background: el.colour ?? 'rgb(50,50,50)',
                                            }}
                                            src={el.icon}
                                        />
                                    </Badge>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box
                        px='12%'
                        pt='6%'
                        pb='7%'
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        width='100%'

                        sx={{
                            aspectRatio: '2346 / 1470',
                            backgroundImage: `url('${bigScroll}')`,
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                            overflow: 'hidden'
                        }}
                    >
                        <Typography 
                            fontStyle='italic'
                            fontWeight={600}
                            sx={{
                                letterSpacing: '0.5px',
                                color: '#1b1814',
                                textShadow: `0 1px 2px rgba(255,255,255,0.2)`,
                                width: '100%',
                                textAlign: 'center',
                                whiteSpace: 'nowrap',
                                fontSize: 'clamp(10px, 1.5vw, 30px)',
                                mixBlendMode: 'multiply',
                                opacity: 0.8
                            }}>
                            Rewards
                        </Typography>

                        <Box pl='10%' display="flex" gap="15px" alignItems="flex-start" justifyContent='flex-start' flexWrap='wrap' flexGrow={1} width='100%' sx={{minHeight: 0}}>
                            {items.map(item => (
                                // <Box sx={{ height: '45%', aspectRatio: '1', flexShrink: 0 }}>
                                //     <GameTooltip
                                //         key={item.name}
                                //         provider={() => (
                                //             <tooltips.ItemTooltip
                                //                 item={item}
                                //                 equipped={undefined}
                                //                 entity={window.modAPI.utils.createPlayerCombatEntity(player, breakthrough)}
                                //                 craftingEntity={window.modAPI.utils.createPlayerCraftingEntity(player, breakthrough)}
                                //                 player={player}
                                //             />
                                //         )}
                                //         >
                                //         <Box>
                                //             <ItemComponent item={item} equipped={false} removeOverlays />
                                //         </Box>
                                //     </GameTooltip>
                                // </Box>
                                <Box height='75px' width='75px' border='1px solid black'></Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
            
            <Box position="absolute" width="100%" height="100%" display="flex" flexDirection="column">
                <Box flexGrow={1}/>
                <Box display="flex">
                    <PlayerComponent/>
                </Box>
            </Box>
        </Box>
    )
}