const mysql = require("mysql");
require("net");
require("dotenv").config();

function createConnection() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
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
