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

// Bar chart data
const barChartData = [
  { month: 'Jan', sales: 1200, target: 1000 },
  { month: 'Feb', sales: 1800, target: 1500 },
  { month: 'Mar', sales: 1500, target: 1600 },
  { month: 'Apr', sales: 2200, target: 1800 },
  { month: 'May', sales: 2800, target: 2500 },
  { month: 'Jun', sales: 3400, target: 3000 },
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

// Custom Bar Chart Component
const CustomBarChart = ({ data, width = 500, height = 300 }) => {
  const maxValue = Math.max(...data.map(item => Math.max(item.sales, item.target)));
  const barWidth = (width - 100) / data.length / 2;
  const spacing = barWidth * 0.5;
  const chartHeight = height - 50;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Y-axis labels */}
      {[0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue].map((value, index) => (
        <g key={index}>
          <line 
            x1="40" 
            y1={chartHeight - (value / maxValue) * chartHeight + 20} 
            x2={width} 
            y2={chartHeight - (value / maxValue) * chartHeight + 20} 
            stroke="#4A5568" 
            strokeWidth="0.5" 
            strokeDasharray="2,2"
          />
          <text 
            x="35" 
            y={chartHeight - (value / maxValue) * chartHeight + 20} 
            textAnchor="end" 
            dy="0.3em" 
            fontSize="10" 
            fill="#CBD5E0"
          >
            ${value.toLocaleString()}
          </text>
        </g>
      ))}

      {/* Bars */}
      {data.map((item, index) => {
        const salesBarHeight = (item.sales / maxValue) * chartHeight;
        const targetBarHeight = (item.target / maxValue) * chartHeight;
        const xPosition = 60 + index * (barWidth * 2 + spacing);

        return (
          <g key={index}>
            {/* Sales Bar */}
            <rect
              x={xPosition}
              y={chartHeight - salesBarHeight + 20}
              width={barWidth}
              height={salesBarHeight}
              fill="#00BFFF"
              rx="2"
            />
            {/* Target Bar */}
            <rect
              x={xPosition + barWidth + 2}
              y={chartHeight - targetBarHeight + 20}
              width={barWidth}
              height={targetBarHeight}
              fill="#FFC107"
              rx="2"
            />
            {/* Month Label */}
            <text
              x={xPosition + barWidth}
              y={chartHeight + 35}
              textAnchor="middle"
              fontSize="10"
              fill="#CBD5E0"
            >
              {item.month}
            </text>
          </g>
        );
      })}

      {/* X-axis */}
      <line 
        x1="40" 
        y1={chartHeight + 20} 
        x2={width} 
        y2={chartHeight + 20} 
        stroke="#4A5568" 
        strokeWidth="1" 
      />

      {/* Y-axis */}
      <line 
        x1="40" 
        y1="20" 
        x2="40" 
        y2={chartHeight + 20} 
        stroke="#4A5568" 
        strokeWidth="1" 
      />

      {/* Legend */}
      <g>
        <rect x={width - 150} y="10" width="12" height="12" fill="#00BFFF" rx="2" />
        <text x={width - 130} y="20" fontSize="12" fill="#CBD5E0">Sales</text>
        
        <rect x={width - 150} y="30" width="12" height="12" fill="#FFC107" rx="2" />
        <text x={width - 130} y="40" fontSize="12" fill="#CBD5E0">Target</text>
      </g>
    </svg>
  );
};

const AdminDashboard = () => {
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Fetch retailers from Firestore
  const fetchRetailers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'retailers'));
      const retailersData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        retailersData.push({ 
          id: doc.id, 
          name: data.retailerName || 'N/A',
          address: data.retailerAddress || 'N/A',
          retailerId: data.retailerId || 'N/A',
          phone: data.phoneNo || 'N/A',
          productId: data.productId || 'N/A'
        });
      });
      setRetailers(retailersData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching retailers: ', error);
      setMessage('Error fetching retailers data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRetailers();
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddRetailer = () => {
    showMessage('Add New Retailer button clicked!');
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
      backgroundColor: '#000000',
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
    addRetailerButton: {
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
    chartContainer: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      overflowX: 'auto',
    },
    chartGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem',
      width: '100%',
      marginTop: '1rem',
    },
    chartBox: {
      backgroundColor: '#2D3748',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    chartTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#E2E8F0',
      marginBottom: '1rem',
    },
    chartSubtitle: {
      fontSize: '0.9rem',
      color: '#CBD5E0',
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    pieChartContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    pieChartLegend: {
      marginLeft: '2rem',
    },
    pieLegendItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.5rem',
    },
    pieLegendColor: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      marginRight: '0.5rem',
    },
    pieLegendText: {
      fontSize: '0.9rem',
      color: '#CBD5E0',
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
        <h1 style={styles.navTitle}>Admin Panel</h1>
      </div>
      
      {/* Main Dashboard Grid */}
      <div style={styles.dashboardGrid}>
        
        {/* Total Products Card */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Products</h3>
          <p style={styles.cardValue}>{salesData.length}</p>
        </div>
        
        {/* Total Retailers Card */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Retailers</h3>
          <p style={styles.cardValue}>{retailers.length}</p>
        </div>

        {/* Monthly Performance Card */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Monthly Performance</h3>
          <p style={styles.cardValue}>+24.5%</p>
        </div>

        {/* Combined Charts Card */}
        <div style={{...styles.card, ...styles.chartCard}}>
          <h2 style={styles.cardTitle}>Sales Analytics</h2>
          <div style={styles.chartGrid}>
            {/* Product Sale Analysis */}
            <div style={styles.chartBox}>
              <h3 style={styles.chartTitle}>Product Sales Distribution</h3>
              <p style={styles.chartSubtitle}>Breakdown of sales by product category</p>
              <div style={styles.pieChartContainer}>
                <CustomPieChart data={salesData} width={250} height={250} />
                <div style={styles.pieChartLegend}>
                  {salesData.map((entry, index) => (
                    <div key={index} style={styles.pieLegendItem}>
                      <div style={{...styles.pieLegendColor, backgroundColor: entry.color}}></div>
                      <span style={styles.pieLegendText}>{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sales Trend Analysis */}
            <div style={styles.chartBox}>
              <h3 style={styles.chartTitle}>Monthly Sales vs Target</h3>
              <p style={styles.chartSubtitle}>Comparison of actual sales against targets</p>
              <div style={styles.chartContainer}>
                <CustomBarChart data={barChartData} width={500} height={300} />
              </div>
            </div>
          </div>
        </div>

        {/* Retailers Table */}
        <div style={{...styles.card, ...styles.tableCard}}>
            <div style={styles.tableTitleContainer}>
              <h2 style={styles.tableTitle}>Retailer List</h2>

             <Link to="/AddRetailer">
              <button style={styles.addRetailerButton} onClick={handleAddRetailer}>
                Add New Retailer
              </button>
             </Link>

            </div>
            
            {loading ? (
              <p style={styles.loadingText}>Loading retailers...</p>
            ) : (
              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead style={styles.tableHeader}>
                    <tr>
                      <th style={styles.tableHeaderCell}>Retailer ID</th>
                      <th style={styles.tableHeaderCell}>Retailer Name</th>
                      <th style={styles.tableHeaderCell}>Address</th>
                      <th style={styles.tableHeaderCell}>Phone Number</th>
                      <th style={styles.tableHeaderCell}>Product ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retailers.map((retailer) => (
                      <tr key={retailer.id} style={styles.tableRow}>
                        <td style={{...styles.tableCell, fontWeight: '500'}}>{retailer.retailerId}</td>
                        <td style={styles.tableCell}>{retailer.name}</td>
                        <td style={styles.tableCell}>{retailer.address}</td>
                        <td style={styles.tableCell}>{retailer.phone}</td>
                        <td style={styles.tableCell}>{retailer.productId}</td>
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

export default AdminDashboard;