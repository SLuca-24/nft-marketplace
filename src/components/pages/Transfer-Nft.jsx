import React, { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { NFTData as initialNFTData } from '../nftData';
import '../styles/transfer-nft.scss';

const TransferNFT = () => {
  const { isWalletConnected, account } = useWallet();
  const [purchasedNFTs, setPurchasedNFTs] = useState([]);
  const [receivedNFTs, setReceivedNFTs] = useState([]);
  const [NFTData, setNFTData] = useState(initialNFTData);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState('');

  useEffect(() => {
    if (isWalletConnected && account) {
      const allPurchases = JSON.parse(localStorage.getItem('purchases')) || {};
      const userPurchases = allPurchases[account] || [];
      setPurchasedNFTs(userPurchases);
      const allTransfers = JSON.parse(localStorage.getItem("nft-transfers")) || [];
      const userReceivedNFTs = allTransfers.filter(transfer => transfer.to.toLowerCase() === account.toLowerCase());
      const receivedNFTsWithData = userReceivedNFTs.map(transfer => {
        const nftData = NFTData[transfer.nftId];
        return nftData ? { ...transfer, ...nftData } : null;
      }).filter(nft => nft !== null);
      setReceivedNFTs(receivedNFTsWithData);

      const storedNFTData = JSON.parse(localStorage.getItem("nftData")) || initialNFTData;
      setNFTData(storedNFTData);
    }
  }, [isWalletConnected, account]);


  const mergeNFTData = () => {
    const mergedNFTs = [
      ...purchasedNFTs.map(nft => ({ ...nft, isReceived: false })),
      ...receivedNFTs.map(nft => ({ ...nft, isReceived: true })),
    ];

    return mergedNFTs;
  };

  const handleSelectNFT = (nftString) => {
    try {
      if (nftString) {
        const nft = JSON.parse(nftString);
        setSelectedNFT(nft);
      } else {
        setSelectedNFT(null);
      }
    } catch (error) {
      console.error('Error parsing NFT string:', error);
    }
  };

  const handleTransfer = () => {
    if (selectedNFT && recipientAddress) {
      const transferDetails = {
        from: account,
        to: recipientAddress,
        nftTitle: selectedNFT.title,
        nftId: selectedNFT.id,
        timestamp: new Date().toISOString(),
      };

      const existingTransfers = JSON.parse(localStorage.getItem('nft-transfers')) || [];
      existingTransfers.push(transferDetails);
      localStorage.setItem('nft-transfers', JSON.stringify(existingTransfers));

      alert(`Trasferito ${selectedNFT.title} a ${recipientAddress}`);

      const allPurchases = JSON.parse(localStorage.getItem('purchases')) || {};
      const updatedPurchases = allPurchases[account].filter(nft => nft.id !== selectedNFT.id);
      allPurchases[account] = updatedPurchases;
      if (allPurchases[recipientAddress]) {
        const recipientPurchases = allPurchases[recipientAddress];

        const existingNFTIndex = recipientPurchases.findIndex(nft => nft.id === selectedNFT.id);

        if (existingNFTIndex > -1) {
          recipientPurchases[existingNFTIndex].buyerAddress = recipientAddress;
        } else {
          recipientPurchases.push({ ...selectedNFT, buyerAddress: recipientAddress });
        }
      } else {
        allPurchases[recipientAddress] = [{ ...selectedNFT, buyerAddress: recipientAddress }];
      }

      localStorage.setItem('purchases', JSON.stringify(allPurchases));
      setPurchasedNFTs(updatedPurchases);

      setSelectedNFT(null);
      setRecipientAddress('');
    } else {
      alert('Seleziona un NFT e inserisci un indirizzo del destinatario valido.');
    }
  };

  return (
    <div className={isWalletConnected ? "transfer-nft-page" : ""}>
      {isWalletConnected ? (
        <div>
          <h2>Transfer Your NFTs</h2>

          <div className="nft-selection">
            <h3>Select NFT to Transfer</h3>
            {purchasedNFTs.length > 0 || receivedNFTs.length > 0 ? (
              <select onChange={(e) => handleSelectNFT(e.target.value)}>
                <option value="">-- Select an NFT --</option>
                {mergeNFTData().map((nft, index) => (
                  <option key={index} value={JSON.stringify(nft)}>
                    {nft.title}
                  </option>
                ))}
              </select>
            ) : (
              <p>You don't have any NFTs to transfer.</p>
            )}
          </div>

          {selectedNFT && (
            <div className="selected-nft">
              <h3>Selected NFT</h3>
              <img src={selectedNFT.imageUrl} alt={selectedNFT.title} />
            </div>
          )}

          <div className="recipient-address">
            <h3>Recipient Address</h3>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="Enter recipient Ethereum address"
            />
          </div>

          <button className='transfer-button' onClick={handleTransfer} disabled={!selectedNFT || !recipientAddress}>
            Transfer
          </button>
        </div>
      ) : (
        <h2 className='Connect-Wallet-Error-Transfer-Page'>
          Connect your wallet to transfer NFT
        </h2>
      )}
    </div>
  );
};

export default TransferNFT;
