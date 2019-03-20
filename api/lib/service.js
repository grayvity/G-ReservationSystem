var moment = require("moment");

const { runQuery, createConnection } = require("./storage");
const { creatNewId, eng_weekday_to_mn } = require("./tools");

// import { runQuery, createConnection } from "./storage.js";

async function check_login(username, password) {
  const connection = await createConnection();

  let query = `select fullname, password, role from users where username = ? and password = ?`;
  const found = await runQuery({
    connection,
    query,
    params: [username, password]
  });
  if (found.length > 0) {
    return { is_success: true, username: found[0].fullname, role: found[0].role };
  }

  return { is_success: false };
}

async function get_dashboard_data() {
  const connection = await createConnection();

  // room count
  let query = `select count(1) as value from room where is_active = 'Y'`;
  const roomCount = await runQuery({
    connection,
    query
  });

  // ordered count
  query = `select count(distinct room_id) as value from order_room where CURDATE() between start_date and end_date`;
  const orderedRoomCount = await runQuery({
    connection,
    query
  });

  // confirmed count
  query = `select count(distinct b.room_id) as value from orders a 
  left join order_room b on a.id = b.order_id
  where a.status = 'confirmed' and CURDATE() between b.start_date and b.end_date`;
  const confirmedRoomCount = await runQuery({
    connection,
    query
  });

  // Available person
  query = `select COALESCE(sum(a.person_limit),0) as value from room a
  left join order_room b on a.id = b.room_id and b.end_date <= CURDATE()
  left join orders c on b.order_id = c.id and c.status <> 'deleted'
  where c.id is null`;
  const personCount = await runQuery({
    connection,
    query
  });
  
  // last 10 order action
  query = `select users.username as username, orders.id, orders.created_date, orders.status  
  from orders 
  left join users on orders.created_by = users.id 
  order by created_date desc limit 10;`;
  const last_orders = await runQuery({
    connection,
    query
  });
  return { room_count: roomCount[0].value, ordered_count: orderedRoomCount[0].value, confirmed_count: confirmedRoomCount[0].value, person_count: personCount[0].value, last_orders: last_orders };
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
      query = `update service set type = ?, name = ?, note = ?, price = ?, is_active = ? where id = ?`;
      params = [
        info.type,
        info.name,
        info.note,
        info.price,
        info.is_active ? "Y" : "N",
        info.id
      ];
      // insert
    } else {
      query = `insert into service (type, name, note, price, is_active) values(?, ?, ?, ?, ?)`;
      params = [
        info.type,
        info.name,
        info.note,
        info.price,
        info.is_active ? "Y" : "N"
      ];
      
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
      query = `update room_category set name = ?, is_active = ? where id = ?`;
      params = [info.name, info.is_active ? "Y" : "N", info.id];
      // insert
    } else {
      query = `insert into room_category (name, is_active) values(?, ?)`;
      params = [info.name, info.is_active ? "Y" : "N"];
      
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
      
      query = `update room set name = ?, category_id = ?, person_limit = ?, price = ?, child_price = ?, is_active = ?, note = ? where id = ?`;
      params = [
        info.name,
        info.category_id,
        info.person_limit,
        info.price,
        info.child_price,
        info.is_active ? "Y" : "N",
        info.note,
        info.id
      ];
      // insert
    } else {
      query = `insert into room (name, category_id, person_limit, price, child_price, is_active, note) values(?, ?, ?, ?, ?, ?, ?)`;
      params = [
        info.name,
        info.category_id,
        info.person_limit,
        info.price,
        info.child_price,
        info.is_active ? "Y" : "N",
        info.note
      ];
      
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

async function get_orders(data) {
  try {
    begindate = moment(data.search_info.begindate);
    enddate = moment(data.search_info.enddate);
    current_date = moment(data.search_info.begindate);
    if (data.search_info.begindate > data.search_info.enddate) {
      throw "Wrong date:";
    }
    range_days = [];
    while (current_date <= enddate) {
      range_days.push({
        date: current_date.format("YYYY-MM-DD"),
        day: current_date.format("MM-DD"),
        weekday: eng_weekday_to_mn(current_date.format("ddd"))
      });
      current_date.add(1, "days");
    }
    const connection = await createConnection();

    let query = `select room.id as roomid, room.name as roomname, order_room.start_date as begindate, order_room.end_date as enddate, orders.status as order_status, orders.cus_name as note, orders.id as orderid  
    from room
    left join order_room  on order_room.room_id = room.id
    left join orders on order_room.order_id = orders.id and orders.status in ('new', 'confirmed') 
      and ? < order_room.end_date and order_room.start_date < ? 
     where 1 = 1 `
      + (data.search_info.order_status == 2 ? `and orders.status in ('new', 'confirmed') ` : data.search_info.order_status == 1 ? `and orders.status not in ('new', 'confirmed') ` : ``)
      + (data.search_info.room_cat_id == 0 ? `` : `and room.category_id = ? `) + `;`;
    let params = [data.search_info.begindate, data.search_info.enddate];
    if (data.search_info.room_cat_id > 0) {
      params.push(data.search_info.room_cat_id);
    }
    const orders = await runQuery({
      connection,
      query,
      params
    });
    list_orders = {};
    rooms = [];
    for (key in orders) {
      order = orders[key];
      if (!rooms.includes(order.roomid)) {
        rooms.push(order.roomid);
        cols = [];
        for (key_range in range_days) {
          cols.push({
            roomid: order.roomid,
            roomname: order.roomname,
            date: range_days[key_range].date,
            day: range_days[key_range].day,
            orderid: "",
            orderday: 0,
            note: "",
            status: "default"
          });
        }
        list_orders[order.roomid] = cols;
      }

      if (!order.order_status)
        continue;
      begin_date = moment(order.begindate);
      if (begin_date < begindate) begin_date = begindate;
      end_date = moment(order.enddate);
      if (end_date > enddate) end_date = enddate;
      cur_date = moment(begin_date.format("YYYY-MM-DD"));
      more_days = [];
      while (cur_date <= end_date) {
        more_days.push(cur_date.format("MM-DD"));
        cur_date.add(1, "days");
      }
      for (i = list_orders[order.roomid].length - 1; i >= 0; i--) {
        if (more_days.includes(list_orders[order.roomid][i].day)) {
          if (list_orders[order.roomid][i].day == begin_date.format("MM-DD")) {
            list_orders[order.roomid][i].orderday = more_days.length;
            list_orders[order.roomid][i].orderid = order.orderid;
            list_orders[order.roomid][i].note = order.note;
            list_orders[order.roomid][i].status = order.order_status;
          } else {
            list_orders[order.roomid].splice(i, 1);
          }
        }
      }
    }
    orderlist = [];
    for (key in list_orders) {
      orderlist.push({ name: list_orders[key][0].roomname, cols: list_orders[key] });
    }
    query = `select * from room_category where room_category.is_active = ?`;
    params = ['Y'];
    const room_categories = await runQuery({
      connection,
      query,
      params
    });
    return { range_days, orderlist, room_categories };
  } catch (err) {
    throw err.message;
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
    let is_update = info.id != null && info.id.toString().length > 0;
    // update
    let dates = [];
    let prices = [];
    let room_warnings = 'Өрөөний захиалгын огноо давхардаж байна.';
    let has_room_warning = false;
    info.updated_date = moment();
    if (!is_update){
      info.id = orderId;
      info.created_by = info.updated_by;
      info.created_date = moment();
    }
    for (i in info.order_rooms) {
      x = info.order_rooms[i];
      query = `select order_room.room_id, room.name as room_name, order_room.start_date, order_room.end_date from order_room left join orders on order_room.order_id = orders.id left join room on order_room.room_id = room.id where orders.status <> ? and order_room.order_id <> ? and order_room.room_id = ? and ? <= order_room.end_date and order_room.start_date <= ? `;
      params = [
        'canceled',
        info.id,
        x.room_id,
        moment(x.start_date).format('YYYY-MM-DD HH:mm:ss'),
        moment(x.end_date).format('YYYY-MM-DD HH:mm:ss'),
      ];
      order_rooms = await runQuery({
        connection,
        query,
        params
      });
      if (order_rooms && order_rooms.length > 0) {
        room_warnings += '\\n - Өрөө: ' + order_rooms[0].room_name + ', Огноо: ' + moment(order_rooms[0].start_date).format('YYYY-MM-DD') + ' - ' + moment(order_rooms[0].end_date).format('YYYY-MM-DD');
        has_room_warning = true;
      }
    };
    if (has_room_warning)
      throw room_warnings;
    // prepare room datas
    if (is_update) {
      query = `delete from order_room where order_id = ? `;
      params = [info.id];
      runQuery({
        connection,
        query,
        params
      });
      query = `delete from order_service where order_id = ? `;
      runQuery({
        connection,
        query,
        params
      });
    }
    await info.order_rooms.map(x => {
      dates.push(x.start_date);
      dates.push(x.end_date);
      prices.push(x.price);
      /**
       * insert rooms
       */
      query = `insert into order_room
      (
        order_id, room_category_id, room_id, person_count, person_price, child_count, child_price, start_date,
        days, end_date, price, note
      )
      values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      params = [
        info.id,
        x.room_category_id,
        x.room_id,
        x.person_count,
        x.person_price,
        x.child_count,
        x.child_price,
        moment(x.start_date).format('YYYY-MM-DD HH:mm:ss'),
        x.days,
        moment(x.end_date).format('YYYY-MM-DD HH:mm:ss'),
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
      params = [info.id, x.service_id, x.price, x.note];
      runQuery({
        connection,
        query,
        params
      });
    });

    // calculate values
    var min_date = dates.reduce(function (a, b) {
      return a < b ? a : b;
    });
    var max_date = dates.reduce(function (a, b) {
      return a > b ? a : b;
    });
    var sum = prices.reduce((a, b) => {
      return parseFloat(a, 10) + parseFloat(b, 10);
    }, 0);
    if (is_update) {
      query = `update orders set cus_name = ?, cus_type = ?, cus_phone = ?, cus_email = ?, note = ?, card_amount = ?, cash_amount = ?, order_date = ?, start_date = ?, end_date = ?, total_amount = ?, price = ?, status = ?, created_by = ?, created_date = ?, updated_by = ?, updated_date = ? 
       where id = ?`;
    } else {
      query = `insert into orders (cus_name, cus_type, cus_phone, cus_email, note, card_amount, cash_amount, order_date, start_date, end_date, total_amount, price, status, created_by, created_date, updated_by, updated_date,id) 
      values(?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    }
    params = [
      info.cus_name,
      info.cus_type,
      info.cus_phone,
      info.cus_email,
      info.note,

      info.card_amount,
      info.cash_amount,
      moment(info.order_date).format('YYYY-MM-DD HH:mm:ss'),
      moment(min_date).format('YYYY-MM-DD HH:mm:ss'),
      moment(max_date).format('YYYY-MM-DD HH:mm:ss'),

      parseFloat(info.card_amount, 10) + parseFloat(info.cash_amount, 10),
      sum,
      info.status,
      info.created_by,
      info.created_date ? moment(info.created_date).format('YYYY-MM-DD HH:mm:ss') : null,
      info.updated_by,
      moment(info.updated_date).format('YYYY-MM-DD HH:mm:ss'),
      info.id,
    ];
    await runQuery({
      connection,
      query,
      params
    });
    return info.id;
  } catch (err) {
    throw err;
  }
}

async function get_order_info(data) {
  try {
    if (!data || !data.info || (!data.info.id && !data.info.room_id)) {
      return null;
    }
    const connection = await createConnection();
    let order = { id: "", order_date: data.info.order_date };
    let order_rooms = [{
      id: 0,
      room_id: -1,
      room_name: null,
      person_count: 0,
      person_price: 0,
      child_count: 0,
      child_price: 0,
      start_date: data.info.order_date,
      days: 1,
      end_date: data.info.order_date,
      price: 0
    }];
    let query = ``;
    let params = [];
    if (data.info.room_id) {
      query = `select * from room where id = ? `;
      params = [data.info.room_id];
      room = await runQuery({
        connection,
        query,
        params
      });
      order_rooms[0].room_id = room[0].id;
      order_rooms[0].room_name = room[0].name;
      order_rooms[0].person_count = room[0].person_limit;
      order_rooms[0].person_price = room[0].price;
      order_rooms[0].child_count = 0;
      order_rooms[0].child_price = room[0].child_price;
      order_rooms[0].price = room[0].person_limit * room[0].price;
      order.price = order_rooms[0].price;
      order.cash_amount = 0;
      order.card_amount = 0;
      order.total_amount = 0;
    }
    let order_services = [];
    if (data.info.id) {
      let query = `select * from orders where orders.id = ? `;
      let params = [data.info.id];
      orders = await runQuery({
        connection,
        query,
        params
      });
      order = orders[0];
      query = `select order_room.id, order_room.order_id, order_room.room_category_id, order_room.room_id, order_room.person_count, order_room.person_price, order_room.child_count, order_room.child_price, order_room.start_date, order_room.days, order_room.end_date, order_room.price, order_room.note, room.name as room_name from order_room left join room on order_room.room_id = room.id where order_room.order_id = ? `;
      order_rooms = await runQuery({
        connection,
        query,
        params
      });
      query = `select order_service.id, order_service.order_id, order_service.service_id, order_service.price, order_service.note, service.name as service_name from order_service left join service on order_service.service_id = service.id where order_service.order_id = ? `;
      order_services = await runQuery({
        connection,
        query,
        params
      });
    }
    if (order_services.length == 0) {
      order_services.push({ id: 0, service_id: -1, price: 0 });
    }
    return { order, order_rooms, order_services };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function get_report(data) {
  try {
    const connection = await createConnection();
    let query = `select * from orders where ? <= end_date and start_date <= ? `;
    let params = [data.search_info.begindate, data.search_info.enddate];
    if (data.search_info.report_type == 1) {
      query = `select order_room.id, room.name, order_room.person_count, order_room.child_count, order_room.start_date, order_room.end_date, order_room.price, order_room.note, orders.cus_name, orders.cus_phone, orders.cus_email, orders.status from order_room left join orders on order_room.order_id = orders.id left join room on order_room.room_id = room.id where ? <= order_room.end_date and order_room.start_date <= ? `;
      if (data.search_info.room_cat_id > 0) {
        query += `and order_room.room_category_id = ? `;
        params.push(data.search_info.room_cat_id);
      }
      if (data.search_info.room_id > 0) {
        query += `and order_room.room_id = ? `;
        params.push(data.search_info.room_id);
      }
    }
    if (data.search_info.cus_name && data.search_info.cus_name != '') {
      query += `and orders.cus_name like ? `;
      params.push(`%` + data.search_info.cus_name + `%`);
    }
    if (data.search_info.order_status && data.search_info.order_status != '') {
      query += `and orders.status = ? `;
      params.push(data.search_info.order_status);
    }
    const order = await runQuery({
      connection,
      query,
      params
    });
    // query = `select * from room_category `;
    // const room_categories = await runQuery({
    //   connection,
    //   query,
    //   params
    // });
    // query = `select * from order_service where order_service.order_id = ? `;
    // const order_services = await runQuery({
    //   connection,
    //   query,
    //   params
    // });
    return { order };
  } catch (err) {
    throw err;
  }
}

async function get_filter_data(data) {
  try {
    const connection = await createConnection();
    let query = `select * from room `;
    let params = [];
    const rooms = await runQuery({
      connection,
      query,
      params
    });
    query = `select * from room_category `;
    const room_categories = await runQuery({
      connection,
      query,
      params
    });
    query = `select cus_name from orders GROUP BY cus_name `;
    const cus_names = await runQuery({
      connection,
      query,
      params
    });
    return { rooms, room_categories, cus_names };
  } catch (err) {
    throw err;
  }
}

/**
 * USER
 */
async function get_user_list() {
  const connection = await createConnection();
  let query = `select * from users`;

  const user_list = await runQuery({
    connection,
    query
  });

  return user_list;
}

async function save_user(info) {
  try {
    const connection = await createConnection();
    let query = "";
    let params = [];
    // update
    if (info.id != null) {
      query = `update users set username = ?, fullname = ?, password = ?, role = ?, is_active = ? where id = ?`;
      params = [
        info.username,
        info.fullname,
        info.password,
        info.role,
        info.is_active ? "Y" : "N",
        info.id
      ];
      // insert
    } else {
      query = `insert into users (username, fullname, password, role, is_active) values(?, ?, ?, ?, ?)`;
      params = [
        info.username,
        info.fullname,
        info.password,
        info.role,
        info.is_active ? "Y" : "N"
      ];
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

async function delete_users(id) {
  try {
    console.log("Deleting users");
    const connection = await createConnection();
    let query = "";

    // delete
    if (id != null) {
      query = `delete from users where id = ?`;
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
  get_order_info,
  get_orders,
  get_report,
  get_filter_data,
  get_dashboard_data,
  get_user_list,
  save_user,
  delete_users
};
