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
    path: '/{file*}',
    handler: {
      directory: {
        path: '../public/'
      }
    }
  }
];
