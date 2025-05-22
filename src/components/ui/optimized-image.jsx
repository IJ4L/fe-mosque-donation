import { useState, useEffect, memo } from "react";
import { getImageUrl } from "@/lib/utils";

const OptimizedImage = memo(
  ({
    src,
    alt,
    width,
    height,
    className = "",
    sizes = "100vw",
    priority = false,
    loading = "lazy",
    onLoad = () => {},
    ...props
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleLoad = () => {
      setIsLoaded(true);
      onLoad();
    };

    const imgSrc = getImageUrl(src);

    const loadingAttribute = priority ? "eager" : loading;

    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ width, height }}
      >
        {!isLoaded && (
          <div
            className="absolute inset-0 bg-gray-200 animate-pulse"
            style={{ width, height }}
          />
        )}

        <img
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          loading={loadingAttribute}
          className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={handleLoad}
          decoding="async"
          sizes={sizes}
          {...props}
        />
      </div>
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
