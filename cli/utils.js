const lib = require('./lib');
const config = require('./config');

function isTokenExpired() {
  const initializedAt = lib.conf.get('initializedAt');
  const initializedAtDate = new Date(initializedAt).getTime();
  const now = new Date().getTime();

  return now - initializedAtDate > config.spotify_token_expiration; 
}

module.exports.isTokenExpired = isTokenExpired;
