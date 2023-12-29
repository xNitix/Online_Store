import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const response = await fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, confirmPassword, firstname, lastname })
    });

    const data = await response.json();
    if (response.ok) {
        // Pokazanie alertu o poprawnym utworzeniu konta
        alert('Konto zostało pomyślnie utworzone. Zaloguj się.');

        // Przekierowanie użytkownika na stronę logowania
        window.location.href = '/'; // Tutaj ustaw adres logowania
    } else {
        setError(data.msg);
    }
  };

  return (
    <div id="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Login"
          className="register-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Repeat password"
          className="register-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          className="register-input"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          className="register-input"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        {error && <p className="register-error">{error}</p>}
        <button type="submit" className="login-page-button">
          Zarejestruj się
        </button>
      </form>
    </div>
  );
};

export default Register;
