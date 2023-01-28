import { createStore, combineReducers } from "redux";
import { commerce } from "../Components/lib/commerce";

let products = [];
let cart = { line_items: [], subtotal: { formatted_with_symbol: "0.00" } };

function productSection(oldData = products, newData) {
  if (newData.type === "FETCH_PRODUCTS") {
    oldData = newData.data;
  }
  return [...oldData];
}
function cartSection(oldData = cart, newData) {
  const emptyCart = async () => {
    oldData = await commerce.cart.empty();
  };
  const RemoveCart = async (lineItemId) => {
    oldData = await commerce.cart.remove(lineItemId);
  };
  const quantityUpdate = async (lineItemId, newQuantity) => {
    oldData = await commerce.cart.update(lineItemId, { quantity: newQuantity });
  };
  const handleAddToCart = async (productId, quantity) => {
    let item = await commerce.cart.add(productId, quantity);
    oldData = item;
  };
  if (newData.type === "FETCH_CART") {
    oldData = newData.data;
  }else if(newData.type === 'ADD_TO_CART'){
    handleAddToCart(newData.data.id, newData.data.qty)
  }else if(newData.type === "EMPTYCART"){
    emptyCart()
  }else if(newData.type === "QUANTITY_UPDATE"){
    quantityUpdate(newData.data.id,newData.data.qty)
  }else if(newData.type === "REMOVE_ITEM"){
    RemoveCart(newData.data)
  }

  return { ...oldData };
}

let allShelve = combineReducers({ productSection, cartSection });
let store = createStore(
  allShelve,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
