import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import ContactForm from '@features/contact/ContactForm.jsx';
import PageFormLayout from '@/components/layout/PageFormLayout';


function Contact() {


  return (
      <PageFormLayout>
      <ContactForm className={'bg-light rounded p-4 p-md-5 mx-auto'} style={{maxWidth: 500}}>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 m-0">
            Contacto
          </h1>
        </div>
      </ContactForm>
    </PageFormLayout>
  );
}

export default Contact;
