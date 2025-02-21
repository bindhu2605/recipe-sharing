import React, { useState } from "react";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setShowError(true);
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === email.toLowerCase());

    if (userExists) {
      toast.warn("User already exists. Try with a different email.");
      return;
    }

    // Create new user
    const newUser = { name, email: email.toLowerCase(), password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Registration successful!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  };

  return (
    <div className="SignupContainer">
      <form onSubmit={handleSubmit}>
        <h2>SignUp</h2>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {showError && (
        <span className="fill-fields-error">Please fill all the fields</span>
      )}
      <ToastContainer />
    </div>
  );
};

export default Register;