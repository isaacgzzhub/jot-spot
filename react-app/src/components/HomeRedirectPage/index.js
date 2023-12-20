import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import "./HomeRedirectPage.css";

function HomeRedirectPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    history.push("/");
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@example.com", "password"));
    if (data) {
      setErrors(data);
    }
    history.push("/");
  };

  return (
    <div class="area">
      <div className="home-redirect-container">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <h1 className="home-page-title">Log in to JotSpot</h1>
        <form className="home-page-form" onSubmit={handleSubmit}>
          <ul className="error-list">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label className="form-label">
            Email
            <div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="form-label">
            Password
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </label>
          <div className="form-buttons">
            <button type="submit" className="login-button">
              Log In
            </button>

            <div className="signup-button-container">
              <OpenModalButton
                buttonText="Sign up"
                modalComponent={<SignupFormModal />}
              />
            </div>

            <button
              className="demo-button"
              type="button"
              onClick={handleDemoLogin}
            >
              Demo User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomeRedirectPage;
