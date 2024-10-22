import React from 'react';
import './styles/smartContractInfo.css';


const SmartContractInfo = () => {
  return (
    <div className='back'>
    <div className="smart-contract-page">
      <header className="header">
        <h1>Smart Contracts</h1>
        <p>Our platform is managed by our team, but all transactions are entirely decentralized.</p>
      </header>

      <section className="description">
        <h2>Total Decentralization</h2>
        <p>
        Our smart contracts ensure that every transaction is secure and transparent, eliminating the need for personal data. This allows you to use our platform with confidence, knowing that your privacy is protected.
        </p>
        <p>
        Thanks to blockchain technology, your interactions with our site are completely autonomous and managed without intermediaries. Welcome to a truly decentralized ecosystem!
        </p>
      </section>

      <footer className="footer">
        <h2>Open Source</h2>
        <p>
        Interested in contributing to this project? Or perhaps you want to learn how to implement it without delving into the source code? No worries! Check out our public GitHub repository to explore what's behind the scenes!
        </p>
        <a 
          href="https://github.com/SLuca-24/nft-marketplace" 
          target="_blank" 
          className="github-link"
        >
          Explore the GitHub Repository!
        </a>
      </footer>
    </div>
    </div>
  );
};

export default SmartContractInfo;
