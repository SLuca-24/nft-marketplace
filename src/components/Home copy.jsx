import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import NFT4 from './img/f.png';
import NFT5 from './img/h.png';
import NFT6 from './img/a.png';
import './styles/ownerInfo.scss';

const Home = () => {
  const NFTs = [
    { id: 4, title: 'PAG #331', imageUrl: NFT4 },
    { id: 5, title: 'PAG #111', imageUrl: NFT5 },
    { id: 6, title: 'PAG #1000', imageUrl: NFT6 },
  ];

  const galleryRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Mantiene l'indice dell'NFT corrente

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const scrollRight = () => {
    if (currentIndex < NFTs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <div className="nft-gallery-wrapper">
        <div className="nft-gallery-container">
          <button className="scroll-button left" onClick={scrollLeft}>
            &lt;
          </button>
          <div className="nft-gallery" ref={galleryRef} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {NFTs.map(nft => (
              <div className="nft-card" key={nft.id}>
                <Link to={`/about`} state={{ id: nft.id }}>
                  <img src={nft.imageUrl} alt={nft.title} />
                  <h3>{nft.title}</h3>
                </Link>
              </div>
            ))}
          </div>
          <button className="scroll-button right" onClick={scrollRight}>
            &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
