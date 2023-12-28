// Top.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import Kot from './Kot';
import Edit from './Edit';
import Login from './login';
import Register from './Register';
import AddProduct from './AddProduct';
import Cart from './Cart';
import './css/Top.css';
import { jwtDecode } from 'jwt-decode';

const Top = () => {
  const token = localStorage.getItem('token');
  let isAdmin = false;

  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    isAdmin = decodedToken && decodedToken.isAdmin ? true : false;
    console.log(isAdmin);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="top-container">
        {token && (
          <nav className="top-menu">
            <ul>
              <li>
                <Link to="/welcome">Strona startowa </Link>
              </li>
              <li>
                <Link to="/app">Products</Link>
              </li>
              {isAdmin && (
                <li>
                  <Link to="/users">Users</Link>
                </li>
              )}
              {isAdmin && (
                <li>
                  <Link to="/edit">ProductEdit</Link>
                </li>
              )}
              {isAdmin && (
                <li>
                  <Link to="/add">AddProduct</Link>
                </li>
              )}
              <li>
                <Link to="/Cart">Cart</Link>
              </li>
              <li className="logout-button">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </nav>
        )}

        <Routes>
          {token && <Route path="/app" element={<App />} />}
          {isAdmin && <Route path="/users" element={<Kot />} />}
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/Cart" element={<Cart />} />
          {token && <Route path="/welcome" element={<h1>Witaj na stronie startowej!</h1>} />}
          {token && <Route path="/edit" element={<Edit />} />}
          {token && <Route path="/add" element={<AddProduct />} />}
        </Routes>
      </div>
    </Router>
  );
};

export default Top;
