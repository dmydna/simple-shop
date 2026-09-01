import React, { useEffect, useState } from 'react';

const ImageWithFallback = ({ src, fallbackSrc, alt, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc); // Cambia a la imagen de reserva si falla la principal
    }
  };

  useEffect(() => {
    setImgSrc(src);
    setHasError(false); // Opcional: reinicia el estado de error si la nueva imagen es válida
  }, [src]);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
};

export default ImageWithFallback;