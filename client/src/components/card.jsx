import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./showImage";
// moment from "moment";
import { addItem, removeItem, updateItem } from "./cartMethods";
const Card = ({
  product,
  removeButton = false,
  cartUpdate = false,
  cartButton = true,
  showButton = true,
  de = false,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
/**
 * THIS DEFINE WHETHER WE HAVE A PRODUCT OR NOT ,IF WE HAVE DISPLAYS GREEN AND IF NOT DISPLAYS THE BADGE IN RED COLOR
 * @param {Number} qu 
 */
  const showStock = (qu) => {
    return qu > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-danger badge-pill">Out of Stock</span>
    );
  };
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const showAddToCartButton = (qu) => {
    if (qu > 0) {
      return (
        cartButton && (
          <div id="btt" onClick={addToCart} className="ui positive button">
            Add to cart
          </div>
        )
      );
    } else {
      return (
        cartButton && <div className="ui negative button">Out of Stock</div>
      );
    }
  };
  const handleChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };
  const showCartUpdate = () => {
    return (
      cartUpdate && (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
            <input
              type="number"
              value={count}
              onChange={handleChange(product._id)}
              className="form-control ml-3"
              style={{ width: "60px" }}
            />
          </div>
        </div>
      )
    );
  };
  const showCartRemove = () => {
    return (
      removeButton && (
        <button
          onClick={() => removeItem(product._id)}
          className="btn btn-outline-dark-green"
        >
          {" "}
          Remove
        </button>
      )
    );
  };
  
  
  return (
    <div className="card">
      <div className="card-header bg-dark text-white">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <p className="lead mt-2 responsive">
          {de === false
            ? product.description.substring(0, 60) + "..."
            : product.description}
        </p>
        <p className="black-10 lead text-success">Br {product.price}</p>
        <p className="black-9">Category: {product.category}</p>
        {showStock(product.quantity)} <br />
        <br />
        <div className="ui two buttons">
          {showButton && (
            <Link
              className="ui basic green button"
              to={`/product/${product._id}`}
            >
              View Product
            </Link>
          )}
          {showAddToCartButton(product.quantity)}
        </div>
        <hr />
        {showCartUpdate()}
        {showCartRemove()}
      </div>
    </div>
  );
};

export default Card;
