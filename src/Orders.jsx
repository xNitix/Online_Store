import React, { useEffect, useState } from 'react';
import "./css/Orders.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders', {
          method: 'GET',
        });

        const data = await response.json();
        setOrders(data.orders);

      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div class="ordersDiv">
      <h1>Lista Zamówień</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order ID: {order.id}, User: {order.user_id}, Total Price: {order.total_price}, Dinosaur Names: {order.dinosaur_names}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;