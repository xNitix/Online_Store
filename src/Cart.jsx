import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [storedCartItems, setStoredCartItems] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    setStoredCartItems(cartItems || []);
  }, []);

  const removeFromCart = (index) => {
    const updatedCartItems = [...storedCartItems];
    updatedCartItems.splice(index, 1); // Usuwanie elementu z tablicy na danym indeksie
    setStoredCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Aktualizacja danych w localStorage
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <ul>
        {storedCartItems.length > 0 ? (
          storedCartItems.map((item, index) => (
            <li key={index}>
              {item.name} - {item.price}
              <button onClick={() => removeFromCart(index)}>Remove</button> {/* Dodanie przycisku usuwania */}
            </li>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </ul>
    </div>
  );
};

export default Cart;