const Conf = require('conf');
const lib = require('./lib');
const utils = require('./utils');

async function initialize() {
  if (!lib.conf.has('init')) {
    // If has not been initialized yet, initialize it for the first time.    
    await lib.completeInitialAuth();
  } else {
    if (utils.isTokenExpired()) {
      // Refresh the token if its expired.
      await lib.refreshToken();
    }
  }

  // Do CLI stuff here
}


initialize();