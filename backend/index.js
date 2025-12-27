// backend/index.js
import express from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// --- ESM dirname ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- App ---
const app = express();
app.use(cors());
app.use(express.json());

// --- 確保 JSON 檔存在（Render 需要）---
const menuPath = path.join(__dirname, "menu.json");
const orderPath = path.join(__dirname, "orders.json");

if (!fs.existsSync(menuPath)) fs.writeFileSync(menuPath, "[]");
if (!fs.existsSync(orderPath)) fs.writeFileSync(orderPath, "[]");

// --- LowDB ---
const menuDB = new Low(new JSONFile(menuPath), []);
await menuDB.read();
menuDB.data ||= [];

const orderDB = new Low(new JSONFile(orderPath), []);
await orderDB.read();
orderDB.data ||= [];

// --- API ---
app.get("/menu", async (req, res) => {
  await menuDB.read();
  res.json(menuDB.data);
});

app.post("/menu", async (req, res) => {
  const { name, price } = req.body;

  if (!name || typeof price !== "number") {
    return res.status(400).json({ error: "資料格式錯誤" });
  }

  await menuDB.read();
  menuDB.data.push({ id: Date.now(), name, price });
  await menuDB.write();

  res.json({ success: true });
});

app.get("/orders", async (req, res) => {
  await orderDB.read();
  res.json(orderDB.data);
});

app.post("/orders", async (req, res) => {
  await orderDB.read();
  orderDB.data.push({ ...req.body, id: Date.now() });
  await orderDB.write();

  res.json({ success: true });
});

// --- 啟動 ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
