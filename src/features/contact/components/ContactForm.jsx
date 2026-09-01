import React  from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

function ContactForm({children, style, className}) {

  return (
    <>
    <Col className={`${className} mx-auto`} style={style}>
      {children}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Tu nombre" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="tu@email.com" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button variant="primary" type="submit"  className="w-100 my-2" >
          Enviar
        </Button>
      </Form>
    </Col>
    </>
  );
}

export default ContactForm;