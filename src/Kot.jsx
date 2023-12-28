import React, { useState, useEffect } from 'react';
import "./css/Kot.css";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  
  const changeRole = async (userId, newRole) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/persons/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAdmin: newRole === 'Admin' }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          return { ...user, isAdmin: newRole === 'Admin' };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/persons');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data.persons);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista użytkowników</h1>
      <table>
        <thead>
          <tr>
            <th>Login</th>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rola</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.login}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>
                {user.isAdmin ? (
                  <span>Admin</span>
                ) : (
                  <select
                    value={user.isAdmin ? 'Admin' : 'User'}
                    onChange={e => changeRole(user.id, e.target.value)}
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
