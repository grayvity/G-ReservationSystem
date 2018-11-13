var moment = require('moment');


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
function eng_weekday_to_mn(weekday){
  switch (weekday){
    case 'Mon':
      return 'Дав';
      case 'Tue':
      return 'Мяг';
      case 'Wed':
      return 'Лха';
      case 'Thu':
      return 'Пүр';
      case 'Fri':
      return 'Баа';
      case 'Sat':
      return 'Бям';
      case 'Sun':
      return 'Ням';
      default:
      return weekday;
  }
}
async function get_order_info(data) {
  try {
    begindate = moment(data.search_info.begindate, 'YYYY-MM-DD');
    enddate = moment(data.search_info.enddate, 'YYYY-MM-DD');
    current_date = moment(data.search_info.begindate, 'YYYY-MM-DD');
    if (data.search_info.begindate > data.search_info.enddate) {
      throw "Wrong date:";
    }
    range_days = [];
    while (current_date <= enddate) {
      range_days.push({
        date: current_date.format('YYYY-MM-DD'),
        day: current_date.format('MM-DD'),
        weekday: eng_weekday_to_mn(current_date.format('ddd'))
      });
      current_date.add(1, 'days');
    }
    const connection = await createConnection();
   
    let query = `select room.name as roomname, order_room.start_date as begindate, order_room.end_date as enddate, orders.status as order_status, orders.note as note  from order_room 
    left join room on order_room.room_id = room.id
    left join orders on order_room.order_id = orders.id 
    where orders.status in ("new, confirmed") and ? < order_room.end_date and order_room.start_date < ?;
     `;
    let params = [data.search_info.begindate, data.search_info.enddate];
    const orders = await runQuery({
      connection,
      query,
      params
    });
    // orders = [
    //   {
    //     roomname: "ger#1",
    //     begindate: "2018-11-10",
    //     enddate: "2018-11-12",
    //     order_status: 1,
    //     note: "bla"
    //   },
    //   {
    //     roomname: "ger#2",
    //     begindate: "2018-11-11",
    //     enddate: "2018-11-12",
    //     order_status: 2,
    //     note: "bla"
    //   },
    //   {
    //     roomname: "ger#2",
    //     begindate: "2018-11-14",
    //     enddate: "2018-11-18",
    //     order_status: 1,
    //     note: "bla"
    //   },
    //   {
    //     roomname: "ger#3",
    //     begindate: "2018-11-16",
    //     enddate: "2018-11-16",
    //     order_status: 1,
    //     note: "bla"
    //   },
    //   {
    //     roomname: "ger#4",
    //     begindate: "2018-11-10",
    //     enddate: "2018-11-15",
    //     order_status: 2,
    //     note: "bla"
    //   },
    //   {
    //     roomname: "ger#4",
    //     begindate: "2018-11-16",
    //     enddate: "2018-11-17",
    //     order_status: 1,
    //     note: "bla"
    //   }
    // ];
    list_orders = {};
    rooms = [];
    for (key in orders) {
      order = orders[key];
      if (!rooms.includes(order.roomname)) {
        rooms.push(order.roomname);
        cols = [];
        for (key_range in range_days) {
          cols.push({ day: range_days[key_range].day, orderday: 0, note: "", status: 'default' });
        }
        list_orders[order.roomname] = cols;
      }
      begin_date = moment(order.begindate, 'YYYY-MM-DD');
      if(begin_date < begindate)
        begin_date = begindate;
      end_date = moment(order.enddate, 'YYYY-MM-DD');
      if(end_date > enddate)
        end_date = enddate;
      cur_date = moment(begin_date.format('YYYY-MM-DD'), 'YYYY-MM-DD');
      more_days = [];
      while (cur_date <= end_date) {
        more_days.push(cur_date.format('MM-DD'));
        cur_date.add(1, 'days');
      }
      for (i = list_orders[order.roomname].length - 1; i >= 0; i--) {
        if (more_days.includes(list_orders[order.roomname][i].day)) {
          if (list_orders[order.roomname][i].day == begin_date.format('MM-DD')) {
            list_orders[order.roomname][i].orderday = more_days.length;
            list_orders[order.roomname][i].note = order.note;
            list_orders[order.roomname][i].status = order.order_status;
          } else {
            list_orders[order.roomname].splice(i, 1);
          }
        }
      }
    }
    orderlist = [];
    for (key in list_orders){
      orderlist.push({name: key, cols: list_orders[key]});
    }
    return { range_days, orderlist};
  } catch (err) {
    throw err;
  }
}

async function save_order(info) {
  try {
    console.log("saving order...", info);
    const connection = await createConnection();
    let query = "";
    let params = [];
    let orderId = creatNewId();

    // update
    if (info.id != null) {
      console.log(info);
      query = `update orders set name = ?, category_id = ?, person_limit = ?, price = ?, is_active = ?, note = ? where id = ?`;
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
      query = `insert into orders (name, category_id, person_limit, price, is_active, note) values(?, ?, ?, ?, ?, ?)`;
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
