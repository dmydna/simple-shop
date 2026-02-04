import React, { useRef, useState } from 'react';
import { Button, Form } from "react-bootstrap";



const UserPerfil = ({ productId, title, className, multiple = true }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState(["https://dummyimage.com/300x300/dadada/"]);
  const fileInputRef = useRef(null);

  // Manejar el cambio del input
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files && files.length != 0) {
      setSelectedFile(files);
      // Crear una URL temporal para ver la imagen antes de subirla
      for(let i=0; i < files.length; i++){
        setPreview(prev => [...prev,URL.createObjectURL(files[i]) ])
      }
    }
  };

  const handleRemove = (index) => {
    const newPreview = preview.filter((_, idx) => idx !== index);
    const newSelectedFiles = selectedFile.filter((_, idx) => idx !== index);
    
    setPreview(newPreview);
    setSelectedFile(newSelectedFiles);
  
    // Si borras todas las fotos, reseteamos el input físicamente
    if (newSelectedFiles.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Por favor selecciona un archivo");

    try {
      // Aquí llamas a tu función imageUpload del servicio
      await listingService.createWithImage(productId, selectedFile);
      alert("Imagen subida con éxito");
    } catch (error) {
      alert("Error al subir: " + error.message);
    }
  };

  return (
    // CAMBIO: Usamos Form de react-bootstrap que renderiza una etiqueta <form> real
    <>
        <Form 
          style={{ minHeight: '470px' }} 
          id='userPerfilForm' 
          className={`upload-form rounded ${className}`}>
      <div className='h4 mb-3'>{title}</div>
      
      <Form.Group className="mb-3">
        <Form.Label>Selecciona una imagen</Form.Label>
        <Form.Control 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          multiple={multiple}
          onChange={handleFileChange} 
        />
      </Form.Group>

      {/* Vista previa */}
      {preview && (
        <div className="d-flex mb-3 text-center justify-content-center">
          {preview.map( (url, index) => 
            ( <div 
                key={url} 
                className="img-container" 
                onClick={() => handleRemove(index)}
                title="Click para eliminar"
                style={{width: "170px",height: "170px"}}
              >
                  <img 
                    src={url} 
                    alt={`Vista previa ${index}`} 
                    className="img-thumbnail" 
                  />
              </div>
               )
          )}
        </div>
      )}
    </Form>
      {/* Usamos el Button de Bootstrap para mejor estética */}
      <Button form="userPerfilForm" onClick={handleSubmit} variant="primary">
        Subir Imagen
      </Button>
    </>

  );
};

export default UserPerfil;