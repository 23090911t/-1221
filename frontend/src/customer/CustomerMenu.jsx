// frontend/src/customer/CustomerMenu.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CustomerMenu() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:3001/menu")
      .then(res => {
        setMenu(res.data || []);
      })
      .catch(err => {
        console.error("抓菜單錯誤:", err);
        setMenu([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (item) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === item.id);
      if (exist) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
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
          {menu.map(item => (
            <div key={item.id} style={{ padding: 10, borderBottom: "1px solid #eee" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong>{item.name}</strong>
                  <div>NT$ {item.price}</div>
                </div>
                <div>
                  <button onClick={() => addToCart(item)}>加入購物車</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <button onClick={goCart}>前往購物車 ({cart.reduce((s, i) => s + i.quantity, 0)})</button>
      </div>
    </div>
  );
}
