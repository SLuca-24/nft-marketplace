import React, { useState } from 'react';
import '../styles/ownerInfo.scss';

const Home3 = () => {


  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <div className="about-section">
        <h1>Demetra Collection</h1>
        <h2>A unique fusion of art and sustainable footwear</h2>
        <h3>Discover who's the mind behind and his vision</h3>
        <div className="creator-info">
          <div className="buttons">
            <button
              className="toggle-button-luca"
              onClick={() => window.open('https://sluca-24.github.io/', '_blank')}
            >
              Luca Sannia
            </button>
            <button className="toggle-button2" onClick={toggleDetails}>
              {showDetails ? 'Show Less' : 'Learn More'}
            </button>
            
          </div>
        </div>
        {showDetails && (
          <div className="detailed-info">
            <p>
              The artist draws inspiration from various sources, including nature, technology, and
              human emotion. Each NFT is meticulously crafted to evoke a response and foster a
              connection with the viewer. This collection aims to bridge the gap between the
              physical and digital worlds, inviting collectors to become part of this innovative
              movement.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home3;
