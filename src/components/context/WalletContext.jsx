import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);

  // Connetti il wallet e salva nel localStorage
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        await accountChangeHandler(accounts[0]);
        setIsWalletConnected(true);
        localStorage.setItem('connectedWallet', accounts[0]); // Salva l'account
      } catch (error) {
        console.error('Errore durante la connessione al wallet:', error);
      }
    } else {
      alert('Devi installare un wallet Ethereum');
    }
  };

  // Gestisce il cambio di account
  const accountChangeHandler = async (newAccount) => {
    setAccount(newAccount);
    await getAccountBalance(newAccount);
    const networkId = await window.ethereum.request({ method: 'net_version' });
    setNetwork(networkFriendlyName(networkId));
  };

  // Recupera il bilancio
  const getAccountBalance = async (address) => {
    const balanceWei = await window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] });
    const balanceInEther = ethers.utils.formatEther(balanceWei);
    const networkId = await window.ethereum.request({ method: 'net_version' });

    if (networkId === '137') {
      setBalance(`${balanceInEther} MATIC`);
    } else {
      setBalance(`${balanceInEther} ETH`);
    }
  };

  // Gestione del cambio della chain
  const chainChangedHandler = () => {
    window.location.reload();
  };

  // Controllo al caricamento della pagina per riconnettere il wallet
  useEffect(() => {
    const savedAccount = localStorage.getItem('connectedWallet');
    if (savedAccount) {
      (async () => {
        await accountChangeHandler(savedAccount);
        setIsWalletConnected(true);
      })();
    }

    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          accountChangeHandler(accounts[0]);
          localStorage.setItem('connectedWallet', accounts[0]); // Aggiorna l'account salvato
        } else {
          setIsWalletConnected(false);
          setAccount(null);
          setBalance(null);
          localStorage.removeItem('connectedWallet'); // Rimuovi se non ci sono account
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', chainChangedHandler);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', chainChangedHandler);
      };
    }
  }, []);

  const networkFriendlyName = (networkId) => {
    switch (networkId) {
      case '1':
        return 'Ethereum Mainnet';
      case '3':
        return 'Ropsten Test Network';
      case '4':
        return 'Rinkeby Test Network';
      case '5':
        return 'Goerli Test Network';
      case '42':
        return 'Kovan Test Network';
      case '11155111':
        return 'Sepolia Test Network';
      case '137':
        return 'Polygon Mainnet';
      default:
        return 'Rete sconosciuta';
    }
  };

  return (
    <WalletContext.Provider value={{ isWalletConnected, account, balance, network, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet deve essere usato all'interno di un WalletProvider");
  }
  return context;
};
