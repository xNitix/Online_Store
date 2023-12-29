import { useState } from 'react';
import './css/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      const token = data.token;
      localStorage.setItem('token', token);
      window.location.href = '/';
    } else {
      setError(data.msg);
    }
  };

  return (
  <div>
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Login"
        className="login-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Hasło"
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="login-error">{error}</p>}
      <button type="submit" className="login-button">
        Zaloguj się
      </button>

        <Link to="/register">
        <button className="register-button">
          Register
        </button>
        </Link>
    </form>

  </div>
  );
};

export default Login;