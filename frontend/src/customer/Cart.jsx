// frontend/src/customer/Cart.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "https://1221.onrender.com";

export default function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = (location.state && location.state.cart) || [];

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const submitOrder = async () => {
    if (!cart.length) {
      alert("購物車是空的");
      return;
    }

    try {
      await axios.post(`${API_BASE}/orders`, {
        items: cart,
        createdAt: new Date().toISOString()
      });

      alert("訂單送出成功！");
      navigate("/customer");
    } catch (err) {
      console.error("送出訂單失敗", err);
      alert("訂單送出失敗，請稍後再試");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>購物車</h1>

      {cart.length === 0 ? (
        <p>購物車空空如也。</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{ borderBottom: "1px solid #eee", padding: 8 }}
            >
              <strong>{item.name}</strong> × {item.quantity} — NT$
              {item.price * item.quantity}
            </div>
          ))}

          <h3>總計：NT$ {total}</h3>

          <button onClick={submitOrder}>下訂單</button>
        </>
      )}
    </div>
  );
}
