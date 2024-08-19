import React, { createContext, useState, useEffect, useContext } from 'react';
import { Order, Status, Delivery, Payment } from '../Order/OrderClass';

const OrderContext = createContext();

const fetchData = async (url, key, Class, update = false) => {
  let response;
  try {
    const ArrayString = localStorage.getItem(key);
    if (ArrayString != null) {
      response = JSON.parse(ArrayString);
    }
    if (ArrayString == null || response.length === 0 || update) {
      response = await fetch(url).then(res => res.json());
    }
    return response.map(item => new Class(item.Id, item.Name));
  } catch (error) {
    console.error(`Error fetching ${Class.name.toLowerCase()}s:`, error);
    return [];
  }
};

const saveArrayToLocalStorage = (key, ClassArray) => {
  try {
    const ArrayString = JSON.stringify(ClassArray);
    localStorage.setItem(key, ArrayString);
  } catch (error) {
    console.error('Error saving array object to localStorage:', error);
  }
};



const getActualOrders = async () => {
  try {
    const response = await fetch('/Order/GetOrdersByUserIdAndStatusId2').then(res => res.json());
    return response.map(Data => new Order(Data.Id, Data.ProductId, Data.UserId, Data.StatusId, Data.Amount)) || [];
  } catch (error) {
    console.error('Error fetching actual orders by statusId=2 (OrderContext):', error);
    return [];
  }
};

const saveNewOrder = async (productId) => {
  try {
    const order = new Order(0, productId, '1', 2, 1);
    await fetch('/Order/CreateOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
  } catch (error) {
    console.error('Error saving new order:', error);
  }
};

const getAllOrders = async (update = true) => {
  try {
    const ArrayData = await fetch('/Order/GetAllOrdersByUser').then(res => res.json());
    if (ArrayData)
      return ArrayData.map(Data => new Order(Data.Id, Data.ProductId, Data.UserId, Data.StatusId, Data.Amount));
    else
      return [];
  } catch (error) {
    console.error('Error loading all orders:', error);
    return [];
  }
};

const changeOrder = async (order, statusId, amount) => {
  try {
    if (order) {
      order.statusId = statusId;
      order.amount = amount;
      await fetch('/Order/UpdateOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
    }
  } catch (error) {
    console.error('Error saving changed order:', error);
  }
};

const createDelivery = async (OrderId, StatusId = 2, Address, Additionally) => {
  try {
    if (OrderId && Address) {
      const delivery = new Delivery(0, 'userid', StatusId, OrderId, Address, Additionally, new Date());
      await fetch('/Delivery/CreateDelivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(delivery),
      });
    }
  } catch (error) {
    console.error('Error creating delivery:', error);
  }
};

const createPayment = async (OrderId, Summ, StatusId = 2, Amount) => {
  try {
    if (OrderId && Summ) {
      const payment = new Payment(0, OrderId, Summ, StatusId, Amount);
      await fetch('/Payment/CreatePayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payment),
      });
    }
  } catch (error) {
    console.error('Error creating payment:', error);
  }
};

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [actualOrders, setActualOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [orderList, statusList, actualOrderList] = await Promise.all([
          getAllOrders(),
          fetchData('/Order/GetAllStatuses', 'Status', Status),
          getActualOrders(),
        ]);

        setOrders(orderList);
        saveArrayToLocalStorage('Order', orderList);
        setStatuses(statusList);
        saveArrayToLocalStorage('Status', statusList);
        setActualOrders(actualOrderList);
      } catch (error) {
        console.error('Error loading order data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <OrderContext.Provider value={{
      orders, statuses, actualOrders, saveNewOrder, createDelivery, createPayment,
      changeOrder, getActualOrders, getAllOrders, setActualOrders,
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext, OrderProvider };
