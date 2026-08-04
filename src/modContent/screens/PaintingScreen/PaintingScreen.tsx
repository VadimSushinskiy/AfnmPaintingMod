import { Avatar, Badge, Box, Typography } from "@mui/material";
import { Buff, ModScreenFC } from "afnm-types";
import bg from "../../../assets/BG.jpg"
import painting from "../../../assets/Painting.png"
import smallScroll from "../../../assets/smallScroll3.png";
import bigScroll from "../../../assets/bigScroll.png";
import swordIcon from "../../../assets/autobattleIcon.png";
import potionIcon from "../../../assets/useItemIcon.png";
import scroll from "../../../assets/scroll.png";
import arrowIcon from "../../../assets/arrow.png";
import { elGR } from "@mui/material/locale";
import { useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Mousewheel, Navigation } from 'swiper/modules';

// Стили Swiper (важно для работы эффектов)
import 'swiper/css';
import 'swiper/css/effect-coverflow';

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
                                // width: '100%',
                                // aspectRatio: '1719 / 1861', 
                                // maxWidth: '20%',
                                // maxHeight: '80%',
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

                                // py: '5%'
                            },
                            '& .swiper-slide-active': {
                                filter: 'brightness(1)',
                                
                                '&:hover': {
                                    filter: 'brightness(1)',
                                },
                            }
                        }}
                    >
                        
                        <Swiper
                            // grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            initialSlide={selectedTrialIndex} 
                            mousewheel={true}
                            slideToClickedSlide={true}
                            
                            spaceBetween={0} 

                            effect='creative'
                            creativeEffect={{
                                limitProgress: 3,
                                prev: {
                                    translate: ['-65%', '-8%', 0], 
                                    scale: 0.95,
                                },
                                next: {
                                    translate: ['65%', '-8%', 0], 
                                    scale: 0.95,
                                }
                            }}      

                             navigation={{
                                prevEl: '.custom-prev-button',
                                nextEl: '.custom-next-button',
                            }}
                            
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
                                zIndex: 60,
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
                                zIndex: 60,
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
                                // const offset = index - selectedTrialIndex;
                                // const distance = Math.abs(offset);
                                // const isSelected = distance === 0;
                                
                                // const sign = Math.sign(offset);
                                // const isVisible = distance <= 3

                                // const scaleStep = 0.08; 
                                // const scale = isSelected ? 1 : 1 - (distance * scaleStep);

                                // // const translateY = isSelected ? 0 : distance * -22; 
                                // const touchTranslate = (scaleStep * 100) / 2
                                // const gapCompensation = distance * distance * touchTranslate

                                // const overlapPercent = 18; 
                                // const overlapCompensation = distance * overlapPercent;
                                // const translateX = isSelected ? 0 : sign * -(gapCompensation + overlapCompensation);
                                // const translateY = isSelected ? 0 : -distance * 8;

                                // const zIndex = 50 - distance;

                                return (
                                    <SwiperSlide 
                                        key={trialNum} 
                                        style={{ 
                                            // zIndex: zIndex,
                                            transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                            // transform: `translateX(${translateX}%) translateY(${translateY}%) scale(${scale})`,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                            
                                                width: '100%',
                                                aspectRatio: '1719 / 1861',
                                                backgroundImage: `url('${scroll}')`, 
                                                backgroundSize: '100% 100%',
                                                backgroundPosition: 'center',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'flex-end',

                                                // opacity: isVisible ? 1 : 0,
                                                // visibility: isVisible ? 'visible' : 'hidden', 
                                                // pointerEvents: isVisible ? 'auto' : 'none',
                                                
                                                // transition: 'opacity 0.4s ease, visibility 0.4s ease, filter 0.4s ease, transform 0.4s ease',
                                                
                                                // transform: ``,
                                                
                                                // filter: isSelected 
                                                //     ? 'brightness(1) drop-shadow(0px 10px 15px rgba(0,0,0,0.5))' 
                                                //     : 'brightness(0.6) drop-shadow(0px 5px 8px rgba(0,0,0,0.3))',
                                                    
                                                // '&:hover': {
                                                //     filter: `brightness(${isSelected ? 1 : 0.8}) drop-shadow(0px 12px 18px rgba(0,0,0,0.6))`,
                                                //     transform: `translateY(-5%)`
                                                // }
                                            }}
                                        >
                                            <Box
                                                width='20%'
                                                mb={1}
                                                sx={{
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
                                                    color: '#1b1814', 
                                                    textShadow: '0 1px 1px rgba(255,255,255,0.4)', 
                                                    fontSize: 'clamp(12px, 1.2vw, 22px)' 
                                                }}
                                            >
                                                Trial {trialNum}
                                            </Typography>
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

            {/* <Box 
                position="absolute" 
                bottom="2%" 
                left="0" 
                width="100%" 
                height="25%" 
                display="flex"
                justifyContent="center"
                alignItems="flex-end"
                zIndex={20}
                sx={{
                    // Небольшой padding снизу, чтобы сдвинутые вниз свитки не обрезались
                    pb: '20px' 
                }}
            >
                {trialsList.map((trialNum, index) => {
                    // 1. Вычисляем позицию относительно выбранного элемента
                    const offset = index - selectedTrialIndex;
                    const distance = Math.abs(offset);
                    const isSelected = offset === 0;

                    // 2. Математика "Дуги" (Arc)
                    // Чем дальше от центра, тем ниже опускается свиток (по 20px за каждый шаг)
                    const translateY = isSelected ? 0 : distance * 20; 
                    
                    // Центральный 100% (1), соседние 85% (0.85), следующие 75% (0.75) и т.д.
                    const scale = isSelected ? 1 : Math.max(0.6, 0.95 - (distance * 0.1));
                    
                    // Правильное наслаивание: центр всегда сверху
                    const zIndex = 50 - distance;
                    
                    // Затенение для эффекта фокуса
                    const brightness = isSelected ? 1 : 0.55;

                    return (
                        <Box
                            key={trialNum}
                            onClick={() => setSelectedTrialIndex(index)}
                            sx={{
                                position: 'relative',
                                width: '12%', // Базовая ширина карточки
                                aspectRatio: '1719 / 1861',
                                backgroundImage: `url('${scroll}')`,
                                backgroundSize: '100% 100%',
                                backgroundPosition: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                pb: '3%',
                                cursor: 'pointer',
                                
                                // Сдвигаем все элементы влево, чтобы они наслаивались друг на друга
                                // (кроме самого первого элемента в списке)
                                ml: index === 0 ? 0 : '-4%', 
                                
                                // Плавная анимация всех изменений
                                transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                
                                // Применяем плоские 2D трансформации
                                transform: `translateY(${translateY}px) scale(${scale})`,
                                zIndex: zIndex,
                                filter: `brightness(${brightness}) drop-shadow(0px 10px 15px rgba(0,0,0,0.5))`,

                                // Интерактивность при наведении (удобно для мыши и VR-указки)
                                '&:hover': {
                                    filter: `brightness(${isSelected ? 1 : 0.8}) drop-shadow(0px 15px 20px rgba(0,0,0,0.7))`,
                                    // Слегка приподнимаем элемент при наведении
                                    transform: `translateY(${translateY - 15}px) scale(${scale * 1.05})`,
                                    zIndex: 60, // Выносим вперед при наведении
                                }
                            }}
                        >
                            {isSelected && (
                                <Box
                                    width='30px'
                                    height='30px'
                                    mb={0.5}
                                    sx={{
                                        background: `linear-gradient(135deg, #9e3333 0%, #701a1a 100%)`,
                                        mask: `url('${swordIcon}') center/contain no-repeat`,
                                        WebkitMask: `url('${swordIcon}') center/contain no-repeat`,
                                        mixBlendMode: 'multiply',
                                        // Легкая пульсация для привлечения внимания
                                        animation: 'pulse 2s infinite',
                                        '@keyframes pulse': {
                                            '0%': { opacity: 0.8 },
                                            '50%': { opacity: 1 },
                                            '100%': { opacity: 0.8 },
                                        }
                                    }}
                                />
                            )}
                            <Typography 
                                fontWeight={600} 
                                fontStyle="italic"
                                sx={{ 
                                    color: '#1b1814', 
                                    textShadow: '0 1px 1px rgba(255,255,255,0.4)', 
                                    fontSize: 'clamp(12px, 1.2vw, 22px)' 
                                }}
                            >
                                Trial {trialNum}
                            </Typography>
                        </Box>
                    );
                })}
            </Box> */}
            
            {/* <Box 
                position="absolute" 
                bottom="2%" 
                left="50%" 
                sx={{
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    width: '70%', 
                    // Глобальные стили для перезаписи поведения Swiper под наш дизайн
                    '& .swiper': { 
                        width: '100%', 
                        height: '100%', 
                        paddingTop: '30px', // Отступ сверху для анимации увеличения,
                        overflow: 'visible'
                    },
                    '& .swiper-slide': { 
                        width: '16%', // Размер одной карточки
                        display: 'flex', 
                        justifyContent: 'center' 
                    }
                }}
            >
                <Swiper
                    // effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    initialSlide={3} // Начинаем с Trial 7
                    mousewheel={true} // Поддержка колесика мыши
                    slideToClickedSlide={true} // Автоматически прокручивает к свитку при клике на него
                    onSlideChange={(swiper) => setSelectedTrialIndex(swiper.activeIndex)}

                    spaceBetween={-20}

                    // coverflowEffect={{
                    //     rotate: 0,       // Угол поворота боковых элементов
                    //     stretch: -20,       // Расстояние между слайдами
                    //     depth: 80,       // Глубина перспективы (отдаление)
                    //     modifier: 1,      // Множитель эффекта
                    //     slideShadows: false, // Отключаем дефолтные тени
                    //     scale: 0.9
                    // }}
                    modules={[Mousewheel]}
                >
                    {trialsList.map((trialNum, index) => {
                        const offset = index - selectedTrialIndex;
                        const isSelected = offset === 0;
                        const isLeft = offset < 0;
                        const isRight = offset > 0;
                        
                        // Вычисляем расстояние от центра (0, 1, 2, 3...)
                        const distance = Math.abs(offset);

                        // Жестко фиксируем угол: никаких умножений на расстояние!
                        let rotateY = 0;
                        if (isLeft) rotateY = -30;  // Все левые повернуты ровно на 20
                        if (isRight) rotateY = 30; // Все правые повернуты ровно на -20

                        // Жестко фиксируем размер: 100% для центра, 85% для всех остальных
                        const scale = isSelected ? 1 : 0.85;

                        return (
                            <SwiperSlide key={trialNum} style={{ 
                                    zIndex: 50 - distance,
                                    transition: 'z-index 0.3s ease'
                                }}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        aspectRatio: '1719 / 1861',
                                        backgroundImage: `url('${scroll}')`,
                                        backgroundSize: '100% 100%',
                                        backgroundPosition: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        pb: '10%',
                                        // Затемняем невыбранные свитки для акцента на центральном
                                        transition: 'all 0.4s ease',
                                        transform: `perspective(1500px) rotateY(${rotateY}deg) scale(${scale})`,
                                        filter: isSelected 
                                            ? 'brightness(1) drop-shadow(0px 10px 15px rgba(0,0,0,0.5))' 
                                            : 'brightness(0.6) drop-shadow(0px 5px 10px rgba(0,0,0,0.2))',
                                            
                                        '&:hover': {
                                            filter: `brightness(${isSelected ? 1 : 0.8}) drop-shadow(0px 15px 20px rgba(0,0,0,0.6))`,
                                            // При наведении немного приподнимаем и разворачиваем лицом к игроку
                                            transform: `perspective(1500px) rotateY(${rotateY * 0.5}deg) scale(${scale * 1.05}) translateY(-10px)`,
                                        }
                                    }}
                                >
                                    {isSelected && (
                                        <Box
                                            width='30px'
                                            height='30px'
                                            mb={0.5}
                                            sx={{
                                                background: `linear-gradient(135deg, #9e3333 0%, #701a1a 100%)`,
                                                mask: `url('${swordIcon}') center/contain no-repeat`,
                                                WebkitMask: `url('${swordIcon}') center/contain no-repeat`,
                                                mixBlendMode: 'multiply',
                                            }}
                                        />
                                    )}
                                    <Typography 
                                        fontWeight={600} 
                                        fontStyle="italic"
                                        sx={{ 
                                            color: '#1b1814', 
                                            textShadow: '0 1px 1px rgba(255,255,255,0.4)', 
                                            fontSize: 'clamp(12px, 1.2vw, 22px)' 
                                        }}
                                    >
                                        Trial {trialNum}
                                    </Typography>
                                </Box>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </Box>          */}

            <Box position="absolute" width="100%" height="100%" display="flex" flexDirection="column">
                <Box flexGrow={1}/>
                <Box display="flex">
                    <PlayerComponent/>
                </Box>
            </Box>
        </Box>
    )
}