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

  const handleLogIn = () => {
    window.location.href = '/login';
  };

  return (
    <Router>
      <div className="top-container">
          <nav className="top-menu">
            <ul>
              <li>
                <Link to="/">Strona startowa </Link>
              </li>
              {!isAdmin && (
              <li>
                <Link to="/app">Products</Link>
              </li>
              )}
              {token && isAdmin && (
                <li>
                  <Link to="/users">Users</Link>
                </li>
              )}
              {token && isAdmin && (
                <li>
                  <Link to="/edit">ProductEdit</Link>
                </li>
              )}
              {token && isAdmin && (
                <li>
                  <Link to="/add">AddProduct</Link>
                </li>
              )}
              {token && !isAdmin && (
                <li>
                  <Link to="/Cart">Cart</Link>
                </li>
              )}
              {token && (
              <li className="logout-button">
                <button onClick={handleLogout}>Logout</button>
              </li>
              )}
              {!token && (
              <li className="login-button2">
                <button onClick={handleLogIn}>Login</button>
              </li>
              )}
            </ul>
          </nav>
      
        <Routes>
          {!isAdmin && <Route path="/app" element={<App />} />}
          {isAdmin && <Route path="/users" element={<Kot />} />}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {token && !isAdmin && <Route path="/Cart" element={<Cart />} />}
          <Route path="/" element={<h1>Witaj na stronie startowej!</h1>} />
          {token && isAdmin && <Route path="/edit" element={<Edit />} />}
          {token && isAdmin && <Route path="/add" element={<AddProduct />} />}
        </Routes>
      </div>
    </Router>
  );
};

export default Top;
