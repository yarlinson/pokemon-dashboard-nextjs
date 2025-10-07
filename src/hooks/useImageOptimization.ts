import { useState, useEffect } from 'react';

interface UseImageOptimizationProps {
  src: string;
  fallbackSrc: string;
}

export function useImageOptimization({ src, fallbackSrc }: UseImageOptimizationProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
      setHasError(false);
    };
    
    img.onerror = () => {
      setImageSrc(fallbackSrc);
      setIsLoading(false);
      setHasError(true);
    };
    
    img.src = src;
  }, [src, fallbackSrc]);

  return {
    imageSrc,
    isLoading,
    hasError,
  };
}

