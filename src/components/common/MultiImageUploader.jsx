import { useRef, useState } from 'react';
import DownloadFileButton from './DownloadFileButton';

function MultiImageUploader({ maxImages = 10, maxSizeMB = 1, setImages, images, locked = false }) {

  // const [images, setImages] = useState([]); // Array de objetos { id, url, file }
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    if (!file || !(file instanceof File)) return false;

    const allowedTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError(`El archivo "${file.name}" no es una imagen válida.`);
      return false;
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`El archivo "${file.name}" supera el límite de ${maxSizeMB}MB.`);
      return false;
    }
    return true;
  };

  const handleFiles = (fileList) => {
    setError('');
    const newFiles = [];

    // Convertir FileList a Array y procesar uno por uno
    Array.from(fileList).forEach((file) => {
      if (!validateFile(file)) return;

      // Evitar duplicados por nombre (opcional)
      const isDuplicate = images.some(img => img?.file?.name === file?.name);
      if (isDuplicate) return;

      // Verificar límite de cantidad
      if (images?.length + newFiles.length >= maxImages) {
        setError(`Máximo ${maxImages} imágenes permitidas.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageObj = {
          id: Date.now() + Math.random(), // ID único temporal
          url: e.target.result,
          file: file
        };

        setImages((prev) => [...prev, newImageObj]);
      };
      reader.readAsDataURL(file);
    });
  };


  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    // Limpiar el input para permitir subir el mismo archivo de nuevo si se eliminó
    e.target.value = null;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="upload-container">
      {/* Input oculto */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        accept="image/svg+xml,image/png,image/jpeg,image/gif"
        multiple // <--- Importante: permite seleccionar varios a la vez
        style={{ display: 'none' }}
      />



      {/* Lista de imágenes cargadas */}
      {images?.length > 0 && (
        <div className="row g-3 mb-4">
          {images.map((img) => (
            <div key={img.id} className="col-6 col-md-4 col-lg-3">
              <div className="position-relative rounded overflow-hidden border shadow-sm bg-light">
                <img
                  src={img.url}
                  alt="Preview"
                  className="w-100 d-block"
                  style={{ height: '120px', objectFit: 'contain' }}
                />
                {locked && (
                  <button
                    className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle"
                    style={{ width: '24px', height: '24px', padding: 0, zIndex: 10 }}
                    onClick={() => removeImage(img.id)}
                  >
                    &times;
                  </button>
                )}
                {!locked && (
                  <button
                    className="btn btn-sm btn-dark position-absolute top-0 end-0 m-1 rounded-circle"
                    style={{ width: '24px', height: '24px', padding: 0, zIndex: 10 }}
                  >
                       <DownloadFileButton  urlFile={img.url} />
                  </button>
                     
                )}


                <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white text-center py-1" style={{ fontSize: '0.7rem' }}>
                  {img?.file?.name?.length > 15 ? img?.file?.name?.substring(0, 12) + '...' : img?.file?.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Área de carga (solo visible si no se ha alcanzado el límite) */}
      {images?.length < maxImages && locked && (
        <div
          className="p-5 border-3 border border-dashed rounded-4 upload-img mb-3"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={handleClick}
          style={{
            cursor: 'pointer',
            transition: 'border-color 0.3s',
            minHeight: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0d6efd'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'currentColor'}
        >
          <div className="text-center">
            <i className="bi bi-plus-circle-dotted fs-1 text-primary mb-2"></i>
            <p className="mb-0 fw-bold">
              Agregar más imágenes
            </p>
            <small className="text-muted">
              Arrastra archivos o haz clic para seleccionar (Max: {maxImages})
            </small>
          </div>
        </div>
      )}

      {error && <div className="alert alert-danger mt-3 py-2 small">{error}</div>}

    </div>
  );
}

export default MultiImageUploader;
