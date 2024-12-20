import React, { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { NFTData as initialNFTData } from '../nftData';
import '../styles/purchases.css';

const PurchaseHistory = () => {
  const { isWalletConnected, account } = useWallet();
  const [purchasedNFTs, setPurchasedNFTs] = useState([]);
  const [receivedNFTs, setReceivedNFTs] = useState([]);
  const [NFTData, setNFTData] = useState(initialNFTData);

  useEffect(() => {
    if (isWalletConnected && account) {
      const allPurchases = JSON.parse(localStorage.getItem("purchases")) || {};
      const userPurchases = allPurchases[account] || [];
      setPurchasedNFTs(userPurchases);
      const allTransfers = JSON.parse(localStorage.getItem("nft-transfers")) || [];
      const userReceivedNFTs = allTransfers.filter(transfer => transfer.to.toLowerCase() === account.toLowerCase());
      setReceivedNFTs(userReceivedNFTs);
      const storedNFTData = JSON.parse(localStorage.getItem("nftData")) || initialNFTData;
      setNFTData(storedNFTData);
    }
  }, [isWalletConnected, account]);
  const getNFTImageById = (nftId) => {
    const nft = NFTData[nftId];
    return nft ? nft.imageUrl : 'nft not found';
  };

  return (
    <div className="purchase-history">
       <div className="history-wrapper">
      {isWalletConnected ? (
        <>
          <h2>Your Purchase History</h2>
          <div className="orders-list">
            {purchasedNFTs.length > 0 ? (
              purchasedNFTs.map((nft, index) => (
                <div className="order-item" key={index}>
                  <img src={nft.imageUrl} alt={nft.title} className="order-image" />
                  <div className="order-details">
                    <h3 className="order-title">{nft.title}</h3>
                    <p className="order-date">Date of purchase: {new Date(nft.date).toLocaleDateString()}</p>
                    <p className="order-price">Price paid: {nft.price} ETH</p>
                  </div>
                </div>
              ))
            ) : (
              <p>You don't have any orders.</p>
            )}
          </div>

          <h2>Received NFTs</h2>
          <div className="orders-list">
            {receivedNFTs.length > 0 ? (
              receivedNFTs.map((transfer, index) => (
                <div className="order-item" key={index}>
                  <img src={getNFTImageById(transfer.nftId)} alt={transfer.nftTitle} className="order-image" />
                  <div className="order-details">
                    <h3 className="order-title">{transfer.nftTitle}</h3>
                    <p className="order-date">Date of transfer: {new Date(transfer.timestamp).toLocaleDateString()}</p>
                    <p className='order-price'>Received from: {transfer.from}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>You haven't received any NFTs.</p>
            )}
          </div>
        </>
      ) : (
        <h2 className="Connect-Wallet-Error">
          Connect your wallet to view your purchase history!
        </h2>
      )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
