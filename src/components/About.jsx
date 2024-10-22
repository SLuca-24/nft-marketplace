import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles/about.scss'
import NFT1 from './img/g.png';
import NFT2 from './img/b.png';
import NFT3 from './img/a.png';
import NFT4 from './img/f.png';
import NFT5 from './img/h.png';
import NFT6 from './img/a.png';
import NFT7 from './img/g.png';
import NFT8 from './img/g.png';

const NFTInfo = () => {
  const location = useLocation();  // Ottiene lo stato passato
  const { id } = location.state || {};  // Estrae l'ID dallo stato

  // Dati degli NFT
  const NFTData = {
    1: {
      title: 'PAG #381',
      description: 'This NFT represents an abstract artwork characterized by vibrant colors and fluid shapes. It invites the viewer to immerse themselves in a world where reality blurs with imagination, making it a perfect addition for art enthusiasts looking for a unique piece.',
      imageUrl: NFT1,
      price: '2 ETH',
      date: '2024-01-15'
    },
    2: {
      title: 'PAG #975',
      description: 'An NFT that celebrates the fusion of technology and nature, featuring intricate patterns that combine natural motifs with digital aesthetics. This piece is not just art; it’s a commentary on the symbiotic relationship between our modern digital world and the natural environment.',
      imageUrl: NFT2,
      price: '3.5 ETH',
      date: '2024-02-20'
    },
    3: {
      title: 'PAG #654',
      description: 'A geometric representation that plays with perspectives and dimensions, creating a visual experience that challenges the viewer’s perception. This NFT invites you to explore the balance of structure and creativity, making it an ideal centerpiece for any collection.',
      imageUrl: NFT3,
      price: '1.8 ETH',
      date: '2024-03-05'
    },
    4: {
      title: 'PAG #331',
      description: 'An artwork inspired by Impressionism, featuring soft brush strokes and pastel colors that evoke a sense of tranquility. This NFT captures the fleeting moments of light and color, reminiscent of a serene landscape or a quiet moment in nature.',
      imageUrl: NFT4,
      price: '4 ETH',
      date: '2024-04-12'
    },
    5: {
      title: 'PAG #111',
      description: 'A futuristic NFT that embodies elements reminiscent of cyberpunk culture, featuring neon lights and urban landscapes. This piece represents the intersection of technology and society, making it a thought-provoking addition for collectors interested in the future of art.',
      imageUrl: NFT5,
      price: '5 ETH',
      date: '2024-05-20'
    },
    6: {
      title: 'PAG #1000',
      description: 'This NFT explores the concept of infinity with continuous lines and endless curves, challenging the viewer to reflect on the nature of existence and time. It serves as a meditation piece that encourages introspection and a sense of wonder about the universe.',
      imageUrl: NFT6,
      price: '6.2 ETH',
      date: '2024-06-01'
    },
    7: {
      title: 'PAG #14',
      description: 'Symbolizing rebirth, this NFT features a stylized floral theme that represents growth and renewal. Its vibrant colors and intricate details capture the essence of life, making it a meaningful piece for collectors who appreciate nature and transformation.',
      imageUrl: NFT7,
      price: '2.5 ETH',
      date: '2024-07-10'
    },
    8: {
      title: 'PAG #654',
      description: 'An NFT based on minimalist concepts, utilizing empty space and simple yet powerful shapes. This artwork invites viewers to appreciate the beauty of simplicity and encourages a sense of calm and clarity amidst the chaos of modern life.',
      imageUrl: NFT8,
      price: '1.9 ETH',
      date: '2024-08-18'
    },
  };
  

  const nft = NFTData[id];

  if (!nft) {
    return <h2>NFT non trovato</h2>;
  }

  return (
    <div className="nft-info-container">
      <img src={nft.imageUrl} alt={nft.title} className="nft-image" />
      <div className="nft-details">
        <h1 className="nft-title">{nft.title}</h1>
        <p className="nft-description">{nft.description}</p>
        <p className="nft-price">Prezzo: {nft.price}</p>
        <button className="purchase-button">Acquista Ora</button>
      </div>
    </div>
  );
};

export default NFTInfo;
