// App.js
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/pages/Header';
import TopNft1 from './components/pages/Top-Nft-1';
import TopNft2 from './components/pages/Top-Nft-2'
import HomeOwnerInfo from './components/pages/Home-Owner-Info'
import NavBar from './components/pages/NavBar'
import NFTInfo from './components/pages/Nft-Info';
import SmartContractInfo from './components/pages/SmartContracts-Info-Page'
import Contact from './components/pages/Contact';
import Footer from './components/pages/Footer';
import PurchaseHistory from './components/pages/PurchaseHistory'
import NftGallery from './components/pages/Nft-Gallery'
import { WalletProvider } from './components/context/WalletContext';
import './components/styles/app.scss';

function App() {
  return (
    <Router>
      <WalletProvider>
        <Header />
        <NavBar />

        <Routes>
          <Route path="/" element={<HomeWrapper />} />
          <Route path="/about" element={<NFTInfo />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route path="/smart-contract-info" element={<SmartContractInfo />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<NftGallery />} />
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
      <TopNft1 />
      <TopNft2 />
    </div>
      <HomeOwnerInfo />
    </>
  );
}

export default App;
