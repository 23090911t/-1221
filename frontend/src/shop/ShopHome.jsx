import React, { useEffect, useState } from "react";
import axios from "axios";
import AddMenuItem from "./AddMenuItem";

export default function ShopHome() {
  const [menu, setMenu] = useState([]);

  const loadMenu = () => {
    axios.get("http://localhost:3001/menu")
      .then(res => setMenu(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const deleteItem = (id) => {
    if (!window.confirm("確定要刪除嗎？")) return;

    axios.delete(`http://localhost:3001/menu/${id}`)
      .then(() => loadMenu())
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>店家端後台</h1>

      <h2>新增菜品</h2>
      <AddMenuItem onAddSuccess={loadMenu} />

      <h2 style={{ marginTop: 20 }}>目前菜單</h2>

      {menu.map(item => (
        <div key={item.id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 8 }}>
          {item.name} — NT$ {item.price}
          <button
            style={{ marginLeft: 10 }}
            onClick={() => deleteItem(item.id)}
          >
            刪除
          </button>
        </div>
      ))}
    </div>
  );
}
