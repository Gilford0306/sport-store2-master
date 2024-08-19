// src/services/orderService.js

const API_URL = "https://localhost:7000/api/Order";

// Получите токен из localStorage или контекста
const getAuthToken = () => localStorage.getItem("authToken");

const fetchWithAuth = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  return response.json();
};

export const getAllOrders = () => fetchWithAuth(`${API_URL}/GetAllOrders`);

export const getOrderById = (id) =>
  fetchWithAuth(`${API_URL}/GetOrderById${id}`);

export const createOrder = (order) =>
  fetchWithAuth(`${API_URL}/CreateOrder`, {
    method: "POST",
    body: JSON.stringify(order),
  });

export const updateOrder = (order) =>
  fetchWithAuth(`${API_URL}/UpdateOrder`, {
    method: "POST",
    body: JSON.stringify(order),
  });

export const changeOrderStatus = (orderid, statusid) =>
  fetchWithAuth(`${API_URL}/ChangeStatusOrderWithId${orderid}&${statusid}`, {
    method: "POST",
  });
