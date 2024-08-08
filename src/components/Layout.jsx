import React from 'react';
import '../styles/global.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <h1>My Login vs Register App</h1>
      </header>
      <main>{children}</main>
      <div className="text-center">
        
      </div>
    </div>
  );
};

export default Layout;