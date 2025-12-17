// frontend/src/components/ShopNav.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ShopNav() {
  const style = { marginRight: 12, textDecoration: "none" };
  return (
    <div style={{ padding: 10, background: "#f5f5f5", borderBottom: "1px solid #ddd" }}>
      <Link to="/shop" style={style}>新增菜品</Link>
      <Link to="/shop/orders" style={style}>訂單列表</Link>
      <Link to="/customer" style={style}>切換到顧客端</Link>
    </div>
  );
}
