import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Admin.module.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await handleLogin();
    } else {
      await handleSignUp();
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        navigate('/admin');
      } else {
        alert('Tizimga kirishda xatolik yuz berdi. Hisob malumotlaringizni tekshiring.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Tizimga kirishda xatolik yuz berdi.');
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: email.split('@')[0], 
          email,
          password,
          avatar: 'https://api.lorem.space/image/face?w=640&h=480'
        }),
      });
      const data = await response.json();
      if (data.id) {
        alert('Royxatdan otish muvaffaqiyatli. Iltimos, tizimga kiring.');
        setIsLogin(true);
      } else {
        alert('Royxatdan otish amalga oshmadi. Iltimos, yana bir bor urinib koring.');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      alert('Royxatdan otish paytida xatolik yuz berdi.');
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <div className={styles.passwordContainer}>
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
        </div>
        <button type="submit" className={styles.submitButton}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <p className={styles.switchMode}>
        {isLogin ? "Royhatdan otish" : "Tizimga kirish"}
        <button onClick={() => setIsLogin(!isLogin)} className={styles.switchButton}>
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default Auth;