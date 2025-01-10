import React, { useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { useWallet } from '../components/context/WalletContext';
import '../components/styles/header.scss';
import { Link } from 'react-router-dom';
import Logo from '../components/logo.tsx';

const Header: React.FC = () => {
  const { isWalletConnected, account, balance, network, connectWallet } = useWallet();
  const [isEthToggled, setIsEthToggled] = useState<boolean>(false);

  const toggleEth = () => {
    if (isWalletConnected) {
      setIsEthToggled((prev) => !prev);
    }
  };

  return (
    <div className="header-div">
      <div className="logo-name">
        <Link to="/">
          <Logo />
        </Link>
        <h1>Demetra</h1>
      </div>

      {!isWalletConnected ? (
        <div className="connectwalleticon" onClick={connectWallet}>
          Connect Wallet
        </div>
      ) : (
        <div className="connectwalleticon-connected" onClick={toggleEth}>
          {account && <span>{`${account.slice(0, 4)}...${account.slice(-4)}`}</span>}
        </div>
      )}

      {isEthToggled && (
        <>
          <div className="overlay" onClick={toggleEth}></div>
          <div className="menu">
            <div className="cancelbutton">
              <button onClick={toggleEth}>
                <MdCancel />
              </button>
            </div>
            <div className="address">
              <strong>Address:</strong>
              <br />
              {account}
              <br />({network})
            </div>
            <div className="balancee">
              <strong>Balance:</strong>
              <br />
              {balance}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
