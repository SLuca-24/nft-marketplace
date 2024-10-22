// App.js
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Home2 from './components/Home copy'
import Home3 from './components/home3'
import Account from './components/account'
import NFTInfo from './components/About';
import SmartContractInfo from './components/smart-contract'
import Contact from './components/Contact';
import Footer from './components/footer';
import PurchaseHistory from './components/purchaseHistory'
import { WalletProvider } from './components/context/WalletContext';
import './components/styles/app.scss';

function App() {
  return (
    <Router>
      <WalletProvider>
        <Header />
        <Account />

        <Routes>
          <Route path="/" element={<HomeWrapper />} />
          <Route path="/about" element={<NFTInfo />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route path="/smart-contract-info" element={<SmartContractInfo />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
         
        <Footer />
      </WalletProvider>
    </Router>
  );
}

function HomeWrapper() {
  return (
    <>
    <div className='home-container'>
      <Home />
      <Home2 />
    </div>
    <Home3 />
    </>
  );
}

export default App;
