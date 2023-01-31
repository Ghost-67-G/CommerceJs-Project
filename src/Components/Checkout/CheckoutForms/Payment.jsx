import React from "react";
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = ({
  shippingData,
  checkoutToken,
  prevStep,
  nextStep,
  onCaptureCheckout,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);

    let { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname: shippingData.FirstName,
          lastName: shippingData.LastName,
          email: shippingData.Email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.Address1,
          town_city: shippingData.City,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.ZipCode,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }
  };

  return (
    <div>
      <Review checkoutToken={checkoutToken} />
      <div className={`my-2 py-2`} />
      <h4>Payment Method</h4>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form
              onSubmit={(e) => {
                handleSubmit(e, elements, stripe);
              }}
            >
              <CardElement />
              <br /> <br />
              <div className={`d-flex justify-content-between`}>
                <p onClick={prevStep} className={`btn btn-outline-dark py-2`}>
                  Back
                </p>
                <button
                  type="submit"
                  className={`btn btn-primary py-0`}
                  disabled={!stripe}
                >
                  Pay {checkoutToken.subtotal.formatted_with_symbol}
                </button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default Payment;
