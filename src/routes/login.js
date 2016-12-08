const queries = require('../queries');
const request = require('request');
const makeToken = require('../jwt');

module.exports = [
  {
    method: 'GET',
    path: '/login',
    handler: (req, reply) => {
      let client_id = process.env.CLIENT_ID;
      let redirect_uri = process.env.REDIRECT_URI;
      let url = 'https://github.com/login/oauth/authorize';
      let scope = 'repo';
      reply.redirect(`${url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`);
    }
  },
  {
    method: 'GET',
    path: '/oauth-redirect',
    handler: (req, reply) => {
      let url = 'https://github.com/login/oauth/access_token';
      let header = {
        accept: 'application/json'
      };
      let form = {
        client_id: process.env.CLIENT_ID,
        code: req.query.code,
        client_secret: process.env.CLIENT_SECRET
      };
      request.post({url: url, headers: header, form: form}, (error, response, body) => {
        if(!error && response.statusCode === 200) {
          let token = JSON.parse(body).access_token;

          let viewInfo = {};
          let counter = 2;
//first parallel function - get user info
          fetchSaveUser(token, (err, userinfo) => {
            viewInfo.userinfo = userinfo;
            makeToken(userinfo.username, (err, token) => {
              if(err) console.log(err);
              else {
              //  console.log(token, "THIS IS OUR TOKEN");
                req.cookieAuth.set({token: token});
                counter--;
                if(counter === 0) {
                  reply.redirect('/');
                }
              }
            });

          });
//second parallel function - get issues
          fetchSaveIssues(token, (err, issues) => {
            viewInfo.issues = issues;
            counter--;
            if(counter === 0) {
              reply.redirect('/');
            }

          });

        }
      });
    }
  }
];

function fetchSaveUser(token, cb) {
  let get_url = 'https://api.github.com/user';
  let get_headers = {
    'User-Agent': 'oauth-ws',
    Authorization: `token ${token}`
  };
  request.get({url: get_url, headers: get_headers}, (error, response, body) => {
    let userinfo = JSON.parse(body);
    cb(null, userinfo)
    queries.insertUser({token: token, userinfo: userinfo}, (err) => {
      if(err) console.log("DB error:", err);
      else console.log("user saved");
    });
  });
}

function fetchSaveIssues(token, cb) {
  let get_url = 'https://api.github.com/issues?state=all';
  let get_headers = {
    'User-Agent': 'oauth-ws',
    Authorization: `token ${token}`
  };
  request.get({url: get_url, headers: get_headers}, (error, response, body) => {
    let issues = JSON.parse(body);
    cb(null, issues)
    queries.insertIssues(issues, (err) => {
      if(err) console.log('error saving issues');
    });
  });
}
