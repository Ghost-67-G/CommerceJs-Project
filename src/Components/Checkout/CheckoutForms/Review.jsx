import React from 'react'

const Review = ({checkoutToken}) => {
  console.log(checkoutToken)
  return (
    <div>
      <h3 className={`py-3`}>Order Summary</h3>
      <div>
        {checkoutToken.line_items.map((item)=>{
          return (
        <div className='d-flex py-2 justify-content-between align-items-end'>
          <div>
          <h5>{item.name}</h5> 
          <h6 className={`text-secondary ms-2 fs-5`}>Quantity: <span className={`fs-6`}>{item.quantity}</span></h6>
          </div>
          <div>
            <h6 className={`fs-5`}>{item.price.formatted_with_symbol}</h6>
          </div>
        </div>  
          )
        })}
        <div className={`mt-3`}>
          <h4>Total</h4>
          <h4>{checkoutToken.total.formatted_with_symbol}</h4>
        </div>
      </div>
    </div>
  )
}

export default Review