const { runQuery, createConnection } = require("./storage");
// import { runQuery, createConnection } from "./storage.js";

export async function check_login(username, password) {
  return true;
  const connection = await createConnection();
  console.log("TEST");

  let query = `select username, password from Users a where username = ? and password = ?;`;
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

// check_login("admin", "41").then(response => {
//   if (response) {
//     console.log("login success");
//   } else {
//     console.log("Username or password incorrect!");
//   }
// });

// export default { check_login };