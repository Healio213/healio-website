
import React, { useState } from 'react';

/**
 * OptimizedImage Component
 * Handles responsive image loading, WebP fallbacks, lazy loading, and explicit dimensions to prevent CLS.
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  priority = false, 
  lazy = true,
  width,
  height,
  sizes = "(max-width: 480px) 480px, (max-width: 768px) 768px, 100vw" 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Check if it's an Unsplash URL to automatically apply transformation params
  const isUnsplash = typeof src === 'string' && src.includes('unsplash.com');
  
  const generateSrcSet = (format = 'auto') => {
    if (isUnsplash) {
      const baseUrl = src.split('?')[0];
      return `${baseUrl}?w=480&q=80&fm=${format} 480w, ${baseUrl}?w=768&q=80&fm=${format} 768w, ${baseUrl}?w=1920&q=80&fm=${format} 1920w`;
    }
    // Fallback for standard images: attempt to assume a .webp equivalent exists if deployed on a modern CDN
    // However, without a true image optimization service, we rely on the original src for generic srcset
    return undefined;
  };

  const shouldLazyLoad = !priority && lazy;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ display: 'inline-block', width: '100%', height: '100%' }}>
      <picture>
        {isUnsplash && <source type="image/webp" srcSet={generateSrcSet('webp')} sizes={sizes} />}
        {/* We assume if not unsplash, we might have a webp version available if processed, but we fallback to standard <img> safely */}
        <img
          src={src}
          srcSet={generateSrcSet()}
          sizes={sizes}
          alt={alt || "Decorative image"}
          width={width}
          height={height}
          style={{ aspectRatio: width && height ? `${width}/${height}` : 'auto' }}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          loading={shouldLazyLoad ? "lazy" : "eager"}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          onLoad={() => setIsLoaded(true)}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;
