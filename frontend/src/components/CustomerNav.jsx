// frontend/src/components/CustomerNav.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function CustomerNav() {
  const style = { marginRight: 12, textDecoration: "none" };
  return (
    <div style={{ padding: 10, background: "#f5f5f5", borderBottom: "1px solid #ddd" }}>
      <Link to="/customer" style={style}>菜單</Link>
      <Link to="/customer/cart" style={style}>購物車</Link>
      <Link to="/shop" style={style}>切換到店家端</Link>
    </div>
  );
}
