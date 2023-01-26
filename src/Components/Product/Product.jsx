/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import style from "./Product.module.css";

const Product = ({ products, onAddToCart }) => {
  let [short, setShort] = useState([]);
  let [value, setValue] = useState("ALL");
  let [searchValue, setSearch] = useState("");
  let [flag, setFlag] = useState(false);
  let [flag2, setFlag2] = useState(false);
  let navigate = useNavigate();
  const catagorySorter = (e) => {
    if (e.target.value === "ALL") {
      setFlag2(false);
      return setShort(products);
    } else {
      short = products.filter((item) => {
        for (let catagory of item.categories) {
          if (catagory.name === e.target.value) return catagory;
        }
      });
      setShort(short);
      setFlag2(true);
    }
    setValue(e.target.value);
  };
  const searchVal = (e) => {
    searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    if (!searchValue) {
      setFlag(false);
      setFlag2(false);
    }
    // console.log(searchValue)
  };
  const search = () => {
    if (flag2) {
      short = short.filter((item) => {
        return searchValue.includes(item.name[0].toLowerCase());
      });
    } else {
      short = products.filter((item) => {
        return searchValue.includes(item.name[0].toLowerCase());
      });
    }
    console.log(short);
    setShort(short);
    setFlag(true);
  };
  return (
    <div>
      <div className="toolHead" />
      <header className={`d-flex border bg-light py-3 justify-content-around`}>
        <div className={`d-flex`}>
          <h3>Catagories :</h3>
          <select
            onChange={(e) => {
              catagorySorter(e);
            }}
            className={`fs-5 ms-2 border px-3 py-2`}
          >
            <option>ALL</option>
            <option>Tyre Changer</option>
            <option>Wheel Balancer</option>
            <option>Wheel Alignment</option>
          </select>
        </div>
        <div className={`ms-3 w-50`}>
          <div className={`float-end w-75`}>
            <input
              className={`input fs-6 w-75 py-2 mt-1 px-2 border rounded`}
              type="text"
              placeholder="Search Product"
              onChange={(e) => {
                searchVal(e);
              }}
            />
            <button
              onClick={search}
              className={`btn btn-secondary ms-3 px-3 fw-semibold py-2 `}
            >
              Search
            </button>
          </div>
        </div>
      </header>
      <div className={`row mt-4 gap-2 justify-content-center text-center`}>
        {(value !== "ALL" || flag ? short : products).map((item) => {
          return (
            <div
              className="col-md-4 col-sm-5 col-lg-3 border"
            >
              <div onClick={() => {
                navigate(`/productDetail/${item.id}`);
              }}>
                <img
                  className={`${style.img} mw-100 p-3`}
                  src={item.image.url}
                  alt=""
                />
              </div>
              <hr />
              <div className={`text-start px-2 py-2`}>
                <div onClick={() => {
                navigate(`/productDetail/${item.id}`);
              }}>

                <h5 role="button" className={`d-inline-block `}>{item.name}</h5>
                <h5 role="button" className={`float-end d-inline-block`}>
                  {item.price.formatted_with_symbol}
                </h5>
                </div>
                <div className="d-flex">
                  <p
                    className={`w-75`}
                    >
                    {item.description.replace('<p>',"").replace('</p>',"").split('.')[0]}
                    .
                  </p>
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
