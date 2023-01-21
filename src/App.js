import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Components/Product/Product";
import { commerce } from "./Components/lib/commerce";
import { useEffect, useState } from "react";

function App() {
  let [products, setProducts] = useState([]);
  let [cart, setCart] = useState({});

  const fetchProducts = async () => {
    let { data } = await commerce.products.list();
    setProducts(data);
  };
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    let item = await commerce.cart.add(productId, quantity)
    setCart(item);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  console.log(products);
  console.log(cart);
  return (
    <div>
      <BrowserRouter>
        <NavBar items={cart.total_items?cart.total_items:0}/>
        <Routes>
          <Route
            path="/"
            element={
              <Product onAddToCart={handleAddToCart} products={products} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
