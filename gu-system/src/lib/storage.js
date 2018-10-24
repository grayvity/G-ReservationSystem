const mysql = require("mysql");
require("net");

function createConnection() {
  const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "gu_system"
  });

  return new Promise((resolve, reject) => {
    connection.connect(err => {
      if (err) {
        return reject(err);
      }
      return resolve(connection);
    });
  });
}

function runQuery({ connection, query, params = [] }) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, ...res) => {
      if (err) {
        return reject(err);
      }
      return resolve(...res);
    });
  });
}

module.exports = { createConnection, runQuery };
