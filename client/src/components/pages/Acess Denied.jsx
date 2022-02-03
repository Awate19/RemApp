import React, { Component } from "react";
import Navbar from "../navBar";
const AcessDenied = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="ml-2 mb-2">
        <h1>400 - Access Denied</h1>
        <p>I'm sorry, the page you were looking for cannot be found!</p>
      </div>
    </React.Fragment>
  );
};

export default AcessDenied;
