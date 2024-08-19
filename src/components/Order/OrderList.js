// src/components/OrderList.js

import React, { useEffect, useState } from "react";
import { getAllOrders } from "../services/orderService";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getAllOrders();
        setOrders(orders);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrders();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!orders.length) return <div>Loading...</div>;

  return (
    <ul>
      {orders.map((order) => (
        <li
          key={order.Id}
        >{`Order ID: ${order.Id}, Amount: ${order.Amount}`}</li>
      ))}
    </ul>
  );
};

export default OrderList;
