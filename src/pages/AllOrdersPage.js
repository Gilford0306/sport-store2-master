import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllOrdersPage.css"; 
import API_BASE_URL from "../services/api";


function AllOrdersPage({ products = [], statuses = [] }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
               `${API_BASE_URL}/Order/GetAllOrdersByUser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (err) {
        setError("Ошибка при загрузке данных");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  const getProductDetailsById = (id) => {
    if (!products || products.length === 0)
      return { name: "Неизвестный продукт", image: "placeholder.jpg" };
    const product = products.find((p) => p.id === id);
    return product
      ? { name: product.name, image: product.image }
      : { name: "Неизвестный продукт", image: "placeholder.jpg" };
  };

  // Обновленная функция для преобразования статусов
  const getStatusNameById = (id) => {
    if (!statuses || statuses.length === 0) return "Неизвестный статус";
    const status = statuses.find((s) => s.Id === id);
    
    // Добавляем преобразование для нужных статусов
    if (status) {
      if (status.Name === "Pending") return "в обробці";
      if (status.Name === "None") return "скасовано";
      return status.Name;
    }

    return "Неизвестный статус";
  };

  return (
    <div className="all-orders-page">
      <h1>Мої замовлення</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Фото</th>
            <th>Назва товару</th>
            <th>Статус замовлення</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const productDetails = getProductDetailsById(order.ProductId);
            return (
              <tr key={order.Id}>
                <td>
                  <img
                    src={productDetails.image}
                    alt={productDetails.name}
                    className="product-image"
                  />
                </td>
                <td>{productDetails.name}</td>
                <td>{getStatusNameById(order.StatusId)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AllOrdersPage;
