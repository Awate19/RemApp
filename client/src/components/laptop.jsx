import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import Navbar from "./navBar";
import { getProductsByCategory } from "./productServices";
import Card from "./card";

const Laptop = () => {
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProducts = () => {
    getProductsByCategory("Laptop").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const show = () => {
    return (
      <div className="row">
        {productByArrival.map((product, i) => (
          <div key={i} className="col-md-3">
            <Card product={product} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout
      title="Laptop Shop"
      logo="true"
      className="container"
      description="Laptops"
    >
      {show()}
    </Layout>
  );
};
export default Laptop;
