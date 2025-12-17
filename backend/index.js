import express from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const app = express();
app.use(cors());
app.use(express.json());

// ----- LowDB 設定 -----
const menuAdapter = new JSONFile("./menu.json");
const menuDB = new Low(menuAdapter, []);  // 預設空陣列
await menuDB.read();
menuDB.data ||= [];

const orderAdapter = new JSONFile("./orders.json");
const orderDB = new Low(orderAdapter, []);
await orderDB.read();
orderDB.data ||= [];

// ----- API -----

// 取得所有菜單
app.get("/menu", async (req, res) => {
  await menuDB.read();
  res.json(menuDB.data);
});

// 新增菜單
app.post("/menu", async (req, res) => {
  const { name, price } = req.body;
  console.log("收到新增菜單:", req.body);

  // 正確驗證
  if (!name || typeof price !== "number" || Number.isNaN(price)) {
    return res.status(400).json({ error: "資料格式錯誤" });
  }

  await menuDB.read();
  menuDB.data ||= [];

  menuDB.data.push({
    id: Date.now(),
    name,
    price,
  });

  await menuDB.write();

  res.json({ success: true });
});

// 刪除菜單（移到 listen 之前）
app.delete("/menu/:id", async (req, res) => {
  const id = Number(req.params.id);

  await menuDB.read();
  menuDB.data = menuDB.data.filter(item => item.id !== id);
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
  const order = req.body;
  order.id = Date.now();

  orderDB.data.push(order);
  await orderDB.write();

  res.json({ success: true });
});

app.listen(3001, () => {
  console.log("後端啟動成功：http://localhost:3001");
});
