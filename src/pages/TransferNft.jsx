import React, { useState, useEffect } from 'react';
import { useWallet } from '../components/context/WalletContext';
import { NFTData as initialNFTData } from '../components/nftData';
import '../components/styles/transfer-nft.scss';
import { ethers } from 'ethers';
import TransferNftArtifact from '../contracts-abi/TransferNft.json'
const abi = TransferNftArtifact.abi;


const TransferNFT = () => {
  const { isWalletConnected, account } = useWallet();
  const [purchasedNFTs, setPurchasedNFTs] = useState([]);
  const [receivedNFTs, setReceivedNFTs] = useState([]);
  const [NFTData, setNFTData] = useState(initialNFTData);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [isWaitingForTransaction, setIsWaitingForTransaction] = useState(false);

  const contractAddress = "0x5f0163d0888aed91d9D1Bee969D2948893a010A5";

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
        console.log("NFT selected:", nft);
        setSelectedNFT(nft);
      } else {
        setSelectedNFT(null);
      }
    } catch (error) {
      console.error('Error parsing NFT string:', error);
    }
  };
  

  const handleTransfer = async () => {
    if (!selectedNFT || !recipientAddress) {
      alert('Select an NFT and enter a valid recipient address');
      return;
    }
    if (!ethers.utils.isAddress(recipientAddress)) {
      alert("The address entered is not valid. Please enter a correct Ethereum address");
      return;
    }
    if (recipientAddress.toLowerCase() === account.toLowerCase()) {
      alert("You cannot transfer an NFT to yourself");
      return;
    }
  
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
  
      const nftIdToSend = selectedNFT.nftId || "NFT";
      console.log("NFT ID:", nftIdToSend);

      setIsWaitingForTransaction(true);
      const tx = await contract.sendnft( recipientAddress, nftIdToSend);
  
      const receipt = await tx.wait();
      setIsWaitingForTransaction(false);
  
      if (receipt.status === 1) {
        const transferDetails = {
          from: account,
          to: recipientAddress,
          nftTitle: selectedNFT.title,
          nftId: selectedNFT.nftId,
          imageUrl: selectedNFT.imageUrl,
          timestamp: new Date().toISOString(),
          transactionHash: receipt.transactionHash,
        };
  
        const existingTransfers = JSON.parse(localStorage.getItem('nft-transfers')) || [];
        existingTransfers.push(transferDetails);
        localStorage.setItem('nft-transfers', JSON.stringify(existingTransfers));
  
        alert(`Successfully transferred ${selectedNFT.title} to ${recipientAddress}\nTransaction Link: https://sepolia.etherscan.io/tx/${receipt.transactionHash}`);
  
        const allPurchases = JSON.parse(localStorage.getItem('purchases')) || {};
        const updatedPurchases = allPurchases[account].filter(nft => nft.nftId !== selectedNFT.nftId);
        allPurchases[account] = updatedPurchases;
  
        if (allPurchases[recipientAddress]) {
          allPurchases[recipientAddress].push({ ...selectedNFT, buyerAddress: recipientAddress });
        } else {
          allPurchases[recipientAddress] = [{ ...selectedNFT, buyerAddress: recipientAddress }];
        }
  
        localStorage.setItem('purchases', JSON.stringify(allPurchases));
        setPurchasedNFTs(updatedPurchases);
        setSelectedNFT(null);
        setRecipientAddress('');
      } else {
        alert("Transaction failed. Please try again.");
      }
    } catch (error) {
      setIsWaitingForTransaction(false);
      console.error("Error during NFT transfer:", error);
      alert("An error occurred during the transfer. Please try again.");
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

          <button
            className={`transfer-button ${isWaitingForTransaction ? 'waiting' : ''}`}
            onClick={handleTransfer}
            disabled={!selectedNFT || !recipientAddress || isWaitingForTransaction}
          >
            {isWaitingForTransaction ? 'Waiting for transaction...' : 'Transfer'}
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
