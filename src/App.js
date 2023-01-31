import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Components/Product/Product";
import { commerce } from "./Components/lib/commerce";
import { useEffect, useState } from "react";
import Cart from "./Components/Cart/Cart";
import Checkout from "./Components/Checkout/Checkout";
import ProductDetails from "./Components/ProductDetails/ProductDetails";

function App() {
  let [products, setProducts] = useState([]);
  let [cart, setCart] = useState({line_items:[],subtotal:{formatted_with_symbol:'0.00'}});
  let [order,setOrder] = useState({})
  let [errormsg,setErrormsg] = useState('')

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

  const refreshCart = async ()=>{
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }

  const handleCaptureCheckout = async(checkoutTokenId, newOrder)=>{
    try{
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incomingOrder)
      refreshCart()
    }catch(error){
      setErrormsg(error.data.error.message)
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
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
          <Route path="/productDetail/:id" element={<ProductDetails onAddToCart={handleAddToCart} products={products}/>} />
          <Route path="/checkout" element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errormsg} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
