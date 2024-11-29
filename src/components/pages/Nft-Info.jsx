import React, { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../context/WalletContext';
import { useLocation } from 'react-router-dom';
import '../styles/nft-info.scss'
import { NFTData } from '../nftData';
import contractABI from '../../contracts-abi/NFTMarketplace.json';





const NFTInfo = () => {
  const location = useLocation();  // Ottiene lo stato passato
  const { id } = location.state || {};  
  const [nft, setNft] = useState(NFTData[id])

  const { isWalletConnected, account } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isSoldOut, setIsSoldOut] = useState(false)

  const contractAddress = "0xe6a42b05d74E9Cb7A9E3f54EC94C8FE09d0C0034";

  useEffect(() => {
    const fetchBalance = async () => {
      if (isWalletConnected) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();  // Ottieni l'indirizzo del wallet
        const balance = await provider.getBalance(address);  // Ottieni il saldo
        setBalance(ethers.utils.formatEther(balance));  // Imposta il saldo in ETH
      }
    };

    fetchBalance();
  }, [isWalletConnected]); 

  useEffect(() => {
    // Carica lo stato "sold out" dal localStorage
    const soldOutNFTs = JSON.parse(localStorage.getItem("soldOutNFTs")) || {};
    if (soldOutNFTs[id]) {
      setIsSoldOut(true);
      setNft((prevNft) => ({ ...prevNft, isSoldOut: true }));
    }
  }, [id]);


  const isBalanceEnough = () => {
    const priceInEth = parseFloat(nft.price);
    const balanceInEth = parseFloat(balance);

    if (balanceInEth >= priceInEth) {
      return <p>Transaction interrupted, please retry</p>;
    } else {
      return <p>You don't have enough ETH to buy this NFT.</p>;
    }
  };

  const addPurchase = (purchase) => {
    const existingPurchases = JSON.parse(localStorage.getItem("purchases")) || {};
    const userPurchases = existingPurchases[account] || [];
    userPurchases.push(purchase);
    existingPurchases[account] = userPurchases;
    localStorage.setItem("purchases", JSON.stringify(existingPurchases));
  };
  
  
  const handlePurchase = async () => {

    if (!isWalletConnected) {
      alert("You need to connect your wallet to buy the nft");
      return;
    }

    try {
      if (!window.ethereum) {
        alert("Install an ethereum wallet to buy the nft");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const buyerAddress = await signer.getAddress();
      const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);

      setIsLoading(true);
      setTransactionSuccess(null);
      console.log("Inizio acquisto NFT...");
      console.log(`ID NFT: ${id}, Prezzo: ${nft.price} ETH`);

      const tx = await contract.transferMoney(id, {
        value: ethers.utils.parseEther(nft.price.toString())
      });
      
      console.log("Transazione inviata:", tx);
      await tx.wait();
      console.log(`NFT con ID ${id} acquistato con successo!`);
      setTransactionSuccess(true);
      setIsSoldOut(true);
      setNft(prevNft => ({ ...prevNft, isSoldOut: true }));
            const soldOutNFTs = JSON.parse(localStorage.getItem("soldOutNFTs")) || {};
            soldOutNFTs[id] = true;
            localStorage.setItem("soldOutNFTs", JSON.stringify(soldOutNFTs));


      addPurchase({
        id,
        buyerAddress,
        date: new Date().toISOString(),
        price: nft.price,
        imageUrl: nft.imageUrl,
        title: nft.title
      });

    } catch (error) {
      console.error("Errore durante l'acquisto:", error);
      setTransactionSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };


  if (!nft) {
    return <h2>NFT non trovato</h2>;
  }
  

  return (
    <div className="nft-info-container">
      <img src={nft.imageUrl} alt={nft.title} className="nft-image" />
      <div className="nft-details">
        <h1 className="nft-title">{nft.title}</h1>
        <p className="nft-description">{nft.description}</p>
        <p className="nft-price">Price: {nft.price} ETH</p>
        <button 
           className={`purchase-button ${isLoading ? 'loading' : ''} ${isSoldOut ? 'sold-out' : ''}`}
          onClick={isSoldOut ? null : handlePurchase}
          disabled={isLoading || isSoldOut}
        >
          {isLoading ? (
            <div className='processing-message'>
              <span className="spinner"></span> Processing...
            </div>
          ) : isSoldOut ? (
            "Sold Out"
          ) : (
            "Buy Now"
          )}
        </button>
        {transactionSuccess === true && <p className="success-message">Transazione completata con successo!</p>}
        {transactionSuccess === false && <p className="error-message">{isBalanceEnough()}</p>}
      </div>
    </div>
  );
};

export default NFTInfo;
