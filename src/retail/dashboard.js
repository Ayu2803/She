import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the path to your firebase config

// Pie chart data and colors
const salesData = [
  { name: 'Product A', value: 400, color: '#4CAF50' },
  { name: 'Product B', value: 300, color: '#2196F3' },
  { name: 'Product C', value: 300, color: '#FFC107' },
  { name: 'Product D', value: 200, color: '#F44336' },
];

// Custom Pie Chart Component
const CustomPieChart = ({ data, width = 300, height = 300 }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  return (
    <svg width={width} height={height} viewBox="0 0 100 100">
      {data.map((item, index) => {
        const percentage = (item.value / total) * 100;
        const circumference = 2 * Math.PI * 40; // Radius of 40
        const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
        const rotation = cumulativePercentage * 3.6;
        
        cumulativePercentage += percentage;
        
        return (
          <circle
            key={index}
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke={item.color}
            strokeWidth="20"
            strokeDasharray={strokeDasharray}
            transform={`rotate(${rotation - 90} 50 50)`}
          />
        );
      })}
      <circle cx="50" cy="50" r="30" fill="white" />
      <text x="50" y="50" textAnchor="middle" dy="0.3em" fontSize="12" fontWeight="bold">
        Total: ${total}
      </text>
    </svg>
  );
};

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch customers from Firestore
  const fetchCustomers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'customers'));
      const customersData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        customersData.push({ 
          id: doc.id, 
          name: data.customerName || 'N/A',
          productID: data.productId || 'N/A',
          phoneNumber: data.phoneNo || 'N/A',
          address: data.customerAddress || 'N/A'
        });
      });
      setCustomers(customersData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching customers: ', error);
      setMessage('Error fetching customers data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddCustomer = () => {
    showMessage('Add New Customer button clicked!');
  };

  // Calculate total sales
  const totalSales = salesData.reduce((sum, item) => sum + item.value, 0);

  // Inline styles
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#1A202C',
      color: '#E2E8F0',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      paddingBottom: '2rem',
    },
    navBar: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    navTitle: {
      fontSize: '2.5rem',
      fontWeight: '900',
      color: '#00BFFF',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    dashboardGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    card: {
      backgroundColor: '#2D3748',
      color: '#E2E8F0',
      padding: '1.5rem',
      borderRadius: '1rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      transition: 'transform 0.3s ease-in-out',
      position: 'relative',
    },
    cardTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#E2E8F0',
      marginBottom: '0.5rem',
    },
    cardValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#00BFFF',
    },
    chartCard: {
      gridColumn: '1 / -1',
    },
    button: {
      backgroundColor: '#00BFFF',
      color: '#000000',
      fontWeight: '600',
      padding: '0.75rem 2rem',
      borderRadius: '25px',
      boxShadow: '0 4px 15px rgba(0, 191, 255, 0.4)',
      border: 'none',
      cursor: 'pointer',
      marginTop: '1.5rem',
      transition: 'background-color 0.2s ease-in-out',
    },
    tableCard: {
      gridColumn: '1 / -1',
      marginTop: '2rem',
    },
    tableTitleContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1rem',
    },
    tableTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#E2E8F0',
      textAlign: 'center',
    },
    addCustomerButton: {
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      backgroundColor: '#00BFFF',
      color: '#000000',
      border: 'none',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 2px 5px rgba(0, 191, 255, 0.2)',
      transition: 'transform 0.2s ease-in-out',
    },
    tableContainer: {
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0 0.5rem',
    },
    tableHeader: {
      backgroundColor: '#4A5568',
      borderRadius: '8px',
    },
    tableHeaderCell: {
      padding: '1rem 1.5rem',
      textAlign: 'left',
      fontSize: '0.8rem',
      fontWeight: '700',
      color: '#CBD5E0',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    tableCell: {
      padding: '1rem 1.5rem',
      fontSize: '0.9rem',
      color: '#E2E8F0',
    },
    tableRow: {
      backgroundColor: '#2D3748',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
    },
    messageBox: {
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#333',
      color: 'white',
      padding: '15px 25px',
      borderRadius: '8px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      zIndex: 2000,
      opacity: message ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out',
    },
    loadingText: {
      textAlign: 'center',
      color: '#CBD5E0',
      fontSize: '1.2rem',
      padding: '2rem'
    }
  };

  return (
    <div style={styles.container}>
      {/* Top Navigation Bar */}
      <div style={styles.navBar}>
        <h1 style={styles.navTitle}>Retailer Panel</h1>
      </div>
      
      {/* Main Dashboard Grid */}
      <div style={styles.dashboardGrid}>
        
        {/* Total Sales Card */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Sales</h3>
          <p style={styles.cardValue}>${totalSales.toLocaleString()}</p>
        </div>

        {/* Total Products Card */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Products</h3>
          <p style={styles.cardValue}>{salesData.length}</p>
        </div>
        
        {/* Total Customers Card */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Customers</h3>
          <p style={styles.cardValue}>{customers.length}</p>
        </div>

        {/* Product Sale Analysis Card */}
        <div style={{...styles.card, ...styles.chartCard}}>
          <h2 style={styles.cardTitle}>Product Sale Analysis</h2>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
            <CustomPieChart data={salesData} width={250} height={250} />
            <div style={{marginLeft: '2rem'}}>
              {salesData.map((entry, index) => (
                <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '0.5rem'}}>
                  <div style={{width: '12px', height: '12px', borderRadius: '50%', backgroundColor: entry.color, marginRight: '0.5rem'}}></div>
                  <span style={{fontSize: '0.9rem', color: '#CBD5E0'}}>{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customers Table */}
        <div style={{...styles.card, ...styles.tableCard}}>
            <div style={styles.tableTitleContainer}>
              <h2 style={styles.tableTitle}>Customer List</h2>

              <Link to="/AddCustomer">
                <button style={styles.addCustomerButton} onClick={handleAddCustomer}>
                  Add New Customer
                </button>
              </Link>
            </div>
            
            {loading ? (
              <p style={styles.loadingText}>Loading customers...</p>
            ) : (
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead style={styles.tableHeader}>
                    <tr>
                      <th style={styles.tableHeaderCell}>Customer ID</th>
                      <th style={styles.tableHeaderCell}>Customer Name</th>
                      <th style={styles.tableHeaderCell}>Product ID</th>
                      <th style={styles.tableHeaderCell}>Phone Number</th>
                      <th style={styles.tableHeaderCell}>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} style={styles.tableRow}>
                        <td style={{...styles.tableCell, fontWeight: '500'}}>{customer.id}</td>
                        <td style={styles.tableCell}>{customer.name}</td>
                        <td style={styles.tableCell}>{customer.productID}</td>
                        <td style={styles.tableCell}>{customer.phoneNumber}</td>
                        <td style={styles.tableCell}>{customer.address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </div>
      
      {/* Custom Message Box */}
      {message && (
        <div style={styles.messageBox}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Dashboard;