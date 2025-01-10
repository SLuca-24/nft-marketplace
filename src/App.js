// App.js
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './pages/Header.tsx';
import TopNft1 from './pages/TopNft1.tsx';
import TopNft2 from './pages/TopNft2.tsx'
import HomeOwnerInfo from './pages/HomeOwnerInfo.tsx'
import NavBar from './pages/NavBar.tsx'
import NFTInfo from './pages/NftInfo.jsx';
import TransferNft from './pages/TransferNft.jsx'
import Contact from './pages/Contact.tsx';
import Footer from './pages/Footer.tsx';
import PurchaseHistory from './pages/PurchaseHistory.jsx'
import NftGallery from './pages/NftGallery.tsx'
import { WalletProvider } from './components/context/WalletContext';
import { PurchaseProvider  } from './components/context/PurchaseContext';
import './components/styles/app.scss';

function App() {
  return (
    <Router>
      <WalletProvider>
        <PurchaseProvider >
        <Header />
        <NavBar />

        <Routes>
          <Route path="/" element={<HomeWrapper />} />
          <Route path="/about" element={<NFTInfo />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route path="/swap" element={<TransferNft />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<NftGallery />} />
        </Routes>
         
        <Footer />
      </PurchaseProvider >
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
