import React, { useState } from "react";
import "./Popup.scss";
import venomLogo from "./BioVenom.png";

const TransactionPopover = (props) =>{
    const gasFee = 0.001

  return (
    <div className="popover-container">
      <div className="popover">
        <div className="popover-header">
              <img src={venomLogo} alt="Banana Logo" onClick={() => window.open('https://www.bananawallet.xyz/', '_blank')}/>
        </div>

        <div className="popover-information">
          
          
          <div className="popover-amount">
              {props.amount} Venom 
          </div>  
          <div className="popover-to-container">
              <h2>From: {props.from.slice(0,5)}...{props.from.slice(-5)} </h2>
          </div>
          <div className="popover-from-container">
              <h2>To: {props.to.slice(0,5)}...{props.to.slice(-5)} </h2>
          </div>

          <div className="popover-message-container">
              <h2>Message: {props.message} </h2>
          </div>
        
          <div className="footer-gas-fee">
              <h3>Gas Fee: {gasFee} Venom</h3>  
          </div>  
          <div  className="footer-total">
              <h1>Total:{ parseFloat(props.amount) + gasFee} Venom </h1>
          </div>
          <div className = "footer-message">
              <p>(incl. {gasFee} Venom gas fee)</p>
          </div>
        </div>

        <div className="popover-buttons">
            <button className="popover-confirm-button" onClick={()=>props.onConfirm(true)}>Confirm</button>
            <button className="popover-reject-button" onClick={()=>props.onConfirm(false)}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPopover;
