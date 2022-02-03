import React from "react";

import img1 from "../public/images/1.jpeg";
import img2 from "../public/images/2.jpeg";
import img3 from "../public/images/3.jpeg";

const SlideImg = () => {
  return (
    <div className="container justify-content-center">
      <img
        className="img-responsive align-center"
        src={img1,img2}
        alt="Slide Image"
      />
    </div>
  );
};
export default SlideImg;
