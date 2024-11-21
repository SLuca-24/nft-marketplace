import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import '../styles/nav-bar.scss'
import { IoHome } from "react-icons/io5";
import { BiSolidPurchaseTag } from "react-icons/bi"
import { LuGalleryVerticalEnd } from "react-icons/lu";
import { PiSwapBold } from "react-icons/pi";

const Account = () => {
  const location = useLocation();

  return (
<div className="icon-bar">

<Link to="/">
      <div className={`icon-item ${location.pathname === '/' ? 'active' : ''}`}>
      <IoHome />
      </div>
      </Link>

    <Link to="/purchase-history">
    <div className={`icon-item ${location.pathname === '/purchase-history' ? 'active' : ''}`}>
      <BiSolidPurchaseTag />
      </div>
      </Link>
      
      <Link to="/swap">
      <div className={`icon-item ${location.pathname === '/swap' ? 'active' : ''}`}>
      <PiSwapBold />
      </div>
      </Link>

      <Link to="/gallery">
      <div className={`icon-item ${location.pathname === '/gallery' ? 'active' : ''}`}>
      <LuGalleryVerticalEnd />  
      </div>
      </Link>
    </div>
  );
};

export default Account;
