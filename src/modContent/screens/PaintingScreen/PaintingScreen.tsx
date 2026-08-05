import { Avatar, Badge, Box, Typography } from "@mui/material";
import { Buff, ModScreenFC } from "afnm-types";
import bg from "../../../assets/BG.jpg"
import painting from "../../../assets/Painting.png"
import smallScroll from "../../../assets/smallScroll3.png";
import bigScroll from "../../../assets/bigScroll.png";
import swordIcon from "../../../assets/autobattleIcon.png";
import potionIcon from "../../../assets/useItemIcon.png";
import scroll from "../../../assets/scroll.png";
import scrollSide from "../../../assets/sideScroll4.png";
import arrowIcon from "../../../assets/arrow.png";
import { elGR } from "@mui/material/locale";
import { useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import { EffectCreative, Mousewheel, Navigation } from 'swiper/modules';

// Стили Swiper (важно для работы эффектов)
import 'swiper/css';
import 'swiper/css/effect-coverflow';

// Art for the centred slide. Must be 1719x1861 like scroll.png -- the slide box is
// locked to that aspect and backgroundSize '100% 100%' stretches anything else.
const scrollActive = scroll;

// Slides within this many steps of the centre are held at full opacity (so 7 are
// visible), and only fade across the final step as they arrive from offscreen.
const FULLY_VISIBLE_EACH_SIDE = 2;
const EDGE_FADE_AT = FULLY_VISIBLE_EACH_SIDE + 1;

// EffectCreative overwrites each slide's own opacity every frame, so the fade is
// published as a custom property and consumed by a child element instead.
const applyEdgeFade = (swiper: SwiperClass) => {
    swiper.slides.forEach((slideEl) => {
        const progressRaw = (slideEl as HTMLElement & { progress?: number }).progress ?? 0;
        const distance = Math.abs(progressRaw);

        const fade = 1 - Math.min(Math.max(distance - FULLY_VISIBLE_EACH_SIDE, 0), 1);
        slideEl.style.setProperty('--trial-fade', String(fade));

        const scaleX = progressRaw > 0 ? -1 : 1;
        slideEl.style.setProperty('--trial-scale-x', String(scaleX));

        const clampedProgress = Math.min(Math.max(progressRaw, -1), 1);
        
        // В центре (0) все углы будут = 0.
        // Справа (1): X=12, Y=-15, Z=-6 (как на твоем скрине)
        // Слева (-1): X=12, Y=15, Z=6 (симметричный поворот влево)
        const rotX = 12 * Math.abs(clampedProgress);
        const rotY = 10 * clampedProgress;
        const rotZ = 3 * clampedProgress;
        
        slideEl.style.setProperty('--c-rot-x', `${rotX}deg`);
        slideEl.style.setProperty('--c-rot-y', `${rotY}deg`);
        slideEl.style.setProperty('--c-rot-z', `${rotZ}deg`);
    });
};

// Swiper animates its transforms with a transition rather than per-frame updates,
// so mirror the duration it picks (0 while dragging) to keep the fade in step.
const syncEdgeFadeDuration = (swiper: SwiperClass, duration: number) => {
    swiper.slides.forEach((slideEl) => {
        slideEl.style.setProperty('--trial-fade-duration', `${duration}ms`);
    });
};

export const PaintingScreen: ModScreenFC = ({ screenAPI }) => {
    const { useSelector, usePlaySfx, useKeybinding, actions, components } = screenAPI;
    const { GameDialog, BackgroundImage, PlayerComponent, GameTooltip, tooltips, ItemComponent } = components;

    const player = useSelector((state) => state.player.player);
    const breakthrough = useSelector((state) => state.breakthrough);

    const [selectedTrialIndex, setSelectedTrialIndex] = useState(6);
    const trialsList = Array.from({length: 20}, (_, i) => i + 1)

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
                

                <Box width='60%' height='100%' ml='10%' display='flex' flexDirection='column'>
                    <Box
                    width='100%'
                    position='relative'
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
                            top: '96%',
                            left: '57%',
                            transform: 'translate(-50%, -100%)',
                            zIndex: 10,
                            
                            color: '#102b4e', 
                            fontSize: 'clamp(20px, 2.5vw, 45px)',
                            fontWeight: 700,
                            fontStyle: 'italic',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            
                            textShadow: `
                                0 0 10px rgba(255, 255, 255, 0.9), 
                                0 0 20px rgba(255, 255, 255, 0.7),
                                0 0 30px rgba(173, 216, 230, 0.6)
                            `,
                            
                            cursor: 'pointer',
                            transition: 'all 0.3s ease-in-out',
                            
                            '&:hover': {
                                transform: 'translate(-50%, -100%) scale(1.05)', 
                                color: '#0a1d36',
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
                        sx={{
                            flexGrow: 1,
                            zIndex: 20,
                            width: '89%', 
                            ml: '11%',
                            position: 'relative',
                            '& .swiper': { 
                                width: '100%', 
                                height: '100%', 
                                pb: '5%',
                                pt: '2%',
                                overflow: 'visible',
                                containerType: 'size'
                            },
                            '& .swiper-slide': { 
                                width: 'min(22cqw, calc(100cqh * (1719 / 1861)))',
                                aspectRatio: '1719 / 1861',
                            
                                display: 'flex', 
                                justifyContent: 'center',
                                transition: 'filter 0.4s ease, transform 0.2s ease',
                                filter: 'brightness(0.6)',
                                '&:hover': {
                                    filter: 'brightness(0.8)',
                                    transform: 'translateY(-5%)',
                                },

                            },
                            '& .swiper-slide-active': {
                                filter: 'brightness(1)',

                                '&:hover': {
                                    filter: 'brightness(1)',
                                },

                                '& .trial-scroll-active': {
                                    opacity: 1,
                                },

                                '& .trial-scroll-side': {
                                    opacity: 0,
                                },
                            }
                        }}
                    >
                        
                        <Swiper
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            initialSlide={selectedTrialIndex} 
                            mousewheel={true}
                            slideToClickedSlide={true}
                            
                            spaceBetween={0} 

                            effect='creative'
                            creativeEffect={{
                                limitProgress: EDGE_FADE_AT,
                                prev: {
                                    translate: ['-95%', '-10%', 0],
                                    scale: 0.9,
                                },
                                next: {
                                    translate: ['95%', '-10%', 0],
                                    scale: 0.9,
                                }
                            }}

                             navigation={{
                                prevEl: '.custom-prev-button',
                                nextEl: '.custom-next-button',
                            }}

                            onSetTranslate={applyEdgeFade}
                            onSetTransition={syncEdgeFadeDuration}
                            onAfterInit={applyEdgeFade}
                            onSlideChangeTransitionEnd={(swiper) => setSelectedTrialIndex(swiper.activeIndex)}
                            modules={[Mousewheel, EffectCreative, Navigation]}
                        >
                            <Box
                            className="custom-prev-button"
                            sx={{
                                position: 'absolute',
                                top: '25%',
                                left: '-4.5%',
                                transform: 'translateY(-50%) scaleX(-1)',
                                zIndex: 40,
                                cursor: 'pointer',
                                aspectRatio: '1 / 2',
                                height: '20%',

                                backgroundImage: `url('${arrowIcon}')`,
                                backgroundSize: '100% 100%',

                                transition: 'all 0.2s ease',

                                '&:hover': {
                                    transform: 'translateY(-50%) scaleX(-1) scale(1.1)',
                                },
                                '&.swiper-button-disabled': {
                                    opacity: 0.3,
                                    cursor: 'not-allowed',
                                    pointerEvents: 'none'
                                }
                            }}
                        >
                            
                        </Box>
                        <Box
                            className="custom-next-button"
                            sx={{
                                position: 'absolute',
                                top: '25%',
                                right: '-5%',
                                transform: 'translateY(-50%)',
                                zIndex: 40,
                                cursor: 'pointer',
                                aspectRatio: '1 / 2',
                                height: '20%',

                                backgroundImage: `url('${arrowIcon}')`,
                                backgroundSize: '100% 100%',
                                
                                transition: 'all 0.2s ease',
                                
                                '&:hover': {
                                    transform: 'translateY(-50%) scale(1.1)',
                                },
                                '&.swiper-button-disabled': {
                                    opacity: 0.3,
                                    cursor: 'not-allowed',
                                    pointerEvents: 'none'
                                }
                            }}
                        >
                            
                        </Box>

                            {trialsList.map((trialNum, index) => {

                                return (
                                    <SwiperSlide 
                                        key={trialNum} 
                                        style={{ 
                                            transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                            
                                                width: '100%',
                                                aspectRatio: '1719 / 1861',
                                                
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'flex-end',

                                                opacity: 'var(--trial-fade, 1)',
                                                transition: 'opacity var(--trial-fade-duration, 0ms) ease',

                                                position: "relative"
                                            }}
                                        >
                                            {/* Base art, shown when the slide sits off to the side */}
                                            <Box
                                                className="trial-scroll-side"
                                                sx={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    backgroundImage: `url('${scrollSide}')`,
                                                    backgroundSize: '100% 100%',
                                                    backgroundPosition: 'center',
                                                    transform: 'scaleX(var(--trial-scale-x, 1))',
                                                    // transition: 'opacity 0.4s ease'
                                                }}
                                            />
                                            {/* Active art, faded in while the slide is centred */}
                                            <Box
                                                className="trial-scroll-active"
                                                sx={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    backgroundImage: `url('${scrollActive}')`,
                                                    backgroundSize: '100% 100%',
                                                    backgroundPosition: 'center',
                                                    opacity: 0,
                                                }}
                                            />

                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        width: '100%',
                                                        mb: '1%',
                                                        transformOrigin: 'bottom center',
                                                        zIndex: 2,
                                                        
                                                        // Применяем 3D трансформацию, которая слушает JS-переменные
                                                        transform: 'perspective(1200px) rotateX(var(--c-rot-x, 0deg)) rotateY(var(--c-rot-y, 0deg)) rotateZ(var(--c-rot-z, 0deg))',
                                                        transition: 'transform var(--trial-fade-duration, 0ms) ease',
                                                    }}
                                                >
                                                    <Box
                                                        width='20%'
                                                        sx={{
                                                            position: 'relative',
                                                            aspectRatio: 1,
                                                            background: index % 2 === 0 ? `linear-gradient(135deg, #9e3333 0%, #701a1a 100%)` : `linear-gradient(135deg, #368a59 0%, #17452b 100%)`,
                                                            mask: index % 2 === 0 ? `url('${swordIcon}') center/contain no-repeat` : `url('${potionIcon}') center/contain no-repeat`,
                                                            WebkitMask: index % 2 === 0 ? `url('${swordIcon}') center/contain no-repeat` : `url('${potionIcon}') center/contain no-repeat`,
                                                            mixBlendMode: 'multiply',
                                                        }}
                                                    />
                                                    <Typography 
                                                        fontWeight={600} 
                                                        fontStyle="italic"
                                                        sx={{
                                                            position: 'relative',
                                                            color: '#1b1814',
                                                            textShadow: '0 1px 1px rgba(255,255,255,0.4)',
                                                            fontSize: 'clamp(12px, 1.2vw, 22px)'
                                                        }}
                                                    >
                                                        Trial {trialNum}
                                                    </Typography>
                                                </Box>

                                            
                                        </Box>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </Box>
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
                        zIndex={50}

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
                        zIndex={50}

                        sx={{
                            aspectRatio: '2346 / 1470',
                            backgroundImage: `url('${bigScroll}')`,
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                            overflow: 'hidden',
                            pointerEvents: "all"
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
                                    <GameTooltip 
                                        provider={() => (
                                            <tooltips.BuffTooltip
                                                buff={{ ...el }}
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
                                    </GameTooltip>
                                    
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
                        zIndex={50} 
                        
                        sx={{
                            aspectRatio: '2346 / 1470',
                            backgroundImage: `url('${bigScroll}')`,
                            backgroundSize: '100% 100%',
                            backgroundPosition: 'center',
                            overflow: 'hidden',
                            pointerEvents: "all"
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
                                <Box sx={{ height: '45%', aspectRatio: '1', flexShrink: 0 }}>
                                    <GameTooltip
                                        key={item.name}
                                        provider={() => (
                                            <tooltips.ItemTooltip
                                                item={item}
                                                equipped={undefined}
                                                entity={window.modAPI.utils.createPlayerCombatEntity(player, breakthrough)}
                                                craftingEntity={window.modAPI.utils.createPlayerCraftingEntity(player, breakthrough)}
                                                player={player}
                                            />
                                        )}
                                        >
                                        <Box width="100%" height="100%">
                                            <ItemComponent item={item} equipped={false} size="100%" />
                                        </Box>
                                    </GameTooltip>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box position="absolute" width="100%" height="100%" display="flex" flexDirection="column" sx={{ pointerEvents: "none", zIndex: 100 }}>
                <Box flexGrow={1}/>
                <Box display="flex">
                    <PlayerComponent/>
                </Box>
            </Box>
        </Box>
    )
}