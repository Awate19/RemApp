import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { readProduct, relatedProducts } from "./apiServices";
import Card from "./card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState({});
  const loadSingleProduct = (productId) => {
    readProduct(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related
      }
    });
  };
  const loadRelatedProduct = (productId) => {
    relatedProducts(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setRelatedProduct(data);
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
    loadRelatedProduct(productId);
  }, []);
  return (
    <Layout
      title="Laptop Shop"
      logo="true"
      className="container"
      description="Online World to buy Laptops"
    >
      <div className="justify-content-center  mb-3 ml-10 ">
        {product && product.description && (
          <Card product={product} showButton={false} de={true} />
        )}
      </div>

      <div>
        <h2 className="mb-4">Related</h2>
        <div className="row">
          {relatedProduct.map((product, i) => (
            <div key={i} className="mb-3 col-lg-3 col-md-6 col-sm-12 col-xs-12">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
