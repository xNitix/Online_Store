import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import UsersList from './UsersList';
import Edit from './Edit';
import Login from './login';
import Register from './Register';
import AddProduct from './AddProduct';
import Cart from './Cart';
import Orders from './Orders';
import Dino from './DinoArkPage';
import './css/Top.css';
import { jwtDecode } from 'jwt-decode';
import './css/Cart.css';


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
    localStorage.clear();
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
              <Link to="/"><img src="src/jpg/icon-home-button.png" alt="Edit Icon" className='TopMenuIcons' /></Link>
              </li>
              {!isAdmin && (
              <li>
                <Link to="/app"><img src="src/jpg/icon-produkty.png" alt="Edit Icon" className='TopMenuIcons' /></Link>
              </li>
              )}
              {token && isAdmin && (
                <li>
                  <Link to="/users"><img src="src/jpg/icon-user.png" alt="Edit Icon" className='TopMenuIcons' /></Link>
                </li>
              )}
              {token && isAdmin && (
                <li>
                  <Link to="/edit"><img src="src/jpg/icon-edit.png" alt="Edit Icon" className='TopMenuIcons' /></Link>
                </li>
              )}
              {token && isAdmin && (
                <li>
                  <Link to="/add"><img src="src/jpg/icon-add-file.png" alt="Edit Icon" className='TopMenuIcons' /></Link>
                </li>
              )}
              {token && !isAdmin && (
                <li>
                  <Link to="/Cart"><img src="src/jpg/icon-cart.png" alt="Edit Icon" className='TopMenuIcons' /></Link>
                </li>
              )}
              {token && isAdmin && (
                <li>
                  <Link to="/orders"><img src="src/jpg/icon-costam.png" alt="Edit Icon" className='TopMenuIcons' /></Link>
                </li>
              )}
              {token && (
              <li className="logout-button">
                <button onClick={handleLogout}>Logout</button>
              </li>
              )}
              {!token && (
              <li className="logout-button">
                <button onClick={handleLogIn}>Login</button>
              </li>
              )}
            </ul>
          </nav>
      
        <Routes>
          {!isAdmin && <Route path="/app" element={<App />} />}
          {isAdmin && <Route path="/users" element={<UsersList />} />}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {token && !isAdmin && <Route path="/Cart" element={<Cart />} />}
          <Route path="/" element={<Dino />} />
          {token && isAdmin && <Route path="/edit" element={<Edit />} />}
          {token && isAdmin && <Route path="/add" element={<AddProduct />} />}
          {isAdmin && <Route path="/orders" element={<Orders />} />}
        </Routes>
      </div>
    </Router>
  );
};

export default Top;
