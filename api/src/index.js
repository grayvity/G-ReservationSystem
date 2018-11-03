const httpLib = require("http");
const express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
require("dotenv").config();

const { check_login } = require("../lib/service");

const app = express();
const http = httpLib.createServer(app);
app.use(bodyParser.json());

app.use(
  "/static",
  express.static(path.join(__dirname, "../../gu-reservation/dist/static"))
);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../../gu-reservation/dist/index.html"))
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

app.post("/api/get_service_list", async (req, res) => {
  try {
    const { is_active } = req.query;

    let services = await get_service_list(is_active);
    res.json({ services });
  } catch (err) {
    res.json({ services: [], error: err });
  }
});
