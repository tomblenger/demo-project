import React from "react";
import Image from "next/image";

interface SafeImageProps {
  src: string | null | undefined;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  fallbackSrc?: string;
  onError?: () => void;
  priority?: boolean;
}

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  fallbackSrc = "/assets/img/icons/upload.png",
  onError,
  priority = false,
}) => {
  // Check if src is valid (not empty, null, or undefined)
  const isValidSrc = src && src.trim() !== "" && src !== "null" && src !== "undefined";
  
  if (!isValidSrc) {
    return (
      <Image
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      onError={onError}
      priority={priority}
    />
  );
};

export default SafeImage; 