import React, { Component, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import "./signup.css";

export default function Signup() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    if (secretKey != "86CVNQ8kB4") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();
      setLoading(true)
      console.log(fname, lname, email, password);
      fetch("http://localhost:7700/adminregister", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fname,
          email,
          lname,
          password
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("adminUserRegister", data);
          if (data.status == "ok") {
           // alert("Registration Successful");
           console.log("Registration Successful")
           window.location.href = "./";
          } else {
            //alert("Something went wrong");
            console.log("Something went wrong")
          }
        });
        setLoading(false)
    }
  };

  return (
    <>
    {loading && (
      <div className='container2 show popup2'>
          <Spinner animation="border border-sm text-primary" role="status" >
              <span className="visually-hidden">Loading...</span>
          </Spinner>
      </div>
    )}
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div className="mb-3">
            <label>Secret Key</label>
            <input
              type="text"
              className="form-control"
              placeholder="Secret Key"
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              SignUp
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">Login?</a>
          </p>
        </form>
      </div>
    </div>
    </>
  );
}