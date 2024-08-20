export const getAllOrders = async (token) => {
  try {
    const response = await fetch(
      "https://localhost:7000/api/Order/GetAllOrders",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Прочитайте текст ответа и выведите его в консоль
    const text = await response.text();
    console.log("Response text:", text);

    // Попробуйте проанализировать текст как JSON
    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Expected JSON but got something else");
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Error loading all orders:", error);
    throw error;
  }
};

// Функция для получения заказа по ID
export const getOrderById = async (id, token) => {
  try {
    const response = await fetch(
      `https://localhost:7000/api/Order/GetOrderById${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Expected JSON but got something else");
    }

    return await response.json();
  } catch (error) {
    console.error(`Error loading order with ID ${id}:`, error);
    throw error;
  }
};

// Функция для создания нового заказа
export const createOrder = async (orderData, token) => {
  try {
    const response = await fetch(
      "https://localhost:7000/api/Order/CreateOrder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Функция для обновления заказа
export const updateOrder = async (orderData, token) => {
  try {
    const response = await fetch(
      "https://localhost:7000/api/Order/UpdateOrder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

// Функция для изменения статуса заказа
export const changeOrderStatus = async (orderId, statusId, token) => {
  try {
    const response = await fetch(
      `https://localhost:7000/api/Order/ChangeStatusOrderWithId${orderId}&${statusId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error changing order status:", error);
    throw error;
  }
};

// Функция для получения всех статусов
export const getAllStatuses = async (token) => {
  try {
    const response = await fetch(
      "https://localhost:7000/api/Order/GetAllStatuses",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error loading all statuses:", error);
    throw error;
  }
};
