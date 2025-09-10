import React, { useState, useEffect } from 'react';
import bg from "./SHE_BG.jpg";

// Main App component - Fixed: Component name starts with uppercase letter
const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

   const bgStyle = {
    height: "100vh",
    backgroundImage: `url("/bg.jpg")`, // if image is in public folder
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };


  const styles = {
    container: {
      backgroundColor: '#1a1a1a', // Dark theme background
      color: '#fff', // White font color for contrast
      fontFamily: 'sans-serif',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#000', // Black navbar background
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 10,
    },
    navButtons: {
      display: 'flex',
      gap: '1rem',
    },
    button: {
      backgroundColor: '#54ccfbff', // Light blue buttons
      color: '#000', // Black text on buttons
      border: '2px solid #87CEEB',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#fff',
      color: '#000',
    },
    heroSection: {
      position: 'relative',
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden',
   backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
      
    },
    heroImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'blur(10%)', // Blur the image
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: 'rgba(0, 0, 0, 0.4)', // Darker semi-transparent overlay
    },
    heading: {
      fontSize: windowWidth < 768 ? '3rem' : '5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#fff', // White heading text
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    },
    tagline: {
      fontSize: windowWidth < 768 ? '1rem' : '1.5rem',
      maxWidth: '600px',
      fontStyle: 'italic',
      textAlign: 'center',
      color: '#fff', // White tagline text
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    },
 
    

    


  };

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>SHE</div>
        <div style={styles.navButtons}>
          <button style={styles.button}>Login as Retailer</button>
          <button style={styles.button}>Login as Admin</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={styles.heroSection}>
        <img
          alt="A group of diverse women advocating for safety"
          style={styles.heroImage}
        />
        <div style={styles.heroOverlay}>
          <h1 style={styles.heading}>SHE</h1>
          <p style={styles.tagline}>
            Our website is dedicated to women's safety, providing a secure and supportive platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home; // Fixed: Exporting 'Home' instead of 'home'