import express from "express";
import cors from "cors";
import { Low, JSONFile } from "lowdb";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// --- LowDB 設定 ---
const menuAdapter = new JSONFile(path.join(__dirname, "menu.json"));
const menuDB = new Low(menuAdapter);
await menuDB.read();
menuDB.data ||= [];

const orderAdapter = new JSONFile(path.join(__dirname, "orders.json"));
const orderDB = new Low(orderAdapter);
await orderDB.read();
orderDB.data ||= [];

// --- API ---
app.get("/menu", async (req, res) => {
  await menuDB.read();
  res.json(menuDB.data);
});

app.post("/menu", async (req, res) => {
  const { name, price } = req.body;
  if (!name || typeof price !== "number") return res.status(400).json({ error: "資料格式錯誤" });

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
  const order = { ...req.body, id: Date.now() };
  await orderDB.read();
  orderDB.data.push(order);
  await orderDB.write();
  res.json({ success: true });
});

// --- 啟動 ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`後端啟動：http://localhost:${PORT}`));
