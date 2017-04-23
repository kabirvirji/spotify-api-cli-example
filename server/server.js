const micro = require('micro');
const dispatch = require('micro-route/dispatch');
const handleAuthCallback = require('./handle-auth-callback');
const handleTokenRequest = require('./handle-token-request');
const refreshTokenWorker = require('./refresh-token-worker');
const database = require('./database');

async function initializeServer() {
  // Connect to the mongo database

  const routes = dispatch()
    .dispatch('/auth/callback', ['GET'], handleAuthCallback)
    .dispatch('/auth/token', ['GET'], handleTokenRequest);

  const server = micro(routes);

  // Initialize the micro server
  server.listen(process.env.PORT, process.env.HOST);
}

async function initialize() {
  await database.connect();  
  await database.refresh();

  refreshTokenWorker.start();
  initializeServer();
}

module.exports = initialize;
