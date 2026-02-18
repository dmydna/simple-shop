import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

function ProductoForm({ onSubmit, productoAEditar, onCancel,  }) {

  const [title, setNombre] = useState('');
  const [price, setPrecio] = useState('');
  const [errores, setErrores] = useState([]);

  useEffect(() => {
    if (productoAEditar) {
      setNombre(productoAEditar.title);
      setPrecio(productoAEditar.price.toString());
      setErrores([]);
    } else {
      setNombre('');
      setPrecio('');
      setErrores([]);
    }
  }, [productoAEditar]);

  const validar = () => {
    const erroresValidacion = [];
    if (!title.trim()) {
      erroresValidacion.push('El title no puede estar vacío.');
    }
    if (price === '' || isNaN(price) || Number(price) <= 0) {
      erroresValidacion.push('El price debe ser un número mayor a 0.');
    }
    setErrores(erroresValidacion);
    return erroresValidacion.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;

    const producto = {
      title: title.trim(),
      price: Number(price),
    };

    if (productoAEditar) {
      producto.id = productoAEditar.id; 
    }

    onSubmit(producto);

    if (!productoAEditar) {
      setNombre('');
      setPrecio('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errores.length > 0 && (
        <Alert variant="danger">
          <ul>
            {errores.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Form.Group as={Row} className="mb-3" controlId="title">
        <Form.Label column sm={2}>Nombre</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="Nombre del producto"
            value={title}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="price">
        <Form.Label column sm={2}>Precio</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrecio(e.target.value)}
            min="0"
            step="0.01"
          />
        </Col>
      </Form.Group>

      <Button variant="primary" type="submit" className="me-2">
        {productoAEditar ? 'Actualizar' : 'Agregar'}
      </Button>

      {productoAEditar && (
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      )}
    </Form>
  );
}

export default ProductoForm;