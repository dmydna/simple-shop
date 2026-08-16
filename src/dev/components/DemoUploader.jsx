import { devService } from "@/dev/services/devService";
import { useService } from "@/hooks/useService";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import JSONFileUploader from "@dev/components/JSONFileUploader";
import JSONFileDetails from "@dev/components/JSONFileDetails";
import FetchState from "@/components/common/FetchState";




function DemoUploader() {

    const [file, setFile] = useState(null);
    const [content, setContent] = useState([])
    const [success, setSuccess] = useState(false)

    const { loading, error, setError, createBulk } = useService({ service: devService, onSuccess: () => setSuccess(true) })

    const handleSubmit = () => {
        createBulk("listings", content)
    }


    useEffect(() => {
        if (!file) return;

        const reader = new FileReader();
  
        reader.onload = (e) => {
            try {
                const text = e.target.result;
                const parsed = JSON.parse(text);
                setContent(parsed);
            } catch (error) {
                console.error('Error al parsear JSON:', error);
                setContent([]);
            }
        };

        reader.onerror = () => {
            console.error('Error al leer el archivo');
            setContent([]);
        };

        reader.readAsText(file); // Lee el archivo como texto
    }, [file]);


    return (
        <Container>
            <div className="d-block mx-auto rounded island p-4 border mb-3" style={{ maxWidth: '500px' }}>
                <FetchState
                    hook={{loading, error, setError, success, setSuccess}}
                >
                    <>
                        <p className="h5">Demo </p>

                        {!file && (
                            <small className="mb-4 text-secondary">
                                Selecciona un archivo <b>.json</b> valido para cargar contenido demo.
                            </small>
                        )}

                        <JSONFileUploader file={file} setFile={setFile}>
                            <JSONFileDetails file={file} content={content} />
                        </JSONFileUploader>
                        

                        {file && (
                            <Button className="d-block mx-auto rounded-4" onClick={handleSubmit} variant="dark">
                                Enviar
                            </Button>
                        )}
                    </>
                </FetchState>
            </div>

        </Container>

    )
}

export default DemoUploader;
