import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = ({ products, onAddToCart }) => {
  let param = useParams();
  let [quantity,setQTY] = useState(1)
  let product = products.filter((item) => item.id === param.id);
  console.log(product);
  return (
    <div>
      <div className="toolHead" />
      {/* <div className="toolHead py-3"></div> */}
      <div className={`container bg-light gap-5 w-75 text-center  p-3`}>
        <div className={`col-6 border m-auto bg-white px-5`}>
          <img className={`w-100`} src={product[0].image.url} alt="" />
        </div>
        <div className={`col-7 m-auto`}>
          <h1>{product[0].name}</h1>
          <h3>{product[0].price.formatted_with_symbol}</h3>
          <h3 className={`text-start`}>Catagories:</h3>
          <div className={`d-flex flex-wrap w-75 ms-5`}>
            {product[0].categories.map((item) => {
              return (
                <div
                  className={`bg-secondary rounded-pill p-2 fs-6 fw-semibold text-white`}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
          <p className={`my-3`}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
            similique nostrum, magnam natus molestiae pariatur veniam repellat
            consequatur assumenda, aspernatur enim cupiditate ad error
            asperiores accusamus nemo reiciendis ullam debitis!
          </p>
          <div>
            <button className={`border py-2 px-3`} onClick={()=>{setQTY(quantity+1)}}>+</button>
            <input
              className={`input py-1 mx-2 width px-2`}
              type="number"
              value={quantity}
            />
            <button className={`border py-2 px-3`} onClick={()=>{setQTY(quantity-1)}}>-</button>
          </div>
          <div className={`py-4`}>
            <button
              onClick={() => {
                onAddToCart(product[0].id, quantity);
              }}
              className={`w-25 mx-2 btn btn-primary`}
            >
              Add To Cart
            </button>
            <button className={`w-25 mx-2 btn btn-primary`}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
