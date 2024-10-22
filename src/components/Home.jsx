import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import NFT1 from './img/g.png';
import NFT2 from './img/b.png';
import NFT3 from './img/a.png';
import './styles/ownerInfo.scss';

const Home = () => {
  const NFTs = [
    { id: 1, title: 'PAG #381', imageUrl: NFT1 },
    { id: 2, title: 'PAG #975', imageUrl: NFT2 },
    { id: 3, title: 'PAG #654', imageUrl: NFT3 },
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
