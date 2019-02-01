const httpLib = require("http");
const express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var moment = require("moment");

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
  get_order_info,
  get_orders,
  get_report,
  get_filter_data,
  get_dashboard_data,
  get_user_list,
  delete_users,
  save_user
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

app.get("/dashboard", (req, res) =>
  res.sendFile(path.join(__dirname, "../../b-reservation/dist/index.html"))
);

app.get("/orders", (req, res) =>
  res.sendFile(path.join(__dirname, "../../b-reservation/dist/index.html"))
);

http.listen(process.env.PORT, () =>
  console.log("API listening on port ", process.env.PORT, "!")
);

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    let response = await check_login(username, password);
    res.json({ response });
  } catch (err) {
    res.json({ response: false, error: err });
  }
});

app.get("/api/get-dashboard-data", async (req, res) => {
  try {
    let data = await get_dashboard_data();
    let parser = require('xml2json');
    let rp = require('request-promise');
    let forecasts = []

    var constants = require('../lib/constant');

    rp('http://tsag-agaar.gov.mn/forecast_xml')
      .then(function (htmlString) {
        var json = JSON.parse(parser.toJson(htmlString));

        let city = 'Улаанбаатар';

        var found = json.xml.forecast5day.find(
          function (data) { return data.city == city }
        );

        // console.log(found.data[0].weather);
        found.data.weather.map(x => {
          forecasts.push(
            {
              date: x.date,
              dayOfWeek: moment(x.date).locale('mn').format("ddd"),
              dayOfWeekLong: moment(x.date).locale('mn').format("dddd"),
              temperatureDay: x.temperatureDay,
              temperatureNight: x.temperatureNight,
              phenoDay: x.phenoDay,
              phenoIdDay: x.phenoIdDay,
              imgClass: constants.weathers[x.phenoIdDay]
            })
        });

        res.json({ data, forecasts, todayWeather: forecasts[0] });
      })
      .catch(function (err) {
        console.log('WEATHER ERROR', err);
        res.json({ data, forecasts, todayWeather: {}, error: err.message });
      });

  } catch (err) {
    console.log(err)
    res.json({ data: [], error: err.message });
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
app.post("/api/get-room-and-service", async (req, res) => {
  try {
    let order_info = await get_order_info(req.body);
    let rooms = await get_rooms("Y");
    let services = await get_service_list("Y");
    res.json({ order_info, rooms, services });
  } catch (err) {
    console.log(err);
    res.json({ order_info: {}, rooms: [], services: [], error: err });
  }
});

app.post("/api/save-order", async (req, res) => {
  try {
    let order_id = await save_order(req.body);
    res.json({ order_id });
  } catch (err) {
    console.log(err);
    res.json({ order_id: null, error:err });
  }
});

app.post("/api/get-order-info", async (req, res) => {
  try {
    let datas = await get_order_info(req.body);
    res.json({ datas });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

app.post("/api/get-orders", async (req, res) => {
  try {
    let datas = await get_orders(req.body);
    res.json({ datas });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

app.post("/api/get-filter-data", async (req, res) => {
  try {
    let datas = await get_filter_data(req.body);
    res.json({ datas });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

app.post("/api/get-report", async (req, res) => {
  try {
    let datas = await get_report(req.body);
    res.json({ datas });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

/**
 * USERS
 */

app.get("/api/get-users", async (req, res) => {
  try {
    let datas = await get_user_list();
    res.json({ datas });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

app.post("/api/save-user", async (req, res) => {
  try {
    await save_user(req.body);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});

app.post("/api/delete-user", async (req, res) => {
  try {
    console.log("deleting: ", req.body, req.body.id);
    await delete_users(req.body.id);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false, error: err });
  }
});