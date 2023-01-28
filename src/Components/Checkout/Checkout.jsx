import React, { useState } from "react";
import { useEffect } from "react";
import { commerce } from "../lib/commerce";
import AdressForm from "./AdressForm";
import "./Checkout.css";
import Payment from "./Payment";

const Checkout = ({cart}) => {
  let [active, setActive] = useState(false);

  const [checkoutToken,setCheckoutToken] = useState(null)

  useEffect(()=>{
    const generateToken = async ()=>{
    try{
        const token = await commerce.checkout.generateToken(cart.id,{type:'cart'})
        // console.log(token)
        setCheckoutToken(token)
      }catch(err){}
    }
    generateToken()
  },[cart])
  const nextStep = () => {
    setActive(true);
  };
  const prevStep = () => {
    setActive(false);
  };
  return (
    <div>
      <div className={`toolHead`} />
      <div className={`toolHead py-2`} />
      <div className="signUpForm">
        <h1 className="text-center fs-4">Checkout</h1>
        <div className="form-header d-flex mb-4">
          <span
            className={active ? `stepIndicator finish` : `stepIndicator active`}
          >
            Shipping Details
          </span>
          <span className={active ? `stepIndicator active` : `stepIndicator`}>
            Payment
          </span>
        </div>
        {active ? <Payment /> : checkoutToken && <AdressForm checkoutToken={checkoutToken} />}

        {/* <div className="form-footer d-flex">
          <button type="button" className="prevBtn" onClick={prevStep}>
            Previous
          </button>
          <button type="button" className="nextBtn" onClick={nextStep}>
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Checkout;
