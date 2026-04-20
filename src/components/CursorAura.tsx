import { useEffect, useRef, useState } from "react";

const CURSOR_SNAP_DISTANCE = 0.25;
const CORE_FOLLOW_STRENGTH = 0.72;
const TRAIL_FOLLOW_STRENGTH = 0.3;

const CursorAura = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [cursorStyle, setCursorStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });
  const [trailStyle, setTrailStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });

  const pointerTarget = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const trailPosition = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncEnabledState = () => {
      const nextEnabled = mediaQuery.matches && !reducedMotionQuery.matches;
      setIsEnabled(nextEnabled);
      setIsVisible(false);
    };

    syncEnabledState();
    mediaQuery.addEventListener("change", syncEnabledState);
    reducedMotionQuery.addEventListener("change", syncEnabledState);

    return () => {
      mediaQuery.removeEventListener("change", syncEnabledState);
      reducedMotionQuery.removeEventListener("change", syncEnabledState);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const updateFrame = () => {
      const cursorDx = pointerTarget.current.x - cursorPosition.current.x;
      const cursorDy = pointerTarget.current.y - cursorPosition.current.y;
      const trailDx = pointerTarget.current.x - trailPosition.current.x;
      const trailDy = pointerTarget.current.y - trailPosition.current.y;

      cursorPosition.current.x += cursorDx * CORE_FOLLOW_STRENGTH;
      cursorPosition.current.y += cursorDy * CORE_FOLLOW_STRENGTH;
      trailPosition.current.x += trailDx * TRAIL_FOLLOW_STRENGTH;
      trailPosition.current.y += trailDy * TRAIL_FOLLOW_STRENGTH;

      if (Math.abs(cursorDx) < CURSOR_SNAP_DISTANCE) {
        cursorPosition.current.x = pointerTarget.current.x;
      }

      if (Math.abs(cursorDy) < CURSOR_SNAP_DISTANCE) {
        cursorPosition.current.y = pointerTarget.current.y;
      }

      if (Math.abs(trailDx) < CURSOR_SNAP_DISTANCE) {
        trailPosition.current.x = pointerTarget.current.x;
      }

      if (Math.abs(trailDy) < CURSOR_SNAP_DISTANCE) {
        trailPosition.current.y = pointerTarget.current.y;
      }

      const speed = Math.min(Math.hypot(cursorDx, cursorDy), 120);
      const angle = Math.atan2(cursorDy, cursorDx) * (180 / Math.PI);
      const stretch = 1 + speed / 180;

      setCursorStyle({
        opacity: isVisible ? 1 : 0,
        transform: `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0) translate(-50%, -50%) scale(${isInteractive ? 1.35 : 1})`,
      });

      setTrailStyle({
        opacity: isVisible ? 1 : 0,
        transform: `translate3d(${trailPosition.current.x}px, ${trailPosition.current.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${stretch}, ${1 / Math.max(stretch * 0.92, 1)})`,
      });

      animationFrame.current = window.requestAnimationFrame(updateFrame);
    };

    animationFrame.current = window.requestAnimationFrame(updateFrame);

    return () => {
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isEnabled, isInteractive, isVisible]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const moveCursor = (event: PointerEvent) => {
      pointerTarget.current = { x: event.clientX, y: event.clientY };

      if (!isVisible) {
        cursorPosition.current = { x: event.clientX, y: event.clientY };
        trailPosition.current = { x: event.clientX, y: event.clientY };
      }

      setIsVisible(true);
    };

    const hideCursor = () => {
      setIsVisible(false);
      setIsInteractive(false);
    };

    const updateInteractiveState = (event: PointerEvent) => {
      const target = event.target;
      const interactiveElement =
        target instanceof Element
          ? target.closest(
              "a, button, input, textarea, select, summary, [role='button'], [data-cursor='interactive']",
            )
          : null;

      setIsInteractive(Boolean(interactiveElement));
    };

    window.addEventListener("pointermove", moveCursor, { passive: true });
    window.addEventListener("pointermove", updateInteractiveState, {
      passive: true,
    });
    window.addEventListener("pointerleave", hideCursor);
    window.addEventListener("blur", hideCursor);

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointermove", updateInteractiveState);
      window.removeEventListener("pointerleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div className="cursor-aura-layer" aria-hidden="true">
      <div className="cursor-aura-trail" style={trailStyle} />
      <div className="cursor-aura-core" style={cursorStyle} />
    </div>
  );
};

export default CursorAura;
