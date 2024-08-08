import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Error.module.css';

const Error = ({ message }) => {
  return (
    <div className={styles.error}>
      <p>Error: {message}</p>
      <Link to="/"><button><h3>Home Sahifasiga Otish</h3></button></Link>
      <Link to="/admin"><button><h4>Admin Sahifasiga Otish</h4></button></Link>
    </div>
  );
};

export default Error;