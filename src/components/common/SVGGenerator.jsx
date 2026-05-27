import React, { useState, useEffect } from 'react';

const SVGGenerator = ({
  width = 200,
  height = 200,
  background = '#ffffff',
  textColor = '#000000',
  fontSize = '16',
  finalLabel = 'Texto',
  fontFamily = 'Arial',
  fontWeight = 'normal',
  isIconFont = false
}) => {
  const [fontBase64, setFontBase64] = useState('');
  const [svgContent, setSvgContent] = useState('');

  // Detectar formato de fuente basado en la extensión
  const detectFontFormat = (fontFamily) => {
    const formats = {
      'ttf': 'truetype',
      'otf': 'opentype',
      'woff': 'woff',
      'woff2': 'woff2'
    };
    
    const extension = fontFamily.split('.').pop().toLowerCase();
    return formats[extension] || 'truetype';
  };

  // Mapear peso de fuente
  const mapFontWeight = (weight) => {
    const weightMap = {
      'light': '300',
      'normal': '400',
      'bold': '700',
      'extra-bold': '900'
    };
    return weightMap[weight] || weight;
  };

  // Obtener fuente en base64 (simula getFontBase64 del servicio Java)
  useEffect(() => {
    const loadFont = async () => {
      try {
        // Aquí iría la lógica para obtener la fuente en base64
        // Por ejemplo, desde una API o archivo local
        const response = await fetch(`/api/fonts/${fontFamily}`);
        const blob = await response.blob();
        const reader = new FileReader();
        
        reader.onloadend = () => {
          setFontBase64(reader.result.split(',')); // Obtener solo la parte base64
        };
        
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error cargando fuente:', error);
      }
    };

    loadFont();
  }, [fontFamily]);

  // Generar SVG
  useEffect(() => {
    try {
      const bgColor = background.startsWith('#') ? background : `#${background}`;
      const textColorHex = textColor.startsWith('#') ? textColor : `#${textColor}`;
      const fontWeightValue = isIconFont ? 'normal' : mapFontWeight(fontWeight);
      const fontFormat = detectFontFormat(fontFamily);

      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
          <defs>
            <style>
              @font-face {
                font-family: 'custom-font';
                src: url('data:font/${fontFormat};base64,${fontBase64}') format('${fontFormat}');
              }
            </style>
          </defs>
          <rect width="100%" height="100%" fill="${bgColor}"/>
          <text 
            x="50%" 
            y="50%" 
            font-family="custom-font"
            font-size="${fontSize}px"
            font-weight="${fontWeightValue}"
            text-anchor="middle" 
            dominant-baseline="middle"
            fill="${textColorHex}">
            ${finalLabel}
          </text>
        </svg>
      `;

      setSvgContent(svg);
    } catch (error) {
      console.error('Error generando SVG:', error);
    }
  }, [width, height, background, textColor, fontSize, finalLabel, fontFamily, fontWeight, isIconFont, fontBase64]);

  // // Descargar SVG como archivo
  // const downloadSVG = () => {
  //   const element = document.createElement('a');
  //   element.setAttribute('href', `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`);
  //   element.setAttribute('download', 'imagen.svg');
  //   element.style.display = 'none';
  //   document.body.appendChild(element);
  //   element.click();
  //   document.body.removeChild(element);
  // };

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: svgContent }} />
      {/* <button onClick={downloadSVG}>Descargar SVG</button> */}
    </div>
  );
};

export default SVGGenerator;