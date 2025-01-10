import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../components/context/WalletContext';
import { useLocation } from 'react-router-dom';
import '../components/styles/nftInfo.scss';
import { NFTData } from '../components/nftData';
import contractABI from '../contracts-abi/NFTMarketplace.json';
import auctionContractABI from '../contracts-abi/NFTAuction.json';







const NFTInfo = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [nft, setNft] = useState(NFTData[id]);

  const { isWalletConnected, account } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isSoldOut, setIsSoldOut] = useState(false);

  const contractAddress = "0xe6a42b05d74E9Cb7A9E3f54EC94C8FE09d0C0034";
  const auctionContractAddress = "0x47837f72bFB2eD8d238519fF1B1B4Ba4bDF116b1";

  const [bidAmount, setBidAmount] = useState("");
  const [bids, setBids] = useState([]);
  const [isBidLoading, setIsBidLoading] = useState(false);
  const [timer, setTimer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [auctionStarted, setAuctionStarted] = useState(false); // Flag to track if auction has started
  const [auctionActive, setAuctionActive] = useState(false);
  

  
useEffect(() => {
  // Verifica se esiste un timer attivo per l'NFT corrente
  const timerKey = `timer_${id}`; // `id` è l'ID dell'NFT
  const timerExists = !!localStorage.getItem(timerKey); // Controlla se il timer esiste nel local storage

  setAuctionActive(timerExists); // Aggiorna lo stato di auctionActive
}, [id]); // Effettua il controllo ogni volta che cambia l'ID dell'NFT





  useEffect(() => {
    const storedBids = JSON.parse(localStorage.getItem(`bids_${id}`)) || [];
    setBids(storedBids);
  
    // Recupera il timer salvato da localStorage
    const storedTimerEnd = localStorage.getItem(`timer_${id}`);
    if (storedTimerEnd) {
      setTimer(parseInt(storedTimerEnd));  // Imposta il timer dal localStorage
    }
  }, [id]);


  
  useEffect(() => {
    if (!timer) return;
  
    // Salva il timer in localStorage ogni volta che cambia
    localStorage.setItem(`timer_${id}`, timer);
  
    const interval = setInterval(() => {
      const remaining = timer - Date.now();
      if (remaining <= 0) {
        clearInterval(interval);
        setTimer(null);
        handleAuctionEnd();  // Chiamata alla fine dell'asta
      } else {
        setRemainingTime(remaining);
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, [timer]);



  const addPurchase = (purchase) => {
    const existingPurchases = JSON.parse(localStorage.getItem("purchases")) || {};
    const userPurchases = existingPurchases[account] || [];
    userPurchases.push(purchase);
    existingPurchases[account] = userPurchases;
    localStorage.setItem("purchases", JSON.stringify(existingPurchases));
  };


  
  //1 Quando una nuova offerta viene fatta, imposta il timer se non è ancora iniziato
  const handleStartAuction = async () => {
    if (auctionStarted) return;  // Se l'asta è già iniziata, non fare nulla
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(auctionContractAddress, auctionContractABI.abi, signer);
  
    try {
      const tx = await contract.startAuction(id);
      await tx.wait();
      setAuctionStarted(true);
      alert("Auction started!");
  
      // Imposta la scadenza del timer
      const newTimerEnd = Date.now() + 30 * 60 * 1000; // 30 minuti
      setTimer(newTimerEnd);

      const activeAuctions = JSON.parse(localStorage.getItem("activeAuctions")) || {};
      activeAuctions[id] = { startedAt: Date.now(), timerEnd: newTimerEnd };
      localStorage.setItem("activeAuctions", JSON.stringify(activeAuctions));
    } catch (error) {
      console.error("Error starting auction:", error);
    }
  };



  
  
// 2. Funzione per effettuare un'offerta
const handlePlaceBid = async () => {
  if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
    alert("Please enter a valid bid amount.");
    return;
  }

  if (!isWalletConnected) {
    alert("Connect your wallet to place a bid.");
    return;
  }

    // Recupera l'offerta più alta dall'array delle offerte salvato nel localStorage
    const storedBids = JSON.parse(localStorage.getItem(`bids_${id}`)) || [];
    const highestBid = storedBids.length > 0 ? Math.max(...storedBids.map(bid => parseFloat(bid.amount))) : 0;
  
    // Verifica che la nuova offerta sia maggiore dell'offerta più alta
    if (parseFloat(bidAmount) <= highestBid) {
      alert(`Your bid must be higher than the current highest bid of ${highestBid} ETH.`);
      return;
    }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const balance = await provider.getBalance(account);

  if (ethers.utils.parseEther(bidAmount).gt(balance)) {
    alert("Your bid exceeds your wallet balance.");
    return;
  }

  setIsBidLoading(true);

  try {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(auctionContractAddress, auctionContractABI.abi, signer);

    // Execute the bid transaction
    const tx = await contract.placeBid(id, {
      value: ethers.utils.parseEther(bidAmount),
    });
    await tx.wait();

    const newBid = {
      amount: bidAmount,
      wallet: `${account.slice(0, 5)}...${account.slice(-4)}`,
      timestamp: Date.now(),
    };

    const updatedBids = [...bids, newBid];
    setBids(updatedBids);
    localStorage.setItem(`bids_${id}`, JSON.stringify(updatedBids));


    const currentTimerEnd = localStorage.getItem(`timer_${id}`);
    const currentTime = Date.now(); // Aggiungi questa riga per definire currentTime

    if (!auctionStarted) {
      await handleStartAuction();  // Avvia l'asta solo se non è già iniziata
    } else if (currentTimerEnd && currentTime < currentTimerEnd && currentTimerEnd - currentTime < 10 * 60 * 1000) {
      // Se c'è un timer attivo e il tempo rimanente è inferiore a 10 minuti
      const newTimerEnd = currentTime + 10 * 60 * 1000; // 5 minuti
      setTimer(newTimerEnd);  // Estende il timer
      localStorage.setItem(`timerEnd_${id}`, newTimerEnd);
    } else {
      setTimer(currentTimerEnd);
    }



    setBidAmount("");
    alert("Bid placed successfully!");
  } catch (error) {
    console.error("Error placing bid:", error);
    alert("Error while placing your bid. Please try again.");
  } finally {
    setIsBidLoading(false);
  }
};




  // 4. End auction and refund losers, assign winner
  const handleAuctionEnd = async () => {
  // Verifica se l'asta è già terminata per evitare di eseguire l'azione più di una volta
  const auctionEnded = localStorage.getItem(`auction_ended_${id}`);
  if (auctionEnded) {
    console.log("Auction already ended.");
    return; // Esce dalla funzione se l'asta è già terminata
  }

  
    if (bids.length > 0) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(auctionContractAddress, auctionContractABI.abi, signer);
  
      try {
        // Determina l'offerta più alta
        const highestBid = bids.reduce(
          (max, bid) => parseFloat(bid.amount) > parseFloat(max.amount) ? bid : max,
          bids[0] // Imposta il primo bid come iniziale
        );

        console.log("Highest Bid Wallet for Auction ID:", id, " - Wallet:", highestBid.wallet);

  
        // Chiamata per terminare l'asta
        const tx = await contract.endAuction(id);
        await tx.wait();

        // Segna l'NFT come venduto
        setIsSoldOut(true);
        setNft(prevNft => ({ ...prevNft, isSoldOut: true }));
        
              // Aggiungi l'acquisto al local storage
              const purchase = {
                nftId: id,
                wallet: highestBid.wallet,
                date: new Date().toISOString(),
                price: highestBid.amount,
                title: nft.title,         // Aggiungi il titolo dell'NFT
                imageUrl: nft.imageUrl,   // Aggiungi l'URL dell'immagine dell'NFT
              };
              addPurchase(purchase);  // Passa l'oggetto con il titolo e l'immagine dell'NFT


        // Aggiorna lo stato nel local storage
        const soldOutNFTs = JSON.parse(localStorage.getItem("soldOutNFTs")) || {};
        soldOutNFTs[id] = highestBid.wallet;
        localStorage.setItem("soldOutNFTs", JSON.stringify(soldOutNFTs));



      // Imposta la flag per segnare che l'asta è terminata
      localStorage.setItem(`auction_ended_${id}`, true);

      // Funzione per creare o aggiornare la lista delle aste concluse
      const endedAuctions = JSON.parse(localStorage.getItem('ended_auctions')) || [];
      if (!endedAuctions.includes(id)) {
        endedAuctions.push(id);  // Aggiungi l'ID dell'asta conclusa
        localStorage.setItem('ended_auctions', JSON.stringify(endedAuctions));  // Salva nel localStorage
      }

      console.log(`Auction ended flag set for auction_${id}: true`);
  



        alert("Auction ended successfully! Winner: " + highestBid.wallet);
      } catch (error) {
        console.error("Error finalizing auction:", error);
        alert("Error finalizing auction, controlla console");
      }
    } else {
      alert("No bids placed yet.");
    }
  };
  



  // buy now logic
  useEffect(() => {
    const fetchBalance = async () => {
      if (isWalletConnected) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        setBalance(ethers.utils.formatEther(balance));
      }
    };
    fetchBalance();
  }, [isWalletConnected]);

  useEffect(() => {
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





  const handlePurchase = async () => {
  if (!isWalletConnected) {
    alert("You need to connect your wallet to buy the NFT.");
    return;
  }

  try {
    if (!window.ethereum) {
      alert("Install MetaMask to buy the NFT.");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const buyerAddress = await signer.getAddress();
    const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);
    setIsLoading(true);
    setTransactionSuccess(null);

    console.log("Checking auction status in the local storage...");

    // Controlla nel local storage se esiste un timer attivo specifico per l'NFT
    const timerKey = `timer_${id}`; // La chiave del timer per l'NFT corrente
    const timerValue = localStorage.getItem(timerKey); // Recupera il valore del timer

    if (timerValue) {
      console.log(`Timer found for NFT ID ${id}: ${timerValue}`);
      alert("Auction is still active for this NFT. The NFT cannot be purchased until the auction ends.");
      setIsLoading(false); // Assicurati di fermare il caricamento
      return; // Blocca l'acquisto se il timer è attivo
    }

    console.log(`No active auction for NFT ID ${id}. Proceeding with the purchase...`);

    console.log(`Starting the purchase for NFT ID: ${id}, Price: ${nft.price} ETH`);

    // Chiamata per trasferire i fondi e acquistare l'NFT
    const tx = await contract.transferMoney(id, {
      value: ethers.utils.parseEther(nft.price.toString()),
    });
    console.log("Transaction submitted:", tx);

    // Aspetta che la transazione venga confermata
    await tx.wait();
    console.log(`NFT ID ${id} successfully bought!`);

    setTransactionSuccess(true);
    setIsSoldOut(true);
    setNft((prevNft) => ({ ...prevNft, isSoldOut: true }));

    // Marca l'NFT come venduto nel local storage
    const soldOutNFTs = JSON.parse(localStorage.getItem("soldOutNFTs")) || {};
    soldOutNFTs[id] = true;
    localStorage.setItem("soldOutNFTs", JSON.stringify(soldOutNFTs));

    // Aggiunge l'acquisto al local storage
    addPurchase({
      id,
      buyerAddress,
      date: new Date().toISOString(),
      price: nft.price,
      imageUrl: nft.imageUrl,
      title: nft.title,
    });

    alert("Purchase successful!");
  } catch (error) {
    console.error("Purchase failed:", error);
    setTransactionSuccess(false);
  } finally {
    setIsLoading(false);
  }
};

  
  



  if (!nft) {
    return <h2>NFT non trovato</h2>;
  }









//
  return (


<div className="nft-info-container">
  <img src={nft.imageUrl} alt={nft.title} className="nft-image" />
  <div className="nft-details">
    <h1 className="nft-title">{nft.title}</h1>
    <p className="nft-description">{nft.description}</p>
    <p className="nft-price">Price: {nft.price} ETH</p>
    <button
  className={`purchase-button ${isLoading ? 'loading' : ''} ${isSoldOut ? 'sold-out' : ''} ${
    auctionActive ? 'auction-active' : ''
  }`}
  onClick={isSoldOut || auctionActive ? null : handlePurchase}
  disabled={isLoading || isSoldOut || auctionActive} // Disabilita il pulsante se il timer è attivo
>
  {isLoading ? (
    <div className="processing-message">
      <span className="spinner"></span> Processing...
    </div>
  ) : isSoldOut ? (
    "Sold Out"
  ) : auctionActive ? (
    "Auction Active"
  ) : (
    "Buy Now"
  )}
</button>

    {transactionSuccess === true && <p className="success-message">Transaction successfully completed!</p>}
    {transactionSuccess === false && <p className="error-message">{isBalanceEnough()}</p>}
  




  <div className="auction-container">
  <h2 className="auction-title">Auction</h2>
  <div className="auction-input-container">
    <input
      type="number"
      placeholder="Enter your bid (ETH)"
      className="auction-input"
      value={bidAmount}
      onChange={(e) => setBidAmount(e.target.value)}
      disabled={isSoldOut}
    />
    <button
      className={`auction-button ${isBidLoading ? 'loading' : ''}`}
      onClick={handlePlaceBid}
      disabled={isBidLoading || isSoldOut}
    >
      {isBidLoading ? "Placing Bid..." : "Make an Offer"}
    </button>
  </div>
  {isSoldOut && <p className="sold-out-message">This NFT is sold out, no more bids are allowed.</p>}
  <h3 className="bids-title">Offers</h3>
  
  <div className="bids-list-container">
  <ul className="bids-list">
  {bids.length > 0 && (
    (() => {
      const highestBid = bids.reduce((max, bid) => parseFloat(bid.amount) > parseFloat(max.amount) ? bid : max);
      const sortedBids = [highestBid, ...bids.filter(bid => bid !== highestBid).sort((a, b) => b.timestamp - a.timestamp)];

      return sortedBids.map((bid, index) => (
        <li
          key={index}
          className={`bid-item ${parseFloat(bid.amount) === parseFloat(highestBid.amount) ? 'highest-bid' : ''}`}
        >
          <span className="bid-amount">{bid.amount} ETH</span>
          <span className="bid-wallet">by {bid.wallet}</span>
          <span className="bid-timestamp">at {new Date(bid.timestamp).toLocaleString()}</span>
        </li>
      ));
    })()
  )}
</ul>


  </div>

  {remainingTime !== null && (
    <div className="timer">
      <p>Time left: {new Date(remainingTime).toISOString().substr(11, 8)}</p>
    </div>
  )}
</div>

      </div>
    </div>
  );
  
};

export default NFTInfo;
