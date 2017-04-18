require('dotenv').config();
require('async-to-gen/register');

const dispatch = require('micro-route/dispatch');
const micro = require('micro');
const handleAuthCallback = require('./handle-auth-callback');
const handleTokenRequest = require('./handle-token-request');

const routes = dispatch()
  .dispatch('/auth/callback', ['GET'], handleAuthCallback)
  .dispatch('/auth/token', ['GET'], handleTokenRequest);

const server = micro(routes);
server.listen(process.env.PORT, process.env.HOST);
