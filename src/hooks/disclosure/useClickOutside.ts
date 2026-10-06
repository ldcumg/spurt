import { useEffect, useRef } from "react";

/** containerRef 바깥 클릭 시 clickEvent 실행 */
export const useClickOutside = (clickEvent: () => void) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outsideClickEvent = (event: MouseEvent) => {
      const container = containerRef.current;

      if (!container || !(event.target instanceof Node)) return;

      if (!container.contains(event.target)) {
        clickEvent();
      }
    };

    document.addEventListener("mousedown", outsideClickEvent);

    return () => {
      document.removeEventListener("mousedown", outsideClickEvent);
    };
  }, [clickEvent]);

  return containerRef;
};
