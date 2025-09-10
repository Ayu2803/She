import React, { useState } from 'react';

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

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        width: '100%',
        maxWidth: '32rem'
      }}>
        <h1 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#1f2937',
          marginBottom: '0.5rem'
        }}>Add New Customer</h1>
        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.25rem'
                }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#f9fafb',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    outline: 'none',
                    transition: 'all 150ms ease-in-out'
                  }}
                />
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#2563eb',
                color: 'white',
                fontWeight: '600',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                outline: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 150ms ease-in-out',
                transform: 'scale(1)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#1d4ed8';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'scale(1)';
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.5)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              }}
            >
              Add Customer
            </button>
          </div>
        </form>

        {message && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: isSuccess ? '#dcfce7' : '#fee2e2',
            color: isSuccess ? '#166534' : '#b91c1c'
          }}>
            <p style={{ fontWeight: '500', textAlign: 'center' }}>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customer;