// Load .env data
require('dotenv').config();

// Allows us to use async/ await in Node 6
require('async-to-gen/register');

// Start server
require('./server')();
