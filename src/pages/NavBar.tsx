import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import '../components/styles/nav-bar.scss'
import { IoHome } from "react-icons/io5";
import { BiSolidPurchaseTag } from "react-icons/bi"
import { LuGalleryVerticalEnd } from "react-icons/lu";
import { PiSwapBold } from "react-icons/pi";

const Account: React.FC  = () => {
  const location = useLocation();

  return (
<div className="icon-bar">

<Link to="/">
      <div className={`icon-item ${location.pathname === '/' ? 'active' : ''}`} title="Home">
      <IoHome />
      <span className="nav-label">Home</span>
      </div>
      </Link>

    <Link to="/purchase-history">
    <div className={`icon-item ${location.pathname === '/purchase-history' ? 'active' : ''}`} title="Purchase History">
      <BiSolidPurchaseTag />
      <span className="nav-label">History</span>
      </div>
      </Link>
      
      <Link to="/swap">
      <div className={`icon-item ${location.pathname === '/swap' ? 'active' : ''}`} title="Transfer Nft's">
      <PiSwapBold />
      <span className="nav-label">Transfer</span>
      </div>
      </Link>

      <Link to="/gallery">
      <div className={`icon-item ${location.pathname === '/gallery' ? 'active' : ''}`} title="Nft's Gallery">
      <LuGalleryVerticalEnd /> 
      <span className="nav-label">Gallery</span>
      </div>
      </Link>
    </div>
  );
};

export default Account;
