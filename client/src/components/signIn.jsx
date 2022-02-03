import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "./templates/header";
import userImg from "../public/images/user.png";
import keyImg from "../public/images/key.png";
import NavBar from "./navBar";
import { signin, authenticate } from "./apiServices";
const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    role: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer, role } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            role: data.user.role,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (role == "1") {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
  };
  const signInForm = () => (
    <form
      className="text-center border border-light p-5 mt-5"
      style={{ backgroundColor: "#c5c222", borderRadius: 30 }}
      onSubmit={clickSubmit}
    >
      <p className="h4 mb-4">Log In</p>
      <br />
      <p className="text-danger" style={{ display: error ? "" : "none" }}>
        {error}
      </p>
      <input
        onChange={handleChange("email")}
        value={email}
        type="email"
        id="defaultLoginFormEmail"
        className="form-control mb-4"
        placeholder="E-mail"
        style={{
          paddingLeft: 25,
          borderRadius: 15,
          margin: 1,
          background: `url(${userImg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
        }}
      />
      <input
        onChange={handleChange("password")}
        value={password}
        type="password"
        id="defaultLoginFormPassword"
        className="form-control mb-4"
        placeholder="Password"
        style={{
          paddingLeft: 25,
          borderRadius: 15,
          margin: 1,
          background: `url(${keyImg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left",
        }}
      />
      <div className="d-flex justify-content-around">
        <div></div>
      </div>
      <button
        onClick={clickSubmit}
        className="btn btn-info btn-block"
        type="submit"
        style={{ borderRadius: 30, backgroundColor: "green" }}
      >
        Log In
      </button>
      <p>
        Not a member?
        <Link to="/signup">Sign Up</Link>
      </p>
    </form>
  );

  return (
    <div className="d-flex justify-content-center">
      {signInForm()}
      {redirectUser()}
    </div>
  );
};

export default Signin;
