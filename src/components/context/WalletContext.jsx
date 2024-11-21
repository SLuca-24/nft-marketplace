import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';


const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);

  // Connetti il wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Account connesso con successo:', accounts[0]);
        await accountChangeHandler(accounts[0]);
        setIsWalletConnected(true);
      } catch (error) {
        console.error("Errore durante la connessione al wallet:", error);
      }
    } else {
      alert("Devi installare un wallet Ethereum");
    }
  };

  const accountChangeHandler = async (newAccount) => {
    setAccount(newAccount);
    await getAccountBalance(newAccount);
    const network = await window.ethereum.request({ method: 'net_version' });
    setNetwork(networkFriendlyName(network));
  };

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

  const chainChangedHandler = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          accountChangeHandler(accounts[0]);
          window.location.reload();
        } else {
          setIsWalletConnected(false);
          setAccount(null);
          setBalance(null);
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
    throw new Error('useWallet deve essere usato all\'interno di un WalletProvider');
  }
  return context;
};
