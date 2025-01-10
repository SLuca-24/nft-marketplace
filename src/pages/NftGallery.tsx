import React, { useEffect, useState } from 'react';
import { NFTData } from '../components/nftData';
import '../components/styles/nftgallery.scss';
import { Link } from 'react-router-dom';

interface SoldOutNFTs {
  [key: number]: boolean;
}

interface AuctionStatus {
  [key: number]: boolean;
}

const NftGallery: React.FC = () => {
  const [soldOutNFTs, setSoldOutNFTs] = useState<SoldOutNFTs>({});
  const [auctionStatus, setAuctionStatus] = useState<AuctionStatus>({});

  useEffect(() => {
    const soldOut = JSON.parse(localStorage.getItem('soldOutNFTs') || '{}') as SoldOutNFTs;
    setSoldOutNFTs(soldOut);


    const auctionStatusObj: AuctionStatus = {};
    Object.keys(NFTData).forEach(id => {
      const timerKey = `timer_${id}`;
      const timerExists = !!localStorage.getItem(timerKey);
      auctionStatusObj[parseInt(id)] = timerExists;
    });
    setAuctionStatus(auctionStatusObj);
  }, []);

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
            {auctionStatus[nft.id] && !soldOutNFTs[nft.id] && (
              <div className="auction-badge">Ongoing Auction</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NftGallery;
