import React, { useState, useEffect } from 'react';
import { useWallet } from '../components/context/WalletContext';
import { NFTData as initialNFTData } from '../components/nftData';
import '../components/styles/purchases.scss';
import NFTItem from './nftItem.tsx'



//Hook custom
const useNFTData = (account) => {
  const [purchasedNFTs, setPurchasedNFTs] = useState([]);
  const [receivedNFTs, setReceivedNFTs] = useState([]);
  const [NFTData, setNFTData] = useState(initialNFTData);

  useEffect(() => {
    if (account) {
      const allPurchases = JSON.parse(localStorage.getItem('purchases')) || {};
      const userPurchases = allPurchases[account] || [];
      setPurchasedNFTs(userPurchases);

      const allTransfers = JSON.parse(localStorage.getItem('nft-transfers')) || [];
      const userReceivedNFTs = allTransfers.filter(
        (transfer) => transfer.to.toLowerCase() === account.toLowerCase()
      );
      setReceivedNFTs(userReceivedNFTs);

      const storedNFTData = JSON.parse(localStorage.getItem('nftData')) || initialNFTData;
      setNFTData(storedNFTData);
    }
  }, [account]);

  const getNFTImageById = (nftId) => {
    const nft = NFTData[nftId];
    return nft ? nft.imageUrl : 'nft not found';
  };

  return { purchasedNFTs, receivedNFTs, getNFTImageById };
};





const PurchaseHistory = () => {
  const { isWalletConnected, account } = useWallet();
  const { purchasedNFTs, receivedNFTs, getNFTImageById } = useNFTData(account);

  return (
    <div className="purchase-history">
      <div className="history-wrapper">
        {isWalletConnected ? (
          <>
            <NFTItem
              title="Your Purchase History"
              nfts={purchasedNFTs}
              renderDetails={(nft) => (
                <>
                  <h3 className="order-title">{nft.title}</h3>
                  <p className="order-date">Date of purchase: {new Date(nft.date).toLocaleDateString()}</p>
                  <p className="order-price">Price paid: {nft.price} ETH</p>
                </>
              )}
            />

            <NFTItem
              title="Received NFTs"
              nfts={receivedNFTs.map((transfer) => ({
                ...transfer,
                imageUrl: getNFTImageById(transfer.nftId),
              }))}
              renderDetails={(transfer) => (
                <>
                  <h3 className="order-title">{transfer.nftTitle}</h3>
                  <p className="order-date">Date of transfer: {new Date(transfer.timestamp).toLocaleDateString()}</p>
                  <p className="order-price">Received from: {transfer.from}</p>
                </>
              )}
            />
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
