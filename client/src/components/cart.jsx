import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./navBar";
import { getCart } from "./cartMethods";
import Card from "./card";
import Layout from "./Layout";
//import Checkout from './Checkout';;
const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        <div className="row">
          {items.map((product, i) => (
            <div key={i} className="mb-3 col-md-3">
              <Card
                key={i}
                removeButton={true}
                cartButton={false}
                cartUpdate={true}
                product={product}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const noItemsMessage = () => <h2>Your cart is empty.</h2>;

  return (
    <Layout
      title="Laptop Shop"
      logo="true"
      className="container"
      description="Online World to buy Laptops"
    >
      {items.length > 0 ? showItems(items) : noItemsMessage}
    </Layout>
  );
};

export default Cart;
