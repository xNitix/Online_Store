import React, { useEffect, useState } from 'react';
import './css/Orders.css';

const Cart = () => {
  const [storedCartItems, setStoredCartItems] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    setStoredCartItems(cartItems || []);
  }, []);

  const removeFromCart = (index) => {
    const updatedCartItems = [...storedCartItems];
    updatedCartItems.splice(index, 1);
    setStoredCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Missing JWT token');

      return;
    }

    const orderData = {
      dinosaur_ids: storedCartItems.map(item => item.id), 
    };

    fetch('http://127.0.0.1:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      try {
        const jsonData = JSON.parse(data);
        console.log('Order created:', jsonData);
        alert('Zlozono zamowienie!');
        setStoredCartItems([]);
        localStorage.removeItem('cartItems');
      } catch (error) {
        console.error('Error parsing JSON:', error);

      }
    })
    .catch(error => {
      console.error('Error creating order:', error);
   
    });
  };

  return (
    <div className="ordersDiv">
      <h1>Shopping Cart</h1>
      <ul>
        {storedCartItems.length > 0 ? (
          storedCartItems.map((item, index) => (
            <li key={index}>
              {item.name} - {item.price}$
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </li>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </ul>
      {storedCartItems.length > 0 && (
        <button className='DownButton' onClick={handleCheckout}>Checkout</button>
      )}
    </div>
  );
};

export default Cart;
