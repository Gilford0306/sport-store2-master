import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [userId, setUserId] = useState(null);

  // Загрузка данных из localStorage при инициализации
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      const storedCartItems = localStorage.getItem(`cartItems-${storedUserId}`);
      const storedSelectedItems = localStorage.getItem(
        `selectedItems-${storedUserId}`
      );

      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
      if (storedSelectedItems) {
        setSelectedItems(JSON.parse(storedSelectedItems));
      }
    }
  }, []);

  // Сохранение данных в localStorage при изменении состояния
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`cartItems-${userId}`, JSON.stringify(cartItems));
      localStorage.setItem(
        `selectedItems-${userId}`,
        JSON.stringify(selectedItems)
      );
    }
  }, [cartItems, selectedItems, userId]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setSelectedItems((prevSelected) =>
      prevSelected.filter((item) => item.id !== id)
    );
  };

  const updateItemChecked = (id, checked) => {
    setSelectedItems((prevSelected) => {
      if (checked) {
        return [...prevSelected, cartItems.find((item) => item.id === id)];
      } else {
        return prevSelected.filter((item) => item.id !== id);
      }
    });
  };

  const setUser = (id) => {
    setUserId(id);
    localStorage.setItem("userId", id);

    // Загрузка данных корзины для нового пользователя
    const storedCartItems = localStorage.getItem(`cartItems-${id}`);
    const storedSelectedItems = localStorage.getItem(`selectedItems-${id}`);

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else {
      setCartItems([]); // Если данных нет, устанавливаем пустой массив
    }

    if (storedSelectedItems) {
      setSelectedItems(JSON.parse(storedSelectedItems));
    } else {
      setSelectedItems([]); // Если данных нет, устанавливаем пустой массив
    }
  };

  const logout = () => {
    console.log("Logout function called");
    setCartItems([]);
    setSelectedItems([]);
    localStorage.removeItem("userId");
    if (userId) {
      localStorage.removeItem(`cartItems-${userId}`);
      localStorage.removeItem(`selectedItems-${userId}`);
    }
    setUserId(null);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(`cartItems-${userId}`);
    localStorage.removeItem(`selectedItems-${userId}`);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        selectedItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateItemChecked,
        setUser,
        logout, // Добавляем logout в контекст
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
