import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import Navbar from "./navBar";
import { getProductsByCategory } from "./productServices";
import Card from "./card";

const Monitor = () => {
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProducts = () => {
    getProductsByCategory("monitor").then((data) => {
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
          <div key={i} className="mb-3 col-md-3">
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
      description="Monitors"
    >
      {show()}
    </Layout>
  );
};
export default Monitor;
