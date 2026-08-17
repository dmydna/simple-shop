import CenterLayout from '@/components/layout/CenterLayout';
import { useRef, useState } from 'react';

export default function JSONFileUploader({ children, file, setFile}) {

  //const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const validateImage = (file) => {
    if (!file || !(file instanceof File)) {
      console.error("El objeto recibido no es un archivo válido:", file);
      setError('El archivo seleccionado no es válido.');
      return false;
    }

    const allowedTypes = ['application/json', 'application/json'];
    if (!allowedTypes.includes(file.type)) {
      // console.log("file",file.type)
      setError('Solo se permiten archivos JSON o TXT');
      return false;
    }

    return true;
  };

  const handleFileSelect = (file) => {
    setError('');
    if (!validateImage(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setFile(file);
      setPreview("/json.svg");
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      // Extraer el primer archivo de la lista
      handleFileSelect(fileList[fileList.length - 1]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necesario para permitir el drop
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;

    // CORRECCIÓN: Extraer el archivo de la FileList
    if (files && files.length > 0) {
      handleFileSelect(files[files.length - 1]);
    } else {
      setError('No se detectó ningún archivo al soltar.');
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview('');
    setError('');
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (

      <div className="upload-container my-5">
      
  
      <div className={`${!file ? 'd-block': 'd-none'}`}>
      <div className="p-5 border-3 border border-dashed rounded-4 upload-img" style={{ position: 'relative' }}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleInputChange}
          accept="application/json,application/json"
          style={{ display: 'none' }}
        />


          <div className="text-center">
            <i style={{
              width: "50px",
              height: "50px",
              padding: "3px 10px",
              display: "inline-table"
            }} className="bi bi-upload fs-4 rounded-circle border-3 border-dotted border-primary  text-primary mb-2"></i>
            <p className='mb-0'>Click to <b>upload</b> or drag and drop</p>
            <small className="text-muted">
              JSON or TXT (MAX. 1MB)
            </small>
            {/*{error && <p className="text-danger mt-2">{error}</p>}*/}
          </div>
          {/* CORRECCIÓN: Eliminado pointerEvents: 'none' para permitir que los eventos lleguen aquí */}
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            // pointerEvents: 'none'  <-- ESTO ESTABA ROMPIENDO EL DROP
          }}
        />
       
      </div>

           </div>
           
      	{file && (
      	  <div className='d-flex flex-wrap flex-md-nowrap gap-3'>
          <div  style={{ backgroundColor: '#FFF5B7', zIndex: 20, position: 'relative' }} className="p-3 rounded d-block mx-auto text-center w-100">
            <img
              className='rounded mb-3'
              src={preview}
              alt="Vista previa"
              style={{ width: '100px', height: '100px', objectFit: 'contain' }}
            />
            <div  className="d-block">
              <button className="btn btn-sm btn-dark me-2" onClick={handleClick}>
                <i className='bi bi-pencil'></i>
              </button>
              <button className="btn btn-sm btn-dark" onClick={handleRemove}>
                <i className='bi bi-trash3'></i>
              </button>
            </div>
          </div>
          {children}
          </div>
      	)}


      {error && <div className="alert alert-danger mt-3 py-2 small">{error}</div>}
      </div>
  );
}

