import React, { useContext, useState } from "react";
import {Table, Button, Form, InputGroup } from "react-bootstrap";



function ProductSpecs({producto, children}) {


  return (
    <>
    {children}
    <Table striped hover rounded>
      <tbody className="rounded">
        <tr className="border-0">
          <td className="fw-medium border-0">Brand</td>
          <td  className="fw-medium text-secondary border-0">
            {producto.brand || 'N/A'}
          </td>
        </tr>
        <tr className="border-0">
          <td  className="fw-medium border-0">Dimensions</td>
          <td  className="fw-medium text-secondary border-0">
            {producto.dimensions?.width || 'N/A'} x {'  '}
            {producto.dimensions?.height || 'N/A'} x {'  '}
            {producto.dimensions?.depth || 'N/A'} 
          </td>
        </tr>
        <tr className="border-0">
          <td className="fw-medium border-0">Weight</td>
          <td  className="fw-medium text-secondary border-0"> 
            {producto.weight || 'N/A'} 
          </td>
        </tr>
        <tr className="border-0">
          <td className="fw-medium border-0">Warranty Information</td>
          <td  className="fw-medium text-secondary border-0"> 
            {producto.warrantyInformation || 'N/A'} 
          </td>
        </tr>
        
      </tbody>
    </Table>
    </>
    
  );
}

export default ProductSpecs;