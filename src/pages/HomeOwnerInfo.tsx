import React, { useState } from 'react';
import '../components/styles/ownerInfo.scss';

const Home3: React.FC = () => {
 const [showDetails, setShowDetails] = useState<boolean>(false);
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
            At the heart of our NFT collection lies a profound inspiration drawn from the transformative power of blockchain technology. Each NFT represents a pair of our sneakers, designed not just as a product but as a statement of uniqueness and sustainability.
            The blockchain serves as a digital canvas, allowing us to encapsulate the individuality of each pair of sneakers.
            <br/>
            <br/>
            But beyond uniqueness, the blockchain becomes a powerful tool for transparency and accountability. Sustainability is more than a commitment for us—it's a mission. By leveraging blockchain, we can trace the journey of each sneaker from conception to production. From ethically sourced materials to the carbon footprint of every process, the entire lifecycle is recorded immutably, ensuring our customers are part of a story rooted in trust and ecological responsibility.
            This collection represents the future of fashion—a fusion of innovation, ethics, and art. With every NFT, you're not just owning a unique digital asset but becoming a part of a movement that values transparency, sustainability, and individuality.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home3;
