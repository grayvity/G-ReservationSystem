const { runQuery, createConnection } = require("./storage");
// import { runQuery, createConnection } from "./storage.js";

async function check_login(username, password) {
  const connection = await createConnection();

  let query = `select username, password from users a where name = ? and password = ?;`;
  const found = await runQuery({
    connection,
    query,
    params: [username, password]
  });

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

  let query = `select * from service where is_active = ?`;

  const service_list = await runQuery({
    connection,
    query,
    params: [isActive]
  });

  return service_list;
}

module.exports = { check_login, get_service_list };
