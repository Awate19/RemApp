import React from "react";
import logo from "./logo.svg";
import Routes from "./components/route";
import Header from "./components/templates/header";
import Footer from "./components/templates/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navBar";
//import "./App.css";
function App() {
  return (
    <div>
      <Routes />
      <Footer />
    </div>
  );
}

export default App;
