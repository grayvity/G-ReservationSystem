const { runQuery, createConnection } = require("./storage");
const { creatNewId } = require("./tools");
// import { runQuery, createConnection } from "./storage.js";

async function check_login(username, password) {
  const connection = await createConnection();

  let query = `select username, password from users where username = ? and password = ?`;
  const found = await runQuery({
    connection,
    query,
    params: [username, password]
  });
  console.log(found);
  if (found.length > 0) {
    return true;
  }

  return false;
}

// orders.vue
async function get_order_list(begindate, enddate) {
  const connection = await createConnection();

  let query = `select username, password from order a  where username = ? and password = ?;`;
  const found = await runQuery({
    connection,
    query,
    params: [begindate, enddate]
  });

  if (found.length > 0) {
    return true;
  }

  return false;
}

async function get_service_list(isActive) {
  const connection = await createConnection();

  let query = `select * from service`;
  let params = [];

  if (isActive) {
    query += " where is_active = ?";
    params = [isActive];
  }

  const service_list = await runQuery({
    connection,
    query,
    params
  });

  return service_list;
}

async function save_service(info) {
  try {
    const connection = await createConnection();
    let query = "";
    let params = [];
    // update
    if (info.id != null) {
      console.log(info);
      query = `update service set type = ?, name = ?, description = ?, price = ?, is_active = ? where id = ?`;
      params = [
        info.type,
        info.name,
        info.description,
        info.price,
        info.is_active ? "Y" : "N",
        info.id
      ];
      // insert
    } else {
      query = `insert into service (type, name, description, price, is_active) values(?, ?, ?, ?, ?)`;
      params = [
        info.type,
        info.name,
        info.description,
        info.price,
        info.is_active ? "Y" : "N"
      ];
      console.log(query, params);
    }

    await runQuery({
      connection,
      query,
      params: params
    });
  } catch (err) {
    throw err;
  }
}

async function delete_service(id) {
  try {
    console.log("Deleting service");
    const connection = await createConnection();
    let query = "";

    // delete
    if (id != null) {
      query = `delete from service where id = ?`;
      await runQuery({
        connection,
        query,
        params: [id]
      });
      return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
}

/**
 * ROOM GATEGORY
 */

async function get_room_categories(isActive) {
  const connection = await createConnection();

  let query = `select * from room_category`;
  let params = [];

  if (isActive) {
    query += " where is_active = ?";
    params = [isActive];
  }

  const service_list = await runQuery({
    connection,
    query,
    params
  });

  return service_list;
}

async function save_room_category(info) {
  try {
    const connection = await createConnection();
    let query = "";
    let params = [];
    // update
    if (info.id != null) {
      console.log(info);
      query = `update room_category set name = ?, is_active = ? where id = ?`;
      params = [info.name, info.is_active ? "Y" : "N", info.id];
      // insert
    } else {
      query = `insert into room_category (name, is_active) values(?, ?)`;
      params = [info.name, info.is_active ? "Y" : "N"];
      console.log(query, params);
    }

    await runQuery({
      connection,
      query,
      params: params
    });
  } catch (err) {
    throw err;
  }
}

async function delete_room_category(id) {
  try {
    console.log("Deleting room_category");
    const connection = await createConnection();
    let query = "";

    // delete
    if (id != null) {
      query = `delete from room_category where id = ?`;
      await runQuery({
        connection,
        query,
        params: [id]
      });
      return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
}

/**
 * ROOM
 */
async function get_rooms(isActive) {
  try {
    const connection = await createConnection();

    let query = `select a.*, b.name as category_name from room a
      left join room_category b on a.category_id = b.id `;
    let params = [];

    if (isActive) {
      query += " where a.is_active = ?";
      params = [isActive];
    }

    const service_list = await runQuery({
      connection,
      query,
      params
    });
    return service_list;
  } catch (err) {
    throw err;
  }
}

async function save_room(info) {
  try {
    console.log("saving room...", info);
    const connection = await createConnection();
    let query = "";
    let params = [];
    // update
    if (info.id != null) {
      console.log(info);
      query = `update room set name = ?, category_id = ?, person_limit = ?, price = ?, is_active = ?, note = ? where id = ?`;
      params = [
        info.name,
        info.category_id,
        info.person_limit,
        info.price,
        info.is_active ? "Y" : "N",
        info.note,
        info.id
      ];
      // insert
    } else {
      query = `insert into room (name, category_id, person_limit, price, is_active, note) values(?, ?, ?, ?, ?, ?)`;
      params = [
        info.name,
        info.category_id,
        info.person_limit,
        info.price,
        info.is_active ? "Y" : "N",
        info.note
      ];
      console.log(query, params);
    }

    await runQuery({
      connection,
      query,
      params: params
    });
  } catch (err) {
    throw err;
  }
}

async function delete_room(id) {
  try {
    console.log("Deleting room");
    const connection = await createConnection();
    let query = "";

    // delete
    if (id != null) {
      query = `delete from room where id = ?`;
      await runQuery({
        connection,
        query,
        params: [id]
      });
      return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
}
async function get_order_info(search_info) {
  try {
    console.log("get_order_info service");
    if (search_info.begindate > search_info.enddate) {
      throw "Wrong date:";
    }
    range_days = [];
    begindate = new Date(search_info.begindate);
    enddate = new Date(search_info.enddate);
    current_date = begindate;

    var weekday = new Array(7);
    weekday[0] = "Ням";
    weekday[1] = "Дав";
    weekday[2] = "Мяг";
    weekday[3] = "Лха";
    weekday[4] = "Пүр";
    weekday[5] = "Баа";
    weekday[6] = "Бям";
    while (current_date <= enddate) {
      cur_day =
        current_date.getUTCMonth() + 1 + "/" + current_date.getUTCDate();
      range_days.push({
        date: current_date,
        day: cur_day,
        weekday: weekday(current_date.getDay())
      });
      current_date = current_date + 1;
    }
    orders = [
      {
        roomName: "ger#1",
        begindate: "2018/11/10",
        enddate: "2018/11/12",
        order_status: 1,
        note: "bla"
      },
      {
        roomName: "ger#2",
        begindate: "2018/11/11",
        enddate: "2018/11/12",
        order_status: 2,
        note: "bla"
      },
      {
        roomName: "ger#2",
        begindate: "2018/11/14",
        enddate: "2018/11/18",
        order_status: 1,
        note: "bla"
      },
      {
        roomName: "ger#3",
        begindate: "2018/11/16",
        enddate: "2018/11/16",
        order_status: 1,
        note: "bla"
      },
      {
        roomName: "ger#4",
        begindate: "2018/11/10",
        enddate: "2018/11/15",
        order_status: 2,
        note: "bla"
      },
      {
        roomName: "ger#4",
        begindate: "2018/11/16",
        enddate: "2018/11/17",
        order_status: 1,
        note: "bla"
      }
    ];
    list_orders = [];
    rooms = [];
    for (order in orders) {
      if (!rooms.includes(order.roomName)) {
        rooms.push(order.roomName);
        cols = [];
        for (curday in range_days) {
          cols.push({ day: curday.day, orderday: 0, note: "", status: 0 });
        }
        list_orders.push({ key: order.roomName, value: cols });
      }
      begin_date = new Date(order.begindate);
      end_date = new Date(order.enddate);
      cur_date = begin_date;
      beginday = cur_date.getUTCMonth() + 1 + "/" + cur_date.getUTCDate();
      more_days = [];
      while (cur_date <= end_date) {
        more_day = cur_date.getUTCMonth() + 1 + "/" + cur_date.getUTCDate();
        more_days.push(more_day);
        cur_date = cur_date + 1;
      }
      for (i = list_orders[order.roomName] - 1; i >= 0; i--) {
        if (more_days.includes(list_orders[order.roomName][i].day)) {
          if (list_orders[order.roomName][i].day == beginday) {
            list_orders[order.roomName][i].orderday = more_days.length;
            list_orders[order.roomName][i].note = order.note;
            list_orders[order.roomName][i].status = order.order_status;
          } else {
            list_orders[order.roomName].splice(i, 1);
          }
        }
      }
    }
    return list_orders;
  } catch (err) {
    throw err;
  }
}

async function save_order(info) {
  try {
    console.log("saving order...");
    const connection = await createConnection();
    let query = "";
    let params = [];
    let orderId = creatNewId();
    let room_param = [];
    let service_param = [];

    // update
    if (info.id != null) {
      console.log("update:");
      // query = `update orders set name = ?, category_id = ?, person_limit = ?, price = ?, is_active = ?, note = ? where id = ?`;
      // params = [
      //   info.name,
      //   info.category_id,
      //   info.person_limit,
      //   info.price,
      //   info.is_active ? "Y" : "N",
      //   info.note,
      //   info.id
      // ];
      // insert
    } else {
      console.log("insert: ", orderId);

      let dates = [];
      let prices = [];

      // prepare room datas

      await info.order_rooms.map(x => {
        dates.push(x.start_date);
        dates.push(x.end_date);
        prices.push(x.price);

        /**
         * insert rooms
         */
        query = `insert into order_room
        (
          order_id, room_id, person_count, child_count, start_date,
          end_date, price, note
        )
        values (?, ?, ?, ?, ?,  ?, ?, ?)`;
        params = [
          orderId,
          x.room_id,
          x.person_count,
          x.child_count,
          x.start_date,
          x.end_date,
          x.price,
          x.note
        ];
        runQuery({
          connection,
          query,
          params
        });
      });

      // prepare service datas
      await info.order_services.map(x => {
        prices.push(x.price);

        /**
         * insert rooms
         */
        query = `insert into order_service
        (
          order_id, service_id, price, note
        )
        values (?, ?, ?, ?)`;
        params = [orderId, x.service_id, x.price, x.note];

        console.log(query, params);
        runQuery({
          connection,
          query,
          params
        });
      });

      // calculate values
      var min_date = dates.reduce(function(a, b) {
        return a < b ? a : b;
      });
      var max_date = dates.reduce(function(a, b) {
        return a > b ? a : b;
      });
      var sum = prices.reduce((a, b) => {
        return parseFloat(a, 10) + parseFloat(b, 10);
      }, 0);

      query = `insert into orders (id, cus_name, cus_type, cus_phone, cus_email, note, card_amount, cash_amount, order_date, start_date, end_date, total_amount, price, status) 
      values(?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?,  ?, ?, ?)`;

      params = [
        orderId,
        info.cus_name,
        info.cus_type,
        info.cus_phone,
        info.cus_email,
        info.note,

        info.card_amount,
        info.cash_amount,
        info.order_date,
        min_date,
        max_date,

        parseFloat(info.card_amount, 10) + parseFloat(info.cash_amount, 10),
        sum,
        sum > info.card_amount + info.cash_amount ? "New" : "Confirmed"
      ];
    }

    await runQuery({
      connection,
      query,
      params
    });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  check_login,
  get_service_list,
  save_service,
  delete_service,
  get_room_categories,
  save_room_category,
  delete_room_category,
  get_rooms,
  save_room,
  delete_room,
  save_order,
  get_order_info
};
