import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isInteractive =
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('.cursor-pointer');
      setIsHovered(!!isInteractive);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animationFrame;
    const animateTrail = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.25,
        y: prev.y + (pos.y - prev.y) * 0.25
      }));
      animationFrame = requestAnimationFrame(animateTrail);
    };
    animationFrame = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrame);
    };
  }, [pos.x, pos.y, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Precision Center Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#56C8FF] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#56C8FF]"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
        }}
      />
      {/* Smooth Fluid Orbital Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border transition-[width,height,background-color,border-color] duration-150 ease-out -translate-x-1/2 -translate-y-1/2 ${
          isHovered
            ? 'w-11 h-11 border-[#56C8FF] bg-[#56C8FF]/15'
            : 'w-7 h-7 border-[#9370DB]/60 bg-transparent'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`
        }}
      />
    </div>
  );
}
