import React, { useState } from "react";

export const ImageWithFallback = ({
  service,
  fallbackSrc,
  className,
  size = "sm",
  ...props
}: any) => {
  const [imgSrc, setImgSrc] = useState(`/services/${service}.svg`);
  const [showImage, setShowImage] = useState(true);

  const handleError = () => {
    setShowImage(false);
  };

  if (showImage) {
    return (
      <img
        {...props}
        className={className}
        src={imgSrc}
        onError={handleError}
        alt=""
      />
    );
  }

  const fallBackClasses =
    size === "sm"
      ? "text-xs border border-gray-500 px-1.5 py-1.5 rounded-md font-bold bg-gray-400"
      : "w-40 h-40  opacity-25 flex items-center text-center text-7xl rounded-md font-bold bg-gray-400";

  return (
    <div className={fallBackClasses}>
      <span className="block w-full">{service.slice(0, 2)}</span>
    </div>
  );
};
