// frontend/src/customer/Cart.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = (location.state && location.state.cart) || [];

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const submitOrder = () => {
    if (!cart.length) {
      alert("購物車是空的");
      return;
    }

    axios.post("http://localhost:3001/orders", { items: cart })
      .then(res => {
        alert("訂單送出成功！訂單編號: " + (res.data.orderId || ""));
        // 清空購物車後回菜單
        navigate("/customer");
      })
      .catch(err => {
        console.error(err);
        alert("訂單送出失敗");
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>購物車</h1>

      {cart.length === 0 ? (
        <p>購物車空空如也。</p>
      ) : (
        <>
          {cart.map(it => (
            <div key={it.id} style={{ borderBottom: "1px solid #eee", padding: 8 }}>
              <strong>{it.name}</strong> x {it.quantity} — NT$ {it.price * it.quantity}
            </div>
          ))}

          <h3>總計：NT$ {total}</h3>

          <button onClick={submitOrder}>下訂單</button>
        </>
      )}
    </div>
  );
}
