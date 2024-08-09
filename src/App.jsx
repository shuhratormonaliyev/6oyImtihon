import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Auth from './pages/Auth';

import Error from './pages/Error';
import Save from './pages/Save';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/auth" element={<Auth />} />
         
          <Route path="/save" element={<Save />} />
          <Route path="/register" element={<Register />} />
          <Route path = "*" element={<Error/>}></Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;