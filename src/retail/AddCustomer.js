import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

// Main App Component
const Customer = () => {
  const [formData, setFormData] = useState({
    productId: '',
    retailerId: '',
    customerName: '',
    adhaarNo: '',
    customerAddress: '',
    phoneNo: ''
  });

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // Log the form data to the console instead of saving to a database
      console.log('Form data submitted:', formData);

      setMessage('Customer added successfully!');
      setIsSuccess(true);
      setFormData({
        productId: '',
        retailerId: '',
        customerName: '',
        adhaarNo: '',
        customerAddress: '',
        phoneNo: ''
      });
    } catch (error) {
      console.error('Error adding customer:', error);
      setMessage('Failed to add customer. Please try again.');
      setIsSuccess(false);
    }
  };

  const fields = [
    { label: "Product ID", name: "productId", type: "text" },
    { label: "Retailer ID", name: "retailerId", type: "text" },
    { label: "Customer's Name", name: "customerName", type: "text" },
    { label: "Aadhaar No.", name: "adhaarNo", type: "text" },
    { label: "Customer's Address", name: "customerAddress", type: "text" },
    { label: "Phone No.", name: "phoneNo", type: "tel" }
  ];

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: '1rem',
  };

  const cardStyle = {
    backgroundColor: 'rgba(0, 11, 15, 1)',
    // paddingLeft: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    width: '700px',
    height: '200px,'
    // maxWidth: '32rem',
  };

  const headingStyle = {
    fontSize: '40px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#84dbf7ff',
    marginBottom: '0.5rem',
  };

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem',
    marginTop: '5%',
  };

  const inputContainerStyle = {
    // marginBottom: '0.25rem',
    // marginTop: '3%',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#ffffffff',
    marginLeft: '15%',
  };

  const inputStyle = {
    marginTop: '0.25rem',
    display: 'block',
    width: '450px',
    marginLeft: '15%',
    padding: '0.5rem 1rem',
    backgroundColor: '#ffffffff',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    transition: 'all 0.15s ease-in-out',
    outline: 'none',
  };

  const buttonContainerStyle = {
    marginTop: '3rem',
    width: '250px',
    marginLeft: '31%',
    paddingBottom: '8%',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#84dbf7ff',
    color: 'black',
    fontWeight: '600',
    fontSize: '20px',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: 'all 0.15s ease-in-out',
    transform: 'scale(1)',
    cursor: 'pointer',
    border: 'none',
  };

  const messageStyle = {
    marginTop: '1.5rem',
    padding: '1rem',
    borderRadius: '0.5rem',
    textAlign: 'center',
    fontWeight: '500',
  };

  const dynamicMessageStyle = isSuccess
    ? { backgroundColor: '#d1fae5', color: '#065f46' }
    : { backgroundColor: '#fee2e2', color: '#991b1b' };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Add New Customer</h1>
        <form onSubmit={handleSubmit}>
          <div style={formGridStyle}>
            {fields.map((field) => (
              <div key={field.name} style={inputContainerStyle}>
                <label htmlFor={field.name} style={labelStyle}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>
            ))}
          </div>

          <div style={buttonContainerStyle}>
            <button type="submit" style={buttonStyle}>
              Add Customer
            </button>
          </div>
        </form>

        {message && (
          <div style={{ ...messageStyle, ...dynamicMessageStyle }}>
            <p style={{ fontWeight: '500', textAlign: 'center' }}>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customer;
