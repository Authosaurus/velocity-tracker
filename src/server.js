const hapi = require('hapi');
const routes = require('./routes');
const inert = require('inert');
const vision = require('vision');
const cookieAuth = require('hapi-auth-cookie');
const handlebars = require('handlebars');
const env = require('env2')('./config.env');
const contextCredentials = require('hapi-context-credentials');


const server =  new hapi.Server();

server.connection({
    port: process.env.PORT || 3000
});

const options = {
  password: 'thi£siVVs&Rauthosaur=uspkassword',
  cookie: 'authosaurus-cookie',
  isSecure: process.env.NODE_ENV === 'PRODUCTION',
  ttl: 24 * 60 * 60 * 1000
};

server.register([inert, vision, cookieAuth, contextCredentials], (err) =>{
  if(err) console.log("Error registering:", err);


  server.auth.strategy('session', 'cookie', 'optional', options);


  server.views({
      engines: { hbs: handlebars },
      relativeTo: __dirname,
      path: '../views',
      layout: 'layout',
      layoutPath: '../views/layout',
      partialsPath: '../views/partials',
      helpersPath: '../views/helpers'
  });

  server.route(routes);
});



module.exports = server;
