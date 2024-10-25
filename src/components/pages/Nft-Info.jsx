import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/nft-info.scss'
import { NFTData } from '../nftData';


const NFTInfo = () => {
  const location = useLocation();  // Ottiene lo stato passato
  const { id } = location.state || {};  


  const nft = NFTData[id];  // Usa i dati importati

  if (!nft) {
    return <h2>NFT non trovato</h2>;
  }

  return (
    <div className="nft-info-container">
      <img src={nft.imageUrl} alt={nft.title} className="nft-image" />
      <div className="nft-details">
        <h1 className="nft-title">{nft.title}</h1>
        <p className="nft-description">{nft.description}</p>
        <p className="nft-price">Price: {nft.price}</p>
        <button className="purchase-button">Buy Now</button>
      </div>
    </div>
  );
};

export default NFTInfo;
