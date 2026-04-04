import { Button, Form } from "react-bootstrap";



export default function FileUploader({ data, setData, className, submit, children, label = true }) {



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error('No se seleccionó ningún archivo')
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;

      try {
        const parsed = JSON.parse(content);
        setData(parsed);
        console.log('contenido: ', parsed);
      } catch (error) {
        setData(content); // Si no es JSON válido, guarda como texto plano
        console.error('Error al parsear JSON:', error);
      }
    };

    reader.onerror = () => {
      console.error('Error al leer el archivo:', reader.error);
    };

    reader.readAsText(file);
  };


  return (
    <Form className={`upload-form rounded ${className}`}>

      <div className='h4 mb-3'>
        {children}
      </div>

      <Form.Group className="mb-3">
        {label && (
          <Form.Label>Selecciona una archivo</Form.Label>
        )}

        <Form.Control
          type="file"
          accept=".json,.txt"
          onChange={handleFileChange}
        />
      </Form.Group>

      {submit && (
        <Button onClick={submit} variant="primary">
          Submit
        </Button>
      )}


    </Form>
  );
}