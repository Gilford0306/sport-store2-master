import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllOrdersPage.css"; // Подключите CSS стили для страницы

function AllOrdersPage({ products = [], statuses = [] }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://localhost:7000/api/Order/GetAllOrdersByUser",
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

  const getStatusNameById = (id) => {
    if (!statuses || statuses.length === 0) return "Неизвестный статус";
    const status = statuses.find((s) => s.Id === id);
    return status ? status.Name : "Неизвестный статус";
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
