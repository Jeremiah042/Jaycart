import { useRef, useEffect } from "react";

export function useOutSideClick<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickedOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickedOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickedOutside);
    };
  }, [callback]);

  return ref;
}
