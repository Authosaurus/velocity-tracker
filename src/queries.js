const fs = require('fs');
const conn = require('../database/db_connection');

const queries = {};

queries.insertUser = (data, cb) => {
  const inputs = [data.token, data.username];
  conn.query('begin');
  conn.query('UPDATE users SET access_token=$1 WHERE username=$2', inputs, err => {
    if(err) console.log("Err", err);
    let sql = `INSERT INTO users (username, access_token)
               SELECT $2, $1
               WHERE NOT EXISTS (SELECT 1 FROM users WHERE username=$2);`;
    conn.query(sql, inputs, (err) => {
      if (err) {
        cb(err);
      } else {
        conn.query('commit');
        cb(null);
      }
    });
  })

};

module.exports = queries;
