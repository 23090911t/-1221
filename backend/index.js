// backend/index.js
import express from "express";
import cors from "cors";
import { Low, JSONFile } from "lowdb";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ----- 確保 JSON 檔案存在 -----
const menuPath = path.join(__dirname, "menu.json");
const orderPath = path.join(__dirname, "orders.json");

if (!fs.existsSync(menuPath)) fs.writeFileSync(menuPath, "[]");
if (!fs.existsSync(orderPath)) fs.writeFileSync(orderPath, "[]");

// ----- LowDB 設定 -----
const menuDB = new Low(new JSONFile(menuPath));
await menuDB.read();
menuDB.data ||= [];

const orderDB = new Low(new JSONFile(orderPath));
await orderDB.read();
orderDB.data ||= [];

// ----- API -----
// 取得菜單
app.get("/menu", async (req, res) => {
  await menuDB.read();
  res.json(menuDB.data);
});

// 新增菜單
app.post("/menu", async (req, res) => {
  const { name, price } = req.body;
  if (!name || typeof price !== "number" || Number.isNaN(price)) {
    return res.status(400).json({ error: "資料格式錯誤" });
  }

  await menuDB.read();
  menuDB.data.push({ id: Date.now(), name, price });
  await menuDB.write();

  res.json({ success: true });
});

// 取得訂單
app.get("/orders", async (req, res) => {
  await orderDB.read();
  res.json(orderDB.data);
});

// 新增訂單
app.post("/orders", async (req, res) => {
  const order = { ...req.body, id: Date.now() };
  await orderDB.read();
  orderDB.data.push(order);
  await orderDB.write();
  res.json({ success: true });
});

// ----- 啟動 -----
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`後端啟動：http://localhost:${PORT}`);
});
