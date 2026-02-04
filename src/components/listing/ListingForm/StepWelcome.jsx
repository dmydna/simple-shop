import React from "react";
import { CRUD } from "../../../utils/crud.js";
import Img3 from '../../../assets/edit.png';
import Img0 from '../../../assets/message.png';

function StepWelcome({ mode }) {


  return (
    <>
      {mode && mode == CRUD.CREATE && (
        <div
          className="w-100 pb-5 bg-listing-welcome"
          style={{ minHeight: '400px', backgroundImage: `url(${Img0})` }} >
          <p className="fs-4 mb-4">
            Crear publicacion
          </p>
          <p
            style={{ opacity: '.5' }}
            className="mt-4 mb-5 bg-white">
            Puedes crear una publicacion rapidamente
            usando el <b>mismo producto</b> de otra o
            creando un nuevo producto
          </p>
        </div>
      )}
      {mode && mode == CRUD.UPDATE && (
        <div className="w-100 pb-5 bg-listing-welcome"
          style={{ minHeight: '400px', backgroundImage: `url(${Img3})` }}>
          <div>
            <p className="fs-3 mb-4">
              Editar publicacion
            </p>
            <p 
              style={{ opacity: '.5' }}
              className="mt-4 mb-5 bg-white">
              Puedes <b>editar</b> rapidamente una publicacion presionando el boton
              <i className="bi bi-pencil"></i> de los campos.
            </p>
          </div>
        </div>
      )}

    </>
  )
}


export default StepWelcome;