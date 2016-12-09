module.exports = [
  {
    method: 'POST',
    path: '/logout',
    handler: (req, reply) => {
      req.cookieAuth.clear();
      return reply.redirect('/');
    }
  }
];