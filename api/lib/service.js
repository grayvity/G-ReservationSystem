const { runQuery, createConnection } = require("./storage");
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

async function save_order(info) {
  try {
    console.log("saving order...", info);
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
  save_order
};
