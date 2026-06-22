import { useEffect, useState } from "react";

export type ScrollDirection = "up" | "down";

export function useScrollDirection(threshold = 8) {
  const [direction, setDirection] = useState<ScrollDirection>("up");

  useEffect(() => {
    let previousY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - previousY;

      if (Math.abs(delta) < threshold) {
        return;
      }

      setDirection(delta > 0 ? "down" : "up");
      previousY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return direction;
}
