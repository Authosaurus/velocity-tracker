const jwt = require('jsonwebtoken');
const request = require('request');
const queries = require('../queries');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (req,reply) => {
      return reply.view('index');
    }
  },
  {
    method: 'GET',
    path: '/issues',
    handler: (req, reply) => {
      const webToken = jwt.verify(req.auth.credentials.token, process.env.JWT_SECRET);
      queries.getUser(webToken.username, (err, rows) => {
        if(err) { return reply(err); }
        if(!rows.length) { return reply('User not found'); }
        fetchSaveIssues(rows[0].access_token, (err, issues) => {
          reply.view('index', {issues: issues, username: webToken.username, link: rows[0].link});
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
    //queries.insertIssues(issues, (err) => {
    //  if(err) console.log('error saving issues');
    //});
  });
}