module.exports = [
  {
    method: 'GET',
    path: '/{file*}',
    handler: {
      directory: {
        path: 'public/',
        index: 'main-page.html'
      }
    }
  }
];
