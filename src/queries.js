const conn = require('../database/db_connection');

const queries = {};

queries.insertUser = (data, cb) => {
  const inputs = [data.token, data.result.login, data.result.name, data.result.email, data.result.url];
  conn.query('begin');
  conn.query('UPDATE users SET access_token=$1 WHERE username=$2',
    [data.token, data.result.login], err => {
      if(err) {
        cb(err);
      }
      const sql = `INSERT INTO users (username, access_token, name, email, link)
                   SELECT $2, $1, $3, $4, $5 
                   WHERE NOT EXISTS (SELECT 1 FROM users WHERE username=$2);`;
      conn.query(sql, inputs, (err) => {
        if (err) {
          cb(err);
        } else {
          conn.query('commit');
          cb(null);
        }
      });
    });

};

module.exports = queries;
