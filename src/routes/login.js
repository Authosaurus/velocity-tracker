const queries = require('../queries');
const request = require('request');
const jwt = require('jsonwebtoken');

module.exports = [
  {
    method: 'GET',
    path: '/login',
    handler: (req, reply) => {
      const client_id = process.env.CLIENT_ID;
      const redirect_uri = process.env.REDIRECT_URI;
      const url = 'https://github.com/login/oauth/authorize';
      const scope = 'repo';
      reply.redirect(`${url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`);
    }
  },
  {
    method: 'GET',
    path: '/oauth-redirect',
    handler: (req, reply) => {
      const url = 'https://github.com/login/oauth/access_token';
      const header = {
        accept: 'application/json'
      };
      const form = {
        client_id: process.env.CLIENT_ID,
        code: req.query.code,
        client_secret: process.env.CLIENT_SECRET
      };
      request.post({url: url, headers: header, form: form}, (error, response, body) => {
        if(!error && response.statusCode === 200) {


          const access_token = JSON.parse(body).access_token;


          fetchSaveUser(access_token, (err, userinfo) => {
            const webToken = jwt.sign({username: userinfo.login}, process.env.JWT_SECRET);
            req.cookieAuth.set({token: webToken});
            reply.redirect('/issues');
          });
        }
      });
    }
  }
];

function fetchSaveUser(token, cb) {
  const get_url = 'https://api.github.com/user';
  const get_headers = {
    'User-Agent': 'oauth-ws',
    Authorization: `token ${token}`
  };
  request.get({url: get_url, headers: get_headers}, (error, response, body) => {
    const userinfo = JSON.parse(body);
    cb(null, userinfo);
    queries.insertUser({token: token, userinfo: userinfo}, (err) => {
      if(err) console.log("DB error:", err);
    });
  });
}
