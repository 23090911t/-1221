// frontend/src/shop/OrderList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:3001/orders")
      .then(res => setOrders(res.data || []))
      .catch(err => {
        console.error(err);
        setOrders([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>訂單列表（店家端）</h1>

      {loading ? (
        <p>載入中…</p>
      ) : orders.length === 0 ? (
        <p>目前沒有訂單。</p>
      ) : (
        orders.map(o => (
          <div key={o.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
            <div><strong>訂單 #{o.id}</strong> — {new Date(o.createdAt).toLocaleString()}</div>
            <ul>
              {o.items.map((it, idx) => (
                <li key={idx}>{it.name} x {it.quantity} — NT$ {it.price * it.quantity}</li>
              ))}
            </ul>
            <div>總計：NT$ {o.total}</div>
            <div>狀態：{o.status}</div>
          </div>
        ))
      )}
    </div>
  );
}
