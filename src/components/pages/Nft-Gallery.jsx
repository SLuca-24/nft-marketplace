import React, { useEffect, useState } from 'react';
import { NFTData } from '../nftData';
import '../styles/nft-gallery.scss';
import { Link } from 'react-router-dom';

const NftGallery = () => {

  const [soldOutNFTs, setSoldOutNFTs] = useState({});

  useEffect(() => {
    // Recupera gli NFT sold out dal local storage
    const soldOut = JSON.parse(localStorage.getItem('soldOutNFTs')) || {};
    setSoldOutNFTs(soldOut);
  }, []);

  // Estrai tutti gli NFT dal file centralizzato
  const NFTs = Object.keys(NFTData).map(id => ({
    id: parseInt(id),
    title: NFTData[id].title,
    imageUrl: NFTData[id].imageUrl,
  }));

  return (
    <div className="nft-grid-container">
      <h1>DEMETRA COLLECTION</h1>
      <div className="nft-grid">
        {NFTs.map((nft) => (
          <div key={nft.id} className={`nft-card ${soldOutNFTs[nft.id] ? 'sold-out' : ''}`}>
            <Link to={`/about`} state={{ id: nft.id }}>
              <img src={nft.imageUrl} alt={nft.title} className="nft-image" />
              <h3>{soldOutNFTs[nft.id] ? 'Sold Out' : nft.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NftGallery;
