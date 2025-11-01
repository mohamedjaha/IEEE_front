import React, { useEffect, useRef, useState } from "react";

const transparentPixel =
  "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";

export default function LazyImage({
  src,
  alt,
  priority = false,
  className = "",
  onLoad,
  ...props
}) {
  const imgRef = useRef(null);
  const [currentSrc, setCurrentSrc] = useState(
    priority ? src : transparentPixel
  );
  const [loaded, setLoaded] = useState(priority);

  useEffect(() => {
    setLoaded(priority);

    if (priority) {
      setCurrentSrc(src);
      return;
    }

    setCurrentSrc(transparentPixel);

    if (
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined"
    ) {
      setCurrentSrc(src);
      return;
    }

    const node = imgRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSrc(src);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "400px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [priority, src]);

  const handleLoad = (event) => {
    if (event.currentTarget.src === transparentPixel) {
      return;
    }
    setLoaded(true);
    if (typeof onLoad === "function") {
      onLoad(event);
    }
  };

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      onLoad={handleLoad}
      loading={priority ? "eager" : "lazy"}
      fetchpriority={priority ? "high" : "auto"}
      decoding="async"
      className={`${className} ${
        loaded ? "lazy-loaded" : "lazy-loading"
      }`.trim()}
      {...props}
    />
  );
}
