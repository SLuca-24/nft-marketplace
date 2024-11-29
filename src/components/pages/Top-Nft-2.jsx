import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ownerInfo.scss';
import { NFTData } from '../nftData';


const TopNft2 = () => {
  const NFTs = [4, 18, 20].map(id => ({
    id,
    title: NFTData[id].title,
    imageUrl: NFTData[id].imageUrl,
  }));

  const galleryRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

export default TopNft2;
