import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import Error from './pages/Error';
import Save from './pages/Save';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/save" element={<Save />} />
          <Route path = "*" element={<Error/>}></Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;