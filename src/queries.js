const conn = require('../database/db_connection');

const queries = {};

queries.insertUser = (data, cb) => {
  conn.query('begin');
  let sql = `UPDATE users SET access_token=$1 WHERE username=$2;`
  let inputs = [data.token, data.userinfo.login];
  console.log(inputs, "FIRST");
  conn.query(sql, inputs, (err) => {
      if(err) {
        cb(err);
      }
      let sql = `INSERT INTO users (username, access_token, name, email, link)
                   SELECT $2, $1, $3, $4, $5
                   WHERE NOT EXISTS (SELECT 1 FROM users WHERE username=$2);`;
      let inputs = [data.token, data.userinfo.login, data.userinfo.name, data.userinfo.email, data.userinfo.url];
      console.log(inputs, "SECOND");
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

queries.insertIssues = (data, cb) => {
  for(var i = 0; i < data.length; i++) {
    let issue = data[i];
    let sql = `INSERT INTO issues (url, state, title, body, created_at, closed_at)
              VALUES($1, $2, $3, $4, $5, $6)
              ON CONFLICT (url) DO UPDATE SET state = $2, closed_at = $6;`

    let inputs = [issue.url, issue.state, issue.title, issue.body, issue.created_at, issue.closed_at];
    conn.query(sql, inputs, (err) => {
      if (err) {
        cb(err);
      } else {
        console.log('issue added');
        cb(null);
      }
    });
  }
};

module.exports = queries;
