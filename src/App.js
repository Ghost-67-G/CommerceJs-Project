import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Components/Product/Product";
import { commerce } from "./Components/lib/commerce";
import { useEffect, useState } from "react";
import Cart from "./Components/Cart/Cart";
import Checkout from "./Components/Checkout/Checkout";

function App() {
  let [products, setProducts] = useState([]);
  let [cart, setCart] = useState({line_items:[],subtotal:{formatted_with_symbol:'0.00'}});

  const fetchProducts = async () => {
    let { data } = await commerce.products.list();
    setProducts(data);
  };
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    let item = await commerce.cart.add(productId, quantity);
    setCart(item);
  };
  const emptyCart=async()=>{
    setCart(await commerce.cart.empty())
  }
  const RemoveCart=async(lineItemId)=>{
    setCart(await commerce.cart.remove(lineItemId))
  }
  const quantityUpdate= async(lineItemId, newQuantity)=>{
    setCart(await commerce.cart.update(lineItemId, { quantity: newQuantity }))
  }
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  console.log(products);
  console.log(cart);
  return (
    <div>
      <BrowserRouter>
        <NavBar items={cart.total_items ? cart.total_items : 0} />
        <Routes>
          <Route
            path="/"
            element={
              <Product onAddToCart={handleAddToCart} products={products} />
            }
          />
          <Route path="/cart" element={<Cart cart={cart} emptyCart={emptyCart} RemoveCart={RemoveCart} quantityUpdate={quantityUpdate}/>} />
          <Route path="/checkout" element={<Checkout />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
