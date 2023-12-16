import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import Kot from "./Kot";
import Edit from "./Edit";
import Login from "./login";
import Register from "./Register";
import './css/Top.css'

const Top = () => {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <div className="top-container">
        {token && (
          <nav className="top-menu">
            <ul>
              <li>
                <Link to="/welcome">Strona startowa</Link>
              </li>
              <li>
                <Link to="/app">Products</Link>
              </li>
              <li>
                <Link to="/kot">Kot</Link>
              </li>
              <li>
                <Link to="/edit">ProductEdit</Link>
              </li>
            </ul>
          </nav>
        )}

        <Routes>
          <Route path="/register" element={<Register />} />
          {token && (
          <Route path="/app" element={<App />} />
          )}
          {token && (
          <Route path="/kot" element={<Kot />} />
          )}
          <Route path="/" element={<Login />} />
          {token && (
          <Route path="/welcome" element={<h1>Witaj na stronie startowej!</h1>} />
          )}
          {token && (
          <Route path="/edit" element={<Edit />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default Top;