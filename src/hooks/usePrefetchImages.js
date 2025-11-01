import { useEffect } from "react";

export default function usePrefetchImages(sources, options = {}) {
  useEffect(() => {
    if (typeof window === "undefined" || !sources?.length) {
      return;
    }

    let cancelled = false;
    const uniqueSources = [...new Set(sources.filter(Boolean))];
    const delay = typeof options.delay === "number" ? options.delay : 50;

    let index = 0;

    const scheduleNext = () => {
      if (cancelled || index >= uniqueSources.length) {
        return;
      }
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(loadNext, { timeout: 500 });
      } else {
        setTimeout(loadNext, delay);
      }
    };

    const loadNext = () => {
      if (cancelled || index >= uniqueSources.length) {
        return;
      }
      const src = uniqueSources[index++];
      const img = new Image();

      let handled = false;
      const settle = () => {
        if (cancelled || handled) {
          return;
        }
        handled = true;
        scheduleNext();
      };

      img.onload = settle;
      img.onerror = settle;

      if (typeof img.decode === "function") {
        img
          .decode()
          .catch(() => {})
          .finally(settle);
      }

      img.src = src;

      if (img.complete && img.naturalWidth > 0) {
        settle();
      }
    };

    scheduleNext();

    return () => {
      cancelled = true;
    };
  }, [sources, options.delay]);
}
