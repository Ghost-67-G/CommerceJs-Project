import React, { useState } from "react";
import { useEffect } from "react";
import { commerce } from "../lib/commerce";
import AdressForm from "./CheckoutForms/AdressForm";
import "./Checkout.css";
import Payment from "./CheckoutForms/Payment";

const Checkout = ({cart}) => {
  let [active, setActive] = useState(0);

  const [checkoutToken,setCheckoutToken] = useState(null)
  const [shippingData,setShippingData] = useState({})

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
    setActive((prev)=>prev+1);
  };
  const prevStep = () => {
    setActive((prev)=>prev-1);
  };
  const next = (data) =>{
    setShippingData(data)
    nextStep()
  }

  const Confirmation = ()=>{
    return <div>Hello</div>
  }

  const Form = ()=> active===0?<AdressForm checkoutToken={checkoutToken} next={next} /> : <Payment shippingData={shippingData} prevStep={prevStep} checkoutToken={checkoutToken} />

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
          <span className={active===2 ? `stepIndicator finish` : active? `stepIndicator active`:`stepIndicator`}>
            Payment
          </span>
        </div>
        {active===2 ? <Confirmation/> : checkoutToken && <Form />}

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
