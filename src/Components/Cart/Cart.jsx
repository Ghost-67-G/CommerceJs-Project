import React from "react";

const Cart = ({ cart, emptyCart, RemoveCart,quantityUpdate }) => {
  return (
    <div>
      <div className="toolHead" />
      <header className={`bg-light border px-5 py-4`}>
        <h1 className={`px-5`}>Shopping Cart</h1>
      </header>
      <button
        onClick={() => {
          emptyCart();
        }}
      >
        Empty Cart
      </button>
      <div className={`w-75 border m-auto`}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">IMAGE</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Remove</th>
              <th scope="col">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.line_items.map((item, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td className={`w-25`}>
                    <img className={`w-25`} src={item.image.url} alt="" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price.formatted_with_symbol}</td>
                  <td>
                    <button className={`border py-2 px-3`} onClick={()=>{quantityUpdate(item.id, item.quantity-1)}}>-</button>
                    <span className={`border px-3 py-2`}>
                      <input
                        className={`input width px-2`}
                        type="number"
                        value={item.quantity}
                      />
                    </span>
                    <button className={`border py-2 px-3`} onClick={()=>{quantityUpdate(item.id, item.quantity+1)}}>+</button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        RemoveCart(item.id);
                      }}
                      className={`btn btn-outline-danger`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fill-rule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </button>
                  </td>
                  <td>${item.quantity * item.price.raw}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={`px-5 d-flex`}>
           <h3 className={`px-5 text-center`}>SubTotal:</h3>
           <h3 className={`px-5`}>{cart.subtotal.formatted_with_symbol.split('.')[0]}</h3>
        </div>
        <button className={`w-100 btn btn-primary`}>Check Out</button>
      </div>
    </div>
  );
};

export default Cart;
