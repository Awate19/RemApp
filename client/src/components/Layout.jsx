import React from "react";
import NavBar from "./navBar";
import Laptop1 from "../public/images/1.jpeg";
import Laptop2 from "../public/images/2.jpeg";
import Laptop3 from "../public/images/3.jpeg";
import Laptop4 from "../public/images/4.jpeg";
const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
  logo = false,
}) => {
  const imageArray = [Laptop1, Laptop2, Laptop3, Laptop4];
  if (logo) {
    //var y = setInterval(slide, 5000);
  }

  /* function slide() {
    var x = document.getElementById("img1");
    for (let i = 0; i < imageArray.length; i++) {
      if (x.src === imageArray[i]) {
        var y = i + 1;
        if (y == imageArray.length) {
          y = 0;
        }
        x.src = imageArray[y];
        break;
      }
    }
  } */
  return (
    <div>
      <NavBar />

      <div className="jumbotron cloudy-knoxville-gradient ">
        <div>
          <h2>{title}</h2>
          {logo ? (
            <img
              id="img1"
              src={Laptop1}
              alt="Laptop Shop"
              style={{ height: "200px", width: "200px" }}
            />
          ) : null}
          <p className="lead">{description}</p>
        </div>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
