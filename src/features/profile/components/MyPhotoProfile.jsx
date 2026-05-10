import PageLoading from '@/components/common/PageLoading';
import PageError from '@/pages/errors/PageError';
import PageSuccess from '@/pages/errors/PageSuccess';
import ImageUploader from "@common/ImageUploader.jsx";
import { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import { useProfile } from "../contexts/ProfileContext.jsx";
import { ProfileHeader } from './ProfileHeader.jsx';


const MyPhotoProfile = ({ title, className }) => {

  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState([]);
  const { updateImage, loading, profile, success, setSuccess, error, setError } = useProfile();

  useEffect(() => {
    setPreview(profile?.image || '')
  }, [profile])


  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedFile = image
    updateImage(selectedFile)
  }

  return (
    <>
      {loading && <PageLoading />}
      {error && <PageError handle={() => setError(null)} />}
      {success && <PageSuccess handle={() => setSuccess(false)} />}
      {!success && !error && !loading && (
        <>
          <ProfileHeader
            className='mb-0'
            title="Imagen de Cuenta"
            subtitle="Cambiar tu imagen de cuenta"
          />
          <ImageUploader
            preview={preview}
            setPreview={setPreview}
            setImage={setImage}
            image={image}
          />
          {/* Usamos el Button de Bootstrap para mejor estética */}
          {image !== null && (
            <div className='w-100 d-flex justify-content-center'>
              <Button onClick={handleSubmit} variant="outline-dark" disabled={loading}>
                <i className='bi bi-floppy me-2'></i>
                Guardar cambios
              </Button>
            </div>
          )}


        </>
      )}

    </>

  );
};

export default MyPhotoProfile;
