// frontend/src/customer/CustomerMenu.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 固定菜單資料（前端）
import menuData from "../data/menu.json";

export default function CustomerMenu() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 載入固定菜單（不依賴後端）
  useEffect(() => {
    setMenu(menuData || []);
    setLoading(false);
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const goCart = () => {
    navigate("/customer/cart", { state: { cart } });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>菜單</h1>

      {loading ? (
        <p>載入中…</p>
      ) : menu.length === 0 ? (
        <p>目前沒有菜單。</p>
      ) : (
        <div>
          {menu.map((item) => (
            <div
              key={item.id}
              style={{
                padding: 10,
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <strong>{item.name}</strong>
                <div>NT$ {item.price}</div>
              </div>
              <div>
                <button onClick={() => addToCart(item)}>
                  加入購物車
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <button onClick={goCart}>
          前往購物車（
          {cart.reduce((sum, item) => sum + item.quantity, 0)}
          ）
        </button>
      </div>
    </div>
  );
}
