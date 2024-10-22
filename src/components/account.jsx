import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import './styles/account.scss'
import { IoHome } from "react-icons/io5";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { RiContractFill } from "react-icons/ri";
import { IoMdHelpCircle } from "react-icons/io";

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
      
      <Link to="/smart-contract-info">
      <div className={`icon-item ${location.pathname === '/smart-contract-info' ? 'active' : ''}`}>
        <RiContractFill />  
      </div>
      </Link>

      <Link to="/contact">
      <div className={`icon-item ${location.pathname === '/contact' ? 'active' : ''}`}>
        <IoMdHelpCircle />  
      </div>
      </Link>
    </div>
  );
};

export default Account;
