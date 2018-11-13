const httpLib = require("http");
const express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
require("dotenv").config();

const {
  check_login,
  get_service_list,
  save_service,
  delete_service,
  save_room_category,
  delete_room_category,
  get_room_categories,
  save_room,
  delete_room,
  get_rooms,
  save_order,
  get_order_info
} = require("../lib/service");

const app = express();
const http = httpLib.createServer(app);
app.use(bodyParser.json());

app.use(
  "/static",
  express.static(path.join(__dirname, "../../b-reservation/dist/static"))
);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../../b-reservation/dist/index.html"))
);

http.listen(process.env.PORT, () =>
  console.log("API listening on port ", process.env.PORT, "!")
);

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    let is_success = await check_login(username, password);
    res.json({ is_success: is_success });
  } catch (err) {
    res.json({ is_success: false, error: err });
  }
});

app.get("/api/get-service-list", async (req, res) => {
  try {
    const { is_active } = req.query;

    let services = await get_service_list(is_active);
    res.json({ services });
  } catch (err) {
    res.json({ services: [], error: err });
  }
});

app.post("/api/save-service", async (req, res) => {
  try {
    await save_service(req.body);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

app.post("/api/delete-service", async (req, res) => {
  try {
    console.log("deleting: ", req.body, req.body.id);
    await delete_service(req.body.id);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

/**
 * CATEGORY
 */

app.get("/api/get-room-categories", async (req, res) => {
  try {
    const { is_active } = req.query;

    let datas = await get_room_categories(is_active);
    res.json({ datas });
  } catch (err) {
    res.json({ datas: [], error: err });
  }
});

app.post("/api/save-room-category", async (req, res) => {
  try {
    await save_room_category(req.body);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

app.post("/api/delete-room-category", async (req, res) => {
  try {
    console.log("deleting: ", req.body, req.body.id);
    await delete_room_category(req.body.id);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

/**
 * ROOMS
 */
app.get("/api/get-rooms", async (req, res) => {
  try {
    const { is_active } = req.query;

    let datas = await get_rooms(is_active);
    res.json({ datas });
  } catch (err) {
    res.json({ datas: [], error: err });
  }
});

app.post("/api/save-room", async (req, res) => {
  try {
    await save_room(req.body);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

app.post("/api/delete-room", async (req, res) => {
  try {
    console.log("deleting: ", req.body, req.body.id);
    await delete_room(req.body.id);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

// get rooms and services
app.get("/api/get-room-and-service", async (req, res) => {
  try {
    let rooms = await get_rooms("Y");
    let services = await get_service_list("Y");
    console.log(rooms);
    console.log(services);
    res.json({ rooms, services });
  } catch (err) {
    console.log(err);
    res.json({ rooms: [], services: [], error: err });
  }
});

app.post("/api/save-order", async (req, res) => {
  try {
    await save_order(req.body);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

app.post("/api/get-order-info", async (req, res) => {
  try {
    console.log("calculating order: ", req.body);
    let datas = await get_order_info(req.body);
    res.json({ datas });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});
