import React, { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { NFTData } from '../nftData'; // Assicurati che il percorso sia corretto
import '../styles/purchases.css';

const PurchaseHistory = () => {
  const { isWalletConnected } = useWallet();
  const [isConnected, setIsConnected] = useState(false);

  // Array degli ID degli NFT acquistati
  const purchasedNFTIds = [1, 20, 13, 6, 2, 18];

  const purchasedNFTs = purchasedNFTIds.map(id => NFTData[id]);

  useEffect(() => {
    setIsConnected(isWalletConnected);
  }, [isWalletConnected]);



  return (
    <div className="purchase-history">
      {isConnected ? (
        <>
          <h2>Your Purchase History</h2>
          <div className="orders-list">
            {purchasedNFTs.map((nft, index) => (
              <div className="order-item" key={index}>
                <img src={nft.imageUrl} alt={nft.title} className="order-image" />
                <div className="order-details">
                  <h3 className="order-title">{nft.title}</h3>
                  <p className="order-date">Data di acquisto: {nft.date}</p>
                  <p className="order-price">Prezzo pagato: {nft.price}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2 className="Connect-Wallet-Error">
        Connect your wallet to recover you purchase history!
        </h2>
      )}
    </div>
  );
};

export default PurchaseHistory;
