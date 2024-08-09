import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import light from "../assets/images/lighthouse.jpg";
import logo from "../assets/images/logoimg.svg";
import google from "../assets/images/geogle.svg";

const Register = () => {    
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const avatarRef = useRef("");

  function validate(username, email, password, avatar) {
    if (username.current.value.length < 3) {
      alert("username is not valid !");
      username.current.style.outlineColor = "red";
      username.current.focus();
      return false;
    }
    if (email.current.value.length < 3) {
      alert("email is not valid !");
      email.current.focus();
      email.current.style.outlineColor = "red";
      return false;
    }
    if (password.current.value.length < 3) {
      alert("password is not valid !");
      password.current.focus();
      password.current.style.outlineColor = "red";
      return false;
    }
    if (avatar.current.value.length < 3  || !avatar.current.value.startsWith("https://")) {
      alert("avatar is not valid ! It must start with 'https://'");
      avatar.current.focus();
      avatar.current.style.outlineColor = "red";
      return false;
    }
    return true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const isvalid = validate(nameRef, emailRef, passwordRef, avatarRef);
    if (!isvalid) {
      return;
    }

    const user = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      avatar: avatarRef.current.value,
    };
    localStorage.setItem('user', JSON.stringify(user));
    fetch("https://api.escuelajs.co/api/v1/users/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          alert("Siz muvaffaqiyatli royhatdan o'tdingiz");
          navigate("/save");
        }
      })    
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img src={light} alt="Lighthouse" className={styles.backgroundImage} />
      </div>

      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="UI Unicorn" className={styles.logo} />
            <h3 className={styles.logoText}>REGISTER</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <p className={styles.passwordText}>Name</p>
            <input
              type="text"
              ref={nameRef}
              placeholder="Username"
              className={styles.input}
              required
            />
            <p className={styles.loginText}>Email</p>
            <input
              type="text"
              ref={emailRef}
              placeholder="Email or phone number"
              className={styles.input}
              required
            />

            <div className={styles.passwordContainer}>
              <div className={styles.passwordText}>Password</div>
              <input
                type={showPassword ? "text" : "password"}
                ref={passwordRef}
                placeholder="Enter password"
                className={`${styles.input} ${styles.passwordInput}`}
                required
              />
              <button
                type="button"
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <p className={styles.loginText}>RasmURL</p>
            <input
              type="text"
              ref={avatarRef}
              placeholder="Avatar URL"
              className={styles.input}
              required
            />
            <button type="submit" className={styles.switchButton}>Sign Up</button>
          </form> 
        </div>
      </div>
    </div>
  );
};

export default Register;