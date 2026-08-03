import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import testImg from "../../../assets/autobattleIcon.png";
import testImg2 from "../../../assets/useItemIcon.png";
import seal from "../../../assets/seal.png";
import jadeTexture from "../../../assets/newButton.png";

interface FloorItemProps {
    index: number;
    isLocked: boolean;
    isSelected: boolean;
    onClick: () => void;
}

export const FloorItem = ({ index, isLocked, isSelected, onClick}: FloorItemProps) => {
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isSelected && itemRef.current) {
            const element = itemRef.current;
            const container = document.getElementById('tower-scroll-container');

            if (container && element) {
                const containerHeight = container.clientHeight;
                const elementTop = element.offsetTop;
                const elementHeight = element.clientHeight;

                const targetScroll = elementTop - (containerHeight / 2) + (elementHeight / 2);

                container.scrollTo({
                    top: targetScroll,
                    behavior: 'smooth'
                });
            }
        }

        
    }, []);

    const chainSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 20' fill='%230a0a0a'%3E%3Cpath d='M10,2 A8,8 0 0,0 10,18 L30,18 A8,8 0 0,0 30,2 Z M10,6 L30,6 A4,4 0 0,1 30,14 L10,14 A4,4 0 0,1 10,6 Z'/%3E%3Cpath d='M-1,7.5 L7,7.5 A2.5,2.5 0 0,1 7,12.5 L-1,12.5 Z'/%3E%3Cpath d='M41,7.5 L33,7.5 A2.5,2.5 0 0,0 33,12.5 L41,12.5 Z'/%3E%3C/svg%3E";
    const chainStyles = {
        WebkitMaskImage: 'radial-gradient(ellipse farthest-corner at center, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
        maskImage: 'radial-gradient(ellipse farthest-corner at center, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',

        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 'calc(hypot(100cqw, 100cqh))',
            height: '15px',
            backgroundImage: `url("${chainSvg}")`,
            backgroundSize: '30px 15px',
            backgroundRepeat: 'repeat-x',
            // filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.8))',
            filter: 'drop-shadow(-1px -1px 0px rgba(255,255,255,0.15)) drop-shadow(2px 3px 2px rgba(0,0,0,0.85))',
            // filter: 'drop-shadow(0px 3px 2px rgba(0,0,0,0.85)) drop-shadow(0px 1px 5px rgba(0,0,0,0.5))',
            opacity: 0.9,
            // mixBlendMode: 'multiply',
            pointerEvents: 'none',
            zIndex: 2,
        },
        '&::before': {
            transform: 'translate(-50%, -50%) rotate(calc(atan2(100cqh, 100cqw)))',
        },
        '&::after': {
            transform: 'translate(-50%, -50%) rotate(calc(-1 * atan2(100cqh, 100cqw)))',
        },
    };

    const getIcon = () => {
        if (index % 2 === 1) {
            return `url('${testImg}') center/contain no-repeat`;
        }

        return `url('${testImg2}') center/contain no-repeat`;
    }

    // const getIconColor = () => {
    //     if (isSelected) {
    //         if (index % 2 === 1) return `linear-gradient(135deg, #cc2c2c 0%, #801616 100%)`;
    //         return `linear-gradient(135deg, #42a86d 0%, #21633d 100%)`;
    //     }

    //     if (index % 2 === 1) {
    //         return `linear-gradient(135deg, #a32424 0%, #5a1010 100%)`;
    //     }

    //     return `linear-gradient(135deg, #368a59 0%, #17452b 100%)`;
    // }

    const getIconColor = () => {
        // Выбранное состояние: краска чуть свежее и насыщеннее
        if (isSelected) {
            if (index % 2 === 1) return `linear-gradient(135deg, #9e3333 0%, #701a1a 100%)`; // Приглушенный кармин
            return `linear-gradient(135deg, #3d8259 0%, #225435 100%)`; // Приглушенный нефрит
        }

        // Обычное состояние: засохшая, выцветшая краска
        if (index % 2 === 1) {
            return `linear-gradient(135deg, #782626 0%, #471212 100%)`;
        }
        return `linear-gradient(135deg, #2c5e40 0%, #163622 100%)`;
    }

    return (
        <Box 
            ref={itemRef}
            onClick = {isLocked ? undefined : onClick}
            position='relative'
            borderRadius='16px'
            sx={
                {
                    containerType: 'size',
                    height: '100px',
                    width: '80%',

                    transform: isSelected ? 'scale(1.06)' : 'scale(1)',
                    backgroundImage: `url(${jadeTexture})`,
                    backgroundSize: '100% 100%', 
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    padding: 0,

                    // filter: !isSelected ? 'drop-shadow(0px 4px 8px rgba(0,0,0,0.5))' : 'brightness(1.05) drop-shadow(0px 4px 6px rgba(0,0,0,0.8)) drop-shadow(0px 0px 10px rgba(255, 215, 0, 0.8))',

                    filter: !isSelected 
                        ? 'drop-shadow(0px 4px 8px rgba(0,0,0,0.5))' 
                        : 'brightness(1.1) drop-shadow(0px 8px 16px rgba(0,0,0,0.95)) drop-shadow(0px 0px 20px rgba(196, 25, 25, 0.8))',

                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: isLocked ? 'auto' : 'pointer',
                    
                    '&:hover': !isLocked && !isSelected ? {
                        transform: 'scale(1.02) translateY(-2px)',
                        // filter: 'brightness(1.1) drop-shadow(0px 8px 12px rgba(212, 175, 55, 0.4))',
                        filter: 'brightness(1.05) drop-shadow(0px 10px 15px rgba(0,0,0,0.85))',

                        '& .floor-title': {
                            color: '#8b1a1a', 
                            textShadow: '0px 1px 2px rgba(0,0,0,0.4), 0px 0px 8px rgba(139, 26, 26, 0.5)', 
                        },
                        '& .floor-subtitle': {
                            color: '#2a1d15', 
                            textShadow: '0px 1px 1px rgba(255, 255, 255, 0.6)', 
                    }
                    } : {}
                }
            }
        >
            {isLocked && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '20px', left: '15px', right: '15px', bottom: '7px',
                        borderRadius: 'inherit',
                        overflow: 'hidden', 
                        zIndex: 2,
                        pointerEvents: 'none',

                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',

                        containerType: 'size',

                        ...chainStyles
                    }}
                >
                    <Box
                        component="img"
                        src={seal} 
                        sx={{
                            width: '80x',
                            height: '80px',
                            zIndex: 3,

                            transform: 'rotate(-8deg)', 
                            // filter: 'drop-shadow(2px 4px 4px rgba(0,0,0,0.8)) drop-shadow(0px 0px 15px rgba(220, 20, 20, 0.8))',
                            // filter: 'drop-shadow(2px 4px 4px rgba(0,0,0,0.8))',
                            // filter: 'brightness(0.85) contrast(1.15) sepia(0.2) drop-shadow(2px 4px 5px rgba(0,0,0,0.95))',
                            filter: 'brightness(0.65) saturate(0.3) contrast(1.4) sepia(0.4) drop-shadow(0px 6px 5px rgba(0,0,0,0.95))',
                            opacity: 0.9,
                        }}
                    />
                </Box>
            )}

            <Box 
                display="flex" 
                alignItems="center" 
                pl={4}
                pr={2}
                sx={{ 
                    position: 'relative', 
                    zIndex: 1, 
                    width: '100%', 
                    height: '100%',
                    opacity: isLocked ? 0.85 : 1,
                    // filter: isLocked ? 'grayscale(60%)' : 'none',
                    filter: isLocked ? 'saturate(0.3) contrast(1.2)' : 'none',
                    pointerEvents: isLocked ? 'none' : 'auto'
                }}>
                <Box 
                    mr={3} 
                    sx={{
                        width: '50px', 
                        height: '50px', 
                        position: 'relative',

                        background: getIconColor(), 
                        mask: getIcon(),
                        WebkitMask: getIcon(),

                        opacity: isSelected ? 0.9 : 0.75,
                        mixBlendMode: 'multiply',

                        filter: isSelected 
                            ? 'drop-shadow(0px 1px 0px rgba(255, 255, 255, 0.3)) drop-shadow(0px -1px 1px rgba(0,0,0,0.4))' 
                            : 'drop-shadow(0px 1px 0px rgba(255, 255, 255, 0.2))',

                        transition: 'all 0.3s ease',

                        // filter: isSelected 
                        //     ? 'drop-shadow(0px 2px 2px rgba(0,0,0,0.8)) drop-shadow(0px 0px 8px rgba(255, 215, 0, 0.6))' 
                        //     : 'none',

                        // transition: 'opacity 0.3s ease, filter 0.3s ease, background 0.3s ease',

                        // '&::after': isSelected ? {
                        //     content: '""',
                        //     position: 'absolute',
                        //     top: 0, 
                        //     left: '-100%',
                        //     width: '100%', 
                        //     height: '100%',
                        //     background: 'linear-gradient(110deg, transparent 30%, rgba(255, 235, 150, 0.8) 50%, transparent 70%)',
                        //     animation: 'shimmerSweep 3s infinite linear',
                        // } : {},

                        // '@keyframes shimmerSweep': {
                        //     '0%': { transform: 'translateX(0)' },
                        //     '100%': { transform: 'translateX(250%)' }
                        // }
                    }}
                />
                <Box display="flex" flexDirection="column">
                    <Typography 
                        className="floor-title"
                        fontWeight={800} 
                        fontSize='135%' 
                        sx={{ 
                            color: isSelected ? '#8b1a1a' : '#3d2b1f',
                            textShadow: isSelected 
                                ? '0 1px 0 rgba(255,255,255,.4), 0 -1px 0 rgba(90, 0, 0, 0.35)' 
                                : '0px 1px 1px rgba(255, 255, 255, 0.5), 0px 0px 0px rgba(0,0,0,0)',
                            letterSpacing: '1px',
                            
                            transition: 'color 0.3s ease, text-shadow 0.3s ease',
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                            WebkitFontSmoothing: 'antialiased'  
                        }}
                    >
                        Floor {20 - index}
                    </Typography>
                    <Typography 
                        className="floor-subtitle"
                        fontWeight={600} 
                        fontSize='100%'
                        sx={{
                            color: isSelected ? '#302218' : '#5c4535',
                            textShadow: isSelected 
                                ? '0px 1px 2px rgba(255, 255, 255, 0.4)' 
                                : '0px 1px 1px rgba(255, 255, 255, 0.3)',
                                
                            letterSpacing: '0.5px',

                            transition: 'color 0.3s ease, text-shadow 0.3s ease',
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                            WebkitFontSmoothing: 'antialiased'  
                        }}
                    >
                        Flesh Withering
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};