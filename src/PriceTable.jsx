import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import './App.css';
import Spinner from 'react-bootstrap/Spinner'

function PriceTable() {
  const [formData, setFormData] = useState({
    price: 0,
    quantity:0,
    discount: 0,
    discountPercentage: 0,
    tax: 0,
    taxPercentage: 0,
    totalPrice: 0,
  });

  const [tableData, setTableData] = useState([]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateTotalPrice = () => {
    const price = parseFloat(formData.price);
    const quantity = formData.quantity;
    const discount = parseFloat(formData.discount);
    const discountPercentage = parseFloat(formData.discountPercentage);
    const tax = parseFloat(formData.tax);
    const taxPercentage = parseFloat(formData.taxPercentage);

    const discountAmount = discountPercentage
      ? (price * discountPercentage) / 100
      : discount;

    const priceAfterDiscount = price - discountAmount;

    const taxAmount = taxPercentage
      ? ((priceAfterDiscount * taxPercentage) / 100)
      : tax;

    const totalPrice = (priceAfterDiscount + taxAmount)*quantity;

    setFormData({
      ...formData,
      discount: discountAmount,
      tax: taxAmount,
      totalPrice: totalPrice,
    });
  };

  const handleQuantityChange = (event) => {
    const target = event.target;
    const value = target.value;

    
      setFormData({
        ...formData,
        quantity:value,
        
      });
      
   
  };


  const handleDiscountChange = (event) => {
    const target = event.target;
    const value = parseFloat(target.value);

    if (target.name === "discountPercentage") {
      setFormData({
        ...formData,
        discountPercentage: value,
        discount: ((value / 100) * formData.price),
      });
    } else {
      setFormData({
        ...formData,
        discount: value,
        discountPercentage: ((value / formData.price) * 100),
      });
    }
  };

  const handleTaxChange = (event) => {
    const target = event.target;
    const value = parseFloat(target.value);

    if (target.name === "taxPercentage") {
      setFormData({
        ...formData,
        taxPercentage: value,
        tax: ((value / 100) * formData.price),
      });
    } else {
      setFormData({
        ...formData,
        tax: value,
        taxPercentage: ((value / formData.price) * 100),
      });
    }
  };

  const handleAddRow = () => {

    setTableData([...tableData, formData]);
    setFormData({
        price: 0,
    quantity:0,
    discount: 0,
    discountPercentage: 0,
    tax: 0,
    taxPercentage: 0,
    totalPrice: 0,
    })
  };

  const handleTableChange = (event, rowIndex, columnName) => {
    const value = event.target.value;

    const newData = tableData.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...row,
          [columnName]: value,
        };
      }
      return row;
    });

    setTableData(newData);
  };

  return (
    <Container className="p8">
        <div className="typebox">
        <h1  className="typewriter">Invoice Generator</h1>
        </div>
      <Form>
      <Table size="sm">
        <tr>
        <td md={{ span: 3 }}> 
        <Form.Label >
          Price:</Form.Label>
          </td>
          <td className="maintd">
           <Form.Control  
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            onKeyUp={calculateTotalPrice}
            className="col-sm-4 inline-block w-90" xs={2} md={2} lg={2}
          />
       </td>
        </tr>
        <br />
        <tr>
        <td>
        <Form.Label >
          Quantity:</Form.Label>
          </td>
          <td className="maintd">
           <Form.Control 
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleQuantityChange}
            onKeyUp={calculateTotalPrice}
            className="col-sm-4 inline-block w-90"
            />
         </td>
          </tr>
        <br />
        <tr>
        <td>
        <Form.Label >
          Discount:</Form.Label>
          </td>
          <td className="maintd">
           <Form.Control 
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleDiscountChange}
            onKeyUp={calculateTotalPrice}
            className="col-sm-4 inline-block w-90"
            />
         </td>
          </tr>
        <br />
        <tr>
        <td>
        <Form.Label >
          Discount Percentage:</Form.Label>
          </td>
          <td className="maintd">
           <Form.Control 
            type="number"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleDiscountChange}
            onKeyUp={calculateTotalPrice}
            className="col-sm-4 inline-block w-90"
            />
         </td>
          </tr>
            <br />
            <tr>
        <td>
        <Form.Label >
          Tax:</Form.Label>
          </td>
          <td className="maintd">
           <Form.Control 
                     type="number"
                     name="tax"
                     value={formData.tax}
                     onChange={handleTaxChange}
                     onKeyUp={calculateTotalPrice}
                     className="col-sm-4 inline-block w-90"
                     />
                  </td>
                   </tr>
            <br />
            <tr>
        <td>
        <Form.Label >
          Tax Percentage:</Form.Label>
          </td>
          <td className="maintd">
           <Form.Control 
                     type="number"
                     name="taxPercentage"
                     value={formData.taxPercentage}
                     onChange={handleTaxChange}
                     onKeyUp={calculateTotalPrice}
                     className="col-sm-4 inline-block w-90"
                     />
                  </td>
                   </tr>
            <br />
            <tr>
        <td>
        <Form.Label >
          Tax Percentage:</Form.Label>
          </td>
          <td className="maintd">
           <Form.Control 
            type="number" name="totalPrice" value={formData.totalPrice} readOnly className="col-sm-4 inline-block w-90"/>
         </td>
          </tr>
            </Table>
            </Form>
            <br />
            <Button type="button" onClick={handleAddRow}><Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
          className="spinner"
        />   
            Add to table
            </Button>
            <br />
            
            <br />
            <Table striped bordered hover size="sm">
            <thead>
            <tr>
            <th>Price</th>
            <th>Quantity</th>
            <th>Discount</th>
            <th>Discount Percentage</th>
            <th>Tax</th>
            <th>Tax Percentage</th>
            <th>Total Price</th>
            </tr>
            </thead>
            <tbody>
            {tableData.map((row, index) => (
            <tr key={index}>
            <td>
            <input
            type="number"
            name="price"
            value={row.price}
            onChange={(e) => handleTableChange(e, index, "price")}
            />
            </td>
            <td>
            <input
            type="number"
            name="quantity"
            value={row.quantity}
            onChange={(e) => handleTableChange(e, index, "quantity")}
            />
            </td>
            <td>
            <input
            type="number"
            name="discount"
            value={row.discount}
            onChange={(e) => handleTableChange(e, index, "discount")}
            />
            </td>
            <td>
            <input
            type="number"
            name="discountPercentage"
            value={row.discountPercentage}
            onChange={(e) =>
            handleTableChange(e, index, "discountPercentage")
            }
            />
            </td>
            <td>
            <input
            type="number"
            name="tax"
            value={row.tax}
            onChange={(e) => handleTableChange(e, index, "tax")}
            />
            </td>
            <td>
            <input
            type="number"
            name="taxPercentage"
            value={row.taxPercentage}
            onChange={(e) =>
            handleTableChange(e, index, "taxPercentage")
            }
            />
            </td>
            <td>
            <input
                           type="number"
                           name="totalPrice"
                           value={row.totalPrice}
                           readOnly
                         />
            </td>
            </tr>
            ))}
            </tbody>
            </Table>
            </Container>
            );
            }
            
            export default PriceTable;
