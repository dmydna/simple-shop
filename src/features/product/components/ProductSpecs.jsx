import React, { useContext, useState } from "react";
import { Table, Button, Form, InputGroup } from "react-bootstrap";



function ProductSpecs({ producto, children }) {


  return (
    <>
      {children}

      <Table style={{ overflowX: 'hidden' }} className="small border rounded" striped hover>

        <tbody className="rounded">
          <tr className="border-0">
            <td className="fw-medium border-0">Brand</td>
            <td className="fw-medium text-secondary border-0">
              {producto.brand || ''}
            </td>
          </tr>


          <tr className="border-0">
            <td className="fw-medium border-0">Weight</td>
            <td className="fw-medium text-secondary border-0"> 
              {producto.weight || ''}kg 
            </td>
          </tr>
          <tr className="border-0">
            <td className="fw-medium border-0">Warranty</td>
            <td className="fw-medium text-secondary border-0"> 
              {producto.warrantyInformation || ''} 
            </td>
          </tr>
{/*          <tr className="border-0">
            <td className="fw-medium border-0">Return Policy</td>
            <td className="fw-medium text-secondary border-0"> 
              {producto.returnPolicy || ''} 
            </td>
          </tr>
          <tr className="border-0">
            <td className="fw-medium border-0">minimum Order</td>
            <td className="fw-medium text-secondary border-0"> 
              {producto.minimumOrderQuantity || ''} 
            </td>
          </tr>
          <tr className="border-0">
            <td className="fw-medium border-0">envio</td>
            <td className="fw-medium text-secondary border-0"> 
              {producto.shippingInformation || ''} 
            </td>
          </tr>*/}



        </tbody>
      </Table>

      <p className="fw-medium">dimensions</p>

      <Table style={{ overflowX: 'auto' }} className="small border rounded" striped hover>
        <tbody className="rounded">

          <tr className="border-0">
            <td className="fw-medium border-0">width</td>
            <td className="fw-medium text-secondary border-0">
              {producto.dimensions?.width || ''}cm 
            </td>
          </tr>
          <tr className="border-0">
            <td className="fw-medium border-0">height</td>
            <td className="fw-medium text-secondary border-0">
              {producto.dimensions?.height || ''}cm  
            </td>
          </tr>

          <tr className="border-0">
            <td className="fw-medium border-0">depth</td>
            <td className="fw-medium text-secondary border-0">
              {producto.dimensions?.depth || ''}cm 
            </td>
          </tr>

        </tbody>
      </Table>
    </>
    
  );
}

export default ProductSpecs;