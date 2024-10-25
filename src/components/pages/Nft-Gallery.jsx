import React from 'react';
import { NFTData } from '../nftData';  // Importa i dati centralizzati degli NFT
import '../styles/nft-gallery.scss';
import { Link } from 'react-router-dom';

const NftGallery = () => {
  // Estrai tutti gli NFT dal file centralizzato
  const NFTs = Object.keys(NFTData).map(id => ({
    id: parseInt(id),
    title: NFTData[id].title,
    imageUrl: NFTData[id].imageUrl,
  }));

  return (
    <div className="nft-grid-container">
      <h1>OWLCHEY COLLECTION</h1>
      <div className="nft-grid">
        {NFTs.map((nft) => (
          <div key={nft.id} className="nft-card">
            <Link to={`/about`} state={{ id: nft.id }}>
              <img src={nft.imageUrl} alt={nft.title} className="nft-image" />
              <h3>{nft.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NftGallery;
