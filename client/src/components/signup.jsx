import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "./apiServices";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <form
      className="text-center border border-light p-5 mt-5 "
      style={{ backgroundColor: "#c5c222", borderRadius: 30 }}
      onSubmit={clickSubmit}
    >
      <p className="h4 mb-4">Sign Up</p>
      <p className="text-success" style={{ display: success ? "" : "none" }}>
        New account is created. Please <Link to="/signin">Signin</Link>{" "}
      </p>
      <p className="text-danger" style={{ display: error ? "" : "none" }}>
        {error}
      </p>
      <input
        onChange={handleChange("name")}
        style
        value={name}
        type="text"
        required
        style={{ borderRadius: 15 }}
        id="defaultLoginFormEmail"
        className="form-control mb-4"
        placeholder="Name"
      />

      <input
        onChange={handleChange("email")}
        value={email}
        type="email"
        required
        style={{ borderRadius: 15 }}
        id="defaultLoginFormEmail"
        className="form-control mb-4"
        placeholder="E-mail"
      />
      <input
        onChange={handleChange("password")}
        value={password}
        type="password"
        required
        style={{ borderRadius: 15 }}
        id="defaultLoginFormPassword"
        className="form-control mb-4"
        placeholder="Password"
      />
      <div className="d-flex justify-content-around">
        <div></div>
      </div>
      <button
        onClick={clickSubmit}
        className="btn btn-info btn-block my-4"
        type="submit"
        style={{ borderRadius: 15 }}
      >
        Sign Up
      </button>
      <p>
        Already a member?
        <Link to="/signin">Log In</Link>
      </p>
    </form>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return <div className="d-flex justify-content-center">{signUpForm()} </div>;
};

export default Signup;

/*
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center">
        <form
          className="text-center border border-light p-5 mt-5 "
          style={{ backgroundColor: "#c5c222", borderRadius: 30 }}
        >
          <p className="h4 mb-4">Sign Up</p>
          <input
            type="text"
            required
            id="defaultLoginFormEmail"
            className="form-control mb-4"
            placeholder="Name"
            style={{ borderRadius: 15 }}
          />

          <input
            type="email"
            required
            id="defaultLoginFormEmail"
            className="form-control mb-4"
            placeholder="E-mail"
            style={{ borderRadius: 15 }}
          />
          <input
            type="password"
            required
            id="defaultLoginFormPassword"
            className="form-control mb-4"
            placeholder="Password"
            style={{ borderRadius: 15 }}
          />
          <div className="d-flex justify-content-around">
            <div></div>
          </div>
          <button
            className="btn btn-info btn-block my-4"
            type="submit"
            style={{ borderRadius: 30, backgroundColor: "green" }}
          >
            Sign Up
          </button>
          <p>
            Already a member?
            <Link to="/signin">Log In</Link>
          </p>
        </form>
      </div>
    </React.Fragment>
  );
};
export default Signup;*/
