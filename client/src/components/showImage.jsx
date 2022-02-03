import React from "react";
//import Img from "react-image";
/**
 * THIS METHOD THAT SHOW A PRODUCT
 * @param {*} param0 
 */
const ShowImage = ({ item, url }) => {
  const myComponent = () => (
    <img
      alt={item.name}
      style={{ maxHeight: "40%", maxWidth: "50%" }}
      className="mb-3"
      src={`/api/${url}/photo/${item._id}`}
    />
  );

  return <div className="product-img text-center center">{myComponent()}</div>;
};

export default ShowImage;
