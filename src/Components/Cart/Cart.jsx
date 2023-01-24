import React from "react";

const Cart = ({ cart }) => {
  return (
    <div>
      <div className="toolHead" />
      <header className={`bg-light border px-5 py-4`}>
        <h1 className={`px-5`}>Shopping Cart</h1>
      </header>
      <div className={`w-75 border m-auto`}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">IMAGE</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart.line_items.map((item, index) => {
              return (
                <tr>
                  <th scope="row">{index+1}</th>
                  <td className={`w-25`}><img className={`w-25`} src={item.image.url} alt="" /></td>
                  <td>{item.name}</td>
                  <td>{item.price.formatted_with_symbol}</td>
                  <td>
                    <button className={`border py-2 px-3`}>+</button>
                    <span className={`border px-3 py-2`}>
                        <input className={`input width px-2`} type="number" value={item.quantity}/>
                    </span>
                    <button className={`border py-2 px-3`}>-</button>
                    </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
