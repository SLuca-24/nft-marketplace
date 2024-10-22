import React, { useState, useEffect } from 'react';
import { useWallet } from './context/WalletContext';
import './styles/purchases.css';
import img from './img/g.png';
import img2 from './img/b.png';
import img3 from './img/a.png';

const PurchaseHistory = () => {

    
  const { isWalletConnected } = useWallet();
  const [isConnected, setIsConnected] = useState(false);

  // Usa useEffect per aggiornare isConnected quando isWalletConnected cambia
  useEffect(() => {
    setIsConnected(isWalletConnected);
  }, [isWalletConnected]);

  const orders = [
    {
      id: 1,
      title: 'Articolo 1',
      purchaseDate: '2024-10-01',
      price: '0.1 ETH',
      imageUrl: img
    },
    {
      id: 2,
      title: 'Articolo 2',
      purchaseDate: '2024-09-21',
      price: '29 ETH',
      imageUrl: img2
    },
    {
      id: 3,
      title: 'Articolo 3',
      purchaseDate: '2023-08-11',
      price: '1 ETH',
      imageUrl: img3
    },
  ];

  return (
    <div className="purchase-history">
      {isConnected ? (
        <>
          <h2>Your Purchases</h2>
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-item" key={order.id}>
                <img src={order.imageUrl} alt={order.title} className="order-image" />
                <div className="order-details">
                  <h3 className="order-title">{order.title}</h3>
                  <p className="order-date">Date of purchase: {order.purchaseDate}</p>
                  <p className="order-price">Price paid: {order.price}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className='Connect-Wallet-Error'>Connect your wallet to recover you purchase history!</h2>
        </>
      )}
    </div>
  );
};

export default PurchaseHistory;
