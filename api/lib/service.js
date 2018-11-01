const { runQuery, createConnection } = require("./storage");
// import { runQuery, createConnection } from "./storage.js";

async function check_login(username, password) {
  const connection = await createConnection();

  let query = `select name, password from Users a where name = ? and password = ?;`;
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

  let query = `select name, password from order a  where name = ? and password = ?;`;
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

module.exports = { check_login };
