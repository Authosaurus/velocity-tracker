const conn = require('../database/db_connection');

const queries = {};

queries.insertUser = (data, cb) => {
  conn.query('begin');
  const sql = `UPDATE users SET access_token=$1 WHERE username=$2;`
  const inputs = [data.token, data.userinfo.login];
  conn.query(sql, inputs, erruserinfo => {
      if(err) {
        cb(err);
      }
      const sql = `INSERT INTO users (username, access_token, name, email, link)
                   SELECT $2, $1, $3, $4, $5
                   WHERE NOT EXISTS (SELECT 1 FROM users WHERE username=$2);`;
      const inputs = [data.token, data.userinfo.login, data.userinfo.name, data.userinfo.email, data.userinfo.url];
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
