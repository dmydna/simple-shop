import React from 'react';


const getFileName = (url) => {
  try {
    // Crea un objeto URL para analizar la cadena
    const urlObj = new URL(url);
    
    // Obtiene la última parte de la ruta (pathname)
    const fullName = urlObj.pathname.split('/').pop();
    
    // Si la URL termina en '/', el resultado podría ser vacío
    if (!fullName) return 'archivo_sin_nombre';
    
    return fullName;
  } catch (error) {
    console.error("URL inválida", error);
    return null;
  }
};


const DownloadFileButton = ({ urlFile }) => {
  const handleDownload = async () => {
    try {
      // 1. Solicitar la imagen al backend
      const response = await fetch(urlFile);
      
      if (!response.ok) throw new Error('Error al obtener la imagen');

      // 2. Convertir la respuesta a un Blob
      const blob = await response.blob();
      
      // 3. Crear una URL temporal para el Blob
      const url = URL.createObjectURL(blob);
      
      // 4. Crear enlace temporal y simular clic
      const enlace = document.createElement('a');
      enlace.href = url;
        // getFileName: url.split('/').pop().split('?');
      enlace.download = getFileName(urlFile); // Nombre del archivo
      document.body.appendChild(enlace);
      enlace.click();
      
      // 5. Limpieza
      document.body.removeChild(enlace);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar:', error);
    }
  };

  return (
      <i  onClick={handleDownload} className='bi bi-download'></i>
  );
};



export default DownloadFileButton;