const jwt = require('jsonwebtoken');
const request = require('request');
const queries = require('../queries');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (req, reply) => {
      if(!req.auth.credentials) { return reply.view('index'); }
      const webToken = jwt.verify(req.auth.credentials.token, process.env.JWT_SECRET);
      queries.getUser(webToken.username, (err, rows) => {
        if(err) { return reply(err); }
        if(!rows.length) { return reply('User not found'); }
        const user = rows[0];
        fetchSaveIssues(user.access_token, (err, issues) => {
          reply.view('index', {issues: issues, username: webToken.username, link: user.link});
        });
      });
    }
  },
  {
    method: 'GET',
    path: '/{file*}',
    handler: {
      directory: {
        path: __dirname+"/../../public/"
      }
    }
  }
];


function fetchSaveIssues(access_token, cb) {
  let get_url = 'https://api.github.com/issues?state=all';
  let get_headers = {
    'User-Agent': 'oauth-ws',
    Authorization: `token ${access_token}`
  };
  request.get({url: get_url, headers: get_headers}, (error, response, body) => {
    let issues = JSON.parse(body);
    cb(null, issues);
  });
}
