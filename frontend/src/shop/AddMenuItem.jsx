// frontend/src/shop/AddMenuItem.jsx
import React, { useState } from "react";
import axios from "axios";

export default function AddMenuItem({ onAddSuccess }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const submit = () => {
 if (name.trim() === "" || price === "") {
  alert("請填寫名稱與價格");
  return;
}

    axios
      .post("http://localhost:3001/menu", { name, price: Number(price) })
      .then((res) => {
        alert("新增成功");
        setName("");
        setPrice("");
        if (onAddSuccess) onAddSuccess(); // 加入回呼通知 ShopHome 重新載入
      })
      .catch((err) => {
        console.error(err);
        alert("新增失敗");
      });
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
