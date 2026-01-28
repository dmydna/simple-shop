import React, { useState } from 'react';
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { listingService } from '../../services/listingService';

const ImageMultipleUploadForm = ({ productId, title, className }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFileS] = useState(null)
  const [preview, setPreview] = useState(null);

  // Manejar el cambio del input
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length != 0) {
      setSelectedFile(files);
      // Crear una URL temporal para ver la imagen antes de subirla
      for(let i=0; i < files.length; i++){
        const url = URL.createObjectURL(files[i]);
        setPreview(prev => [...prev, url])
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Por favor selecciona almenos un archivo");

    try {
      // Aquí llamas a tu función imageUpload del servicio
      await listingService.imageMultipleUpload(productId, selectedFile);
      alert("Imagen subida con éxito");
    } catch (error) {
      alert("Error al subir: " + error.message);
    }
  };

  return (
    // CAMBIO: Usamos Form de react-bootstrap que renderiza una etiqueta <form> real
    <Form className={`upload-form p-3 rounded ${className}`}>
      <div className='h4 mb-3'>{title}</div>
      
      <Form.Group className="mb-3">
        <Form.Label>Selecciona una imagen</Form.Label>
        <Form.Control 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
      </Form.Group>

      {/* Vista previa */}
      {preview && (
        <div className="mb-3 text-center">
          <img src={preview} alt="Vista previa" className="img-thumbnail" width="200" />
        </div>
      )}

      {/* Usamos el Button de Bootstrap para mejor estética */}
      <Button onClick={handleSubmit} variant="primary">
        Subir Imagen
      </Button>
    </Form>
  );
};

export default ImageMultipleUploadForm;