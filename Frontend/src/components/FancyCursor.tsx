import React, { useEffect, useRef } from 'react';

const STAR_COUNT = 12;
const STAR_SIZE = 10;

const getRandomOffset = () => ({
  x: (Math.random() - 0.5) * 30,
  y: (Math.random() - 0.5) * 30,
  scale: 0.6 + Math.random() * 0.8,
  rotate: Math.random() * 360,
  delay: Math.random() * 0.2,
});

const FancyCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      starsRef.current.forEach((star, i) => {
        if (star) {
          const { x, y, scale, rotate, delay } = getRandomOffset();
          star.animate(
            [
              { transform: `translate(0,0) scale(1) rotate(0deg)`, opacity: 1 },
              {
                transform: `translate(${x}px,${y}px) scale(${scale}) rotate(${rotate}deg)`,
                opacity: 0,
              },
            ],
            {
              duration: 700 + delay * 1000,
              fill: 'forwards',
            }
          );
        }
      });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        width: 0,
        height: 0,
      }}
    >
      {[...Array(STAR_COUNT)].map((_, i) => (
        <div
          key={i}
          ref={el => (starsRef.current[i] = el!)}
          style={{
            position: 'absolute',
            width: STAR_SIZE,
            height: STAR_SIZE,
            left: -STAR_SIZE / 2,
            top: -STAR_SIZE / 2,
            pointerEvents: 'none',
            opacity: 0,
          }}
        >
          <svg width={STAR_SIZE} height={STAR_SIZE} viewBox="0 0 10 10">
            <polygon
              points="5,0 6,3.5 10,4 7,6.5 8,10 5,8 2,10 3,6.5 0,4 4,3.5"
              fill="#ffe066"
              stroke="#ffd700"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FancyCursor;