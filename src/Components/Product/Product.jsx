/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Product = ({ products, onAddToCart }) => {
  return (
    <div>
      <div className="toolHead" />
      <header className={`d-flex border bg-light py-3 justify-content-around`}>
        <div className={`d-flex`}>
          <h3>Catagories :</h3>
          <select className={`fs-5 ms-2 border px-3 py-2`}>
            <option value="">ALL</option>
            <option value="">Action</option>
            <option value="">Action</option>
            <option value="">Action</option>
            <option value="">Action</option>
          </select>
        </div>
        <form className={`ms-3 w-50`}>
          <div className={`float-end w-75`}>
            <input
              className={`input fs-6 w-75 py-2 mt-1 px-2 border rounded`}
              type="text"
              placeholder="Search Product"
            />
            <button className={`btn btn-secondary ms-3 px-3 fw-semibold py-2 `}>
              Search
            </button>
          </div>
        </form>
      </header>
      <div className={`row mt-4 gap-4 justify-content-center text-center`}>
        {products.map((item) => {
          return (
            <div className="col-md-4 col-sm-5 col-lg-3 border">
              <div>
                <img className="w-100 h-100 p-3" src={item.image.url} alt="" />
              </div>
              <hr />
              <div className={`text-start px-2 py-2`}>
                <h5 className={`d-inline-block`}>{item.name}</h5>
                <h5 className={`float-end d-inline-block`}>
                  {item.price.formatted_with_symbol}
                </h5>
                <div className="d-flex">
                  <p
                    dangerouslySetInnerHTML={{ __html: item.description }}
                    className={`w-75`}
                  ></p>
                  <div className={`w-25`}>

                  <button
                    onClick={() => {
                        onAddToCart(item.id, 1);
                    }}
                    className={`btn border float-end w-50 p-1 p-0`}
                    >
                    <img
                      className={`w-100`}
                      src="./Asserts/Cart.png"
                      alt=""
                      />
                  </button>
                      </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;