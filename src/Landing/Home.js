import React, { useState, useEffect } from 'react';
import bg from "./SHE_BG.jpg";
import About from "./About";
import { Link } from "react-router-dom";

const Home = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
     
  const styles = {
    // Main container for the whole page
    mainContainer: {
      fontFamily: 'sans-serif',
      color: '#fff',
    },
    
    // Navbar styling
    navbarContainer: {
      backgroundColor: 'rgba(1, 1, 28, 0.98)',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 10,
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      height: '80px',
    },
    navButtons: {
      display: 'flex',
      gap: '1rem',
    },
    button: {
      backgroundColor: '#54ccfbff',
      color: '#000',
      border: '2px solid #54ccfbff',
      padding: '0.75rem 1.5rem',
      borderRadius: '25px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    
    // Hero section with the background image
    heroSection: {
      height: '100vh',
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
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
      // Dark semi-transparent overlay to make text more readable
      backgroundColor: 'rgba(1, 41, 58, 0.42)', 
    },
    heading: {
      fontSize: windowWidth < 768 ? '3rem' : '5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#fff',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
      
    },
    tagline: {
      fontSize: windowWidth < 768 ? '1rem' : '1.5rem',
      maxWidth: '600px',
      fontStyle: 'italic',
      textAlign: 'center',
      color: '#fff',
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    },
  };

  return (
    <>
    <div style={styles.mainContainer}>
      {/* Navigation Bar Section - Now separate from background */}
      <div style={styles.navbarContainer}>
        <nav style={styles.navbar}>
          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '60px' }}>SHE</div>
          <div style={styles.navButtons}>

            <Link to = "/AdminLogin">
            <button style={styles.button}>Login as Retailer</button>
            </Link>

            <Link to = "/RetailerLogin">
            <button style={styles.button}>Login as Admin</button>
            </Link>
            
          </div>
        </nav>
      </div>

      {/* Hero Section with Background Image - Now separate from navbar */}
      <div style={styles.heroSection}>
        <div style={styles.heroOverlay}>
          <h1 style={styles.heading}>SHE</h1>
          <p style={styles.tagline}>
            Our website is dedicated to women's safety, providing a secure and supportive platform.
          </p>
        </div>
      </div>

    </div>

      <About/>

  </>
  );
};

export default Home;