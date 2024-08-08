import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../utils/api";
import styles from "../styles/Auth.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import light from "../assets/images/lighthouse.jpg";
import logo from "../assets/images/logoimg.svg";
import google from "../assets/images/geogle.svg";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const users = await getUsers();
      const user = users.find((u) => u.email === email);
      if (user) {
        localStorage.setItem("token", "fake_token");
        localStorage.setItem("userId", user.id);
        navigate("/admin");
      } else {
        alert("Foydalanuvchi topilmadi. Hisob malumotlaringizni tekshiring.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Xatolik yuz berdi. Iltimos, yana bir bor urinib ko'ring.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: email.split("@")[0],
          email,
          password,
          avatar: "https://api.lorem.space/image/face?w=640&h=480",
        }),
      });
      const data = await response.json();
      if (data.id) {
        alert("Roʻyxatdan oʻtish muvaffaqiyatli. Administrator paneliga yoʻnaltirilmoqda.");
        navigate("/admin");
      } else {
        alert("Ro‘yxatdan o‘tish amalga oshmadi. Iltimos, yana bir bor urinib ko'ring.");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("Ro'yxatdan o'tish paytida xatolik yuz berdi.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img src={light} alt="Lighthouse" className={styles.backgroundImage} />
      </div>

      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="UI Unicorn" className={styles.logo} />
            <h3 className={styles.logoText}>UI Unicorn</h3>
          </div>
          <h2 className={styles.welcomeText}>Nice to see you again</h2>
          <h3 className={styles.loginText}>Login</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or phone number"
              className={styles.input}
              required
            />

            <div className={styles.passwordContainer}>
            <div className={styles.passwordText}>Password</div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <div className={styles.rememberForgot}>
              <label className={styles.rememberMe}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className={styles.forgotPassword}>
                Forgot password?
              </a>
            </div>
           
            <button type="submit" className={styles.signInButton}>
             <p> Sign in</p>
            </button>
          </form>
          <button className={styles.googleButton}>
            <img src={google} alt="Google" className={styles.googleIcon} />
            <h5>Or sign in with Google</h5>
          </button>
          <p className={styles.signUpText}>
            Don't have an account?{" "}
            <button onClick={handleSignUp} className={styles.signUpButton}>
             <p>Sign up now</p>
            </button>
          </p>
        </div>
      </div>
    </div>
    
  );
};

export default Auth;
