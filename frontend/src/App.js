// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// customer
import CustomerMenu from "./customer/CustomerMenu";
import Cart from "./customer/Cart";
import CustomerNav from "./components/CustomerNav";

// shop
import AddMenuItem from "./shop/AddMenuItem";
import OrderList from "./shop/OrderList";
import ShopNav from "./components/ShopNav";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* root -> show a simple choice page */}
        <Route path="/" element={<Navigate to="/customer" replace />} />

        {/* customer */}
        <Route
          path="/customer"
          element={
            <>
              <CustomerNav />
              <CustomerMenu />
            </>
          }
        />
        <Route
          path="/customer/cart"
          element={
            <>
              <CustomerNav />
              <Cart />
            </>
          }
        />

        {/* shop */}
        <Route
          path="/shop"
          element={
            <>
              <ShopNav />
              <AddMenuItem />
            </>
          }
        />
        <Route
          path="/shop/orders"
          element={
            <>
              <ShopNav />
              <OrderList />
            </>
          }
        />
      </Routes>
    </Router>
  );
}
