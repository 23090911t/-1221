// frontend/src/shop/AddMenuItem.jsx
import React, { useState } from "react";
import axios from "axios";

const API_BASE = "https://1221.onrender.com";

export default function AddMenuItem({ onAddSuccess }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const submit = async () => {
    if (name.trim() === "" || price === "") {
      alert("請填寫名稱與價格");
      return;
    }

    try {
      await axios.post(`${API_BASE}/menu`, {
        name: name.trim(),
        price: Number(price)
      });

      alert("新增成功");
      setName("");
      setPrice("");

      if (onAddSuccess) onAddSuccess();
    } catch (err) {
      console.error("新增菜品失敗", err);
      alert("新增失敗，請確認後端是否正常");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>新增菜品（店家端）</h1>

      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="名稱"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="價格"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <button onClick={submit}>新增</button>
    </div>
  );
}
