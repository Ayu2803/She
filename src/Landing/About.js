import React, { useState, useEffect } from 'react';
import bg from "./SOS.png";

// Main AboutPage component
const AboutPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Directly use the image URL from the upload
  const sosImageUrl = "uploaded:SOS.jpg-dba7f6f0-d913-4fce-89b2-a613ec450710";

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

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 1)', // A dark, cohesive background color
      color: '#fff',
      fontFamily: 'sans-serif',
      padding: windowWidth < 768 ? '2rem 1rem' : '4rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    //   marginTop:'1%'
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: windowWidth < 768 ? 'column' : 'row',
      alignItems: 'center',
      gap: windowWidth < 768 ? '2rem' : '4rem',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'rgba(71, 196, 249, 0.57)',
      borderRadius: '20px',
      padding: windowWidth < 768 ? '1.5rem' : '3rem',
    },
    imageContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
    //   maxWidth: '50%',
      height: '400px',
      borderRadius: '15px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.5)',
    },
    textContainer: {
      flex: 1,
      textAlign: 'left',
      padding: windowWidth < 768 ? '0' : '0 2rem',
    },
    heading: {
      fontSize: windowWidth < 768 ? '2rem' : '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
      color: '#000000db', // A light blue to match the theme
    },
    paragraph: {
      fontSize: windowWidth < 768 ? '1rem' : '1.2rem',
      lineHeight: '1.6',
      marginBottom: '1.5rem',
      color: '#E0E0E0',
    },
    highlight: {
      fontWeight: 'bold',
      color: '#54ccfbff',
    },
    title: {
      fontSize: windowWidth < 768 ? '1.5rem' : '2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#fff',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Left-side image */}
        <div style={styles.imageContainer}>
          <img
            src={bg}
            alt="She SOS device"
            style={styles.image}
          />
        </div>

        {/* Right-side content */}
        <div style={styles.textContainer}>
          <h1 style={styles.heading}>Introducing "She": Your Personal Guardian</h1>
          <p style={styles.paragraph}>
            In today's world, feeling safe is paramount. We developed <span style={styles.highlight}>She</span> as a powerful yet discreet personal safety device, designed to empower women and provide peace of mind. She isn't just a gadget; it's a lifeline.
          </p>
          <p style={styles.paragraph}>
            With a single, prominent red SOS button, our device simplifies emergency response. In a critical moment, simply pressing the button or even shouting "help" will activate the device's intelligent alert system.
          </p>
          <p style={styles.paragraph}>
            Once triggered, She instantly broadcasts your precise GPS coordinates to the nearest police station. Simultaneously, it sends a real-time alert to the people you trust most, including family and friends, ensuring they are immediately aware of your situation and location.
          </p>
          <p style={styles.paragraph}>
            This two-pronged approach ensures that help is on its way from both official channels and your personal network, maximizing the speed and effectiveness of the response. With <span style={styles.highlight}>She</span>, you're never truly alone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
