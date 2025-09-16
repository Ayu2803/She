import React, { useState } from 'react';

// Mock data for demonstration
const mockData = {
  activeSOSAlerts: 12,
  registeredSuspects: 580,
  incidentReportsFiled: 235,
  unsafeAreas: 5,
  recentSOS: [
    { id: 1, location: '123 Main St, Anytown', status: 'Pending' },
    { id: 2, location: '456 Oak Ave, Anycity', status: 'Resolved' },
    { id: 3, location: '789 Pine Rd, Anytown', status: 'In Progress' },
  ],
  recentReports: [
    { id: 1, title: 'Robbery at City Bank', date: '2025-09-08' },
    { id: 2, title: 'Traffic Accident on Highway 1', date: '2025-09-07' },
  ],
  safetyNotices: [
    { id: 1, title: 'Severe Weather Warning', date: '2025-09-10' },
    { id: 2, title: 'Community Watch Meeting', date: '2025-09-05' },
  ],
};

const PoliceDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  // Color palette
  const mainBgColor = '#1A202C'; // Main dark background
  const cardBgColor = '#2D3748'; // Card background
  const textColor = '#ffffffff'; // Light text
  const primaryColor = '#00BFFF'; // Vibrant blue for accents

  const styles = {
    dashboardContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '120vh',
      backgroundColor: mainBgColor,
      color: textColor,
      fontFamily: 'Arial, sans-serif',
    },
    topNavbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 40px',
      backgroundColor: '#000000',
      boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
      zIndex: 10,
      height: '90px',
    },
    navTitle: {
      fontSize: '50px',
      fontWeight: 'bold',
      color: primaryColor,
      marginLeft: '37%',
    },
    mainLayout: {
      display: 'flex',
      flexGrow: 1,
    },
    sideNav: {
      width: '250px',
      backgroundColor: cardBgColor,
      padding: '20px 0',
      boxShadow: '2px 0 5px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
    },
    navList: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      marginTop: '20%',
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '15px 20px',
      marginBottom: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      fontSize: '16px',
    },
    navItemActive: {
      backgroundColor: primaryColor,
      color: 'white',
      fontWeight: 'bold',
    },
    mainContentArea: {
      flexGrow: 1,
      padding: '40px',
      overflowY: 'auto',
    },
    // Card styles
    cardContainer: {
      display: 'flex',
      gap: '20px',
      marginBottom: '40px',
      flexWrap: 'wrap',
    },
    card: {
      flex: 1,
      minWidth: '200px',
      backgroundColor: cardBgColor,
      padding: '25px',
      borderRadius: '10px',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    },
    cardTitle: {
      fontSize: '16px',
      color: primaryColor,
      marginBottom: '10px',
    },
    cardValue: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: 'white',
    },
    // Section styles
    section: {
      backgroundColor: cardBgColor,
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      marginBottom: '30px',
    },
    sectionTitle: {
      fontSize: '24px',
      color: primaryColor,
      marginBottom: '20px',
      fontWeight: 'bold',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
    },
    listItem: {
      padding: '10px 0',
      borderBottom: `1px solid ${primaryColor}`,
      '&:last-child': {
        borderBottom: 'none',
      },
    },
  };

  const menuItems = ['Dashboard', 'SOS Alerts', 'Suspect Database', 'Incident Reports', 'Safety Notices', 'Analytics'];

  const renderContent = () => {
    switch (activeMenu) {
      case 'Dashboard':
        return (
          <>
            <div style={styles.cardContainer}>
              <div style={styles.card}>
                <div style={styles.cardTitle}>Active SOS Alerts</div>
                <div style={styles.cardValue}>{mockData.activeSOSAlerts}</div>
              </div>
              <div style={styles.card}>
                <div style={styles.cardTitle}>Registered Suspects</div>
                <div style={styles.cardValue}>{mockData.registeredSuspects}</div>
              </div>
              <div style={styles.card}>
                <div style={styles.cardTitle}>Incident Reports Filed</div>
                <div style={styles.cardValue}>{mockData.incidentReportsFiled}</div>
              </div>
              <div style={styles.card}>
                <div style={styles.cardTitle}>Unsafe Areas Detected</div>
                <div style={styles.cardValue}>{mockData.unsafeAreas}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ ...styles.section, flex: 1 }}>
                <div style={styles.sectionTitle}>Recent SOS Alerts</div>
                <ul style={styles.list}>
                  {mockData.recentSOS.map(alert => (
                    <li key={alert.id} style={styles.listItem}>
                      Location: {alert.location} | Status: {alert.status}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ ...styles.section, flex: 1 }}>
                <div style={styles.sectionTitle}>Map Widget</div>
                <p>
                  
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ ...styles.section, flex: 1 }}>
                <div style={styles.sectionTitle}>Recent Incident Reports</div>
                <ul style={styles.list}>
                  {mockData.recentReports.map(report => (
                    <li key={report.id} style={styles.listItem}>
                      {report.title} ({report.date})
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ ...styles.section, flex: 1 }}>
                <div style={styles.sectionTitle}>Safety Notices</div>
                <ul style={styles.list}>
                  {mockData.safetyNotices.map(notice => (
                    <li key={notice.id} style={styles.listItem}>
                      {notice.title} ({notice.date})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        );
      case 'SOS Alerts':
        return <div style={styles.section}><div style={styles.sectionTitle}>SOS Alerts Module</div><p>Detailed view of all SOS alerts.</p></div>;
      case 'Suspect Database':
        return <div style={styles.section}><div style={styles.sectionTitle}>Suspect Database Module</div><p>Search and manage suspect information.</p></div>;
      case 'Incident Reports':
        return <div style={styles.section}><div style={styles.sectionTitle}>Incident Reports Module</div><p>File and review incident reports.</p></div>;
      case 'Safety Notices':
        return <div style={styles.section}><div style={styles.sectionTitle}>Safety Notices Module</div><p>Create and broadcast safety notices.</p></div>;
      case 'Analytics':
        return <div style={styles.section}><div style={styles.sectionTitle}>Analytics Module</div><p>View crime trends and other statistics.</p></div>;
      default:
        return null;
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.topNavbar}>
        <div style={styles.navTitle}>Police Dashboard</div>
        {/* You can add user profile, logout, etc. here */}
      </div>
      <div style={styles.mainLayout}>
        <div style={styles.sideNav}>
          <ul style={styles.navList}>
            {menuItems.map((item) => (
              <li
                key={item}
                style={{
                  ...styles.navItem,
                  ...(activeMenu === item ? styles.navItemActive : {}),
                }}
                onClick={() => setActiveMenu(item)}
              >
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={styles.mainContentArea}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PoliceDashboard;