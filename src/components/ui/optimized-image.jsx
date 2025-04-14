import { useState, useEffect, memo } from "react";
import { getImageUrl } from "@/lib/utils";

// This component implements best practices for image loading performance:
// - Lazy loading
// - Progressive loading with blur placeholder
// - Proper sizing
// - Responsive images

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

    // Handle image load event
    const handleLoad = () => {
      setIsLoaded(true);
      onLoad();
    };

    // Get properly sized image URL
    const imgSrc = getImageUrl(src);

    // Force eager loading if priority is true
    const loadingAttribute = priority ? "eager" : loading;

    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ width, height }}
      >
        {/* Low-quality placeholder or blur while loading */}
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

// Add display name for debugging
OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
