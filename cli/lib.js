const qs = require('querystring');
const open = require('open');
const Conf = require('conf');
const uuid = require('uuid/v4');
const ora = require('ora');
const retry = require('p-retry');
const got = require('got');
const config = require('./config');

const loader = ora('Loading...');
const conf = new Conf();

// Starts a fetch loop to check if auth is complete server side
async function getToken(identifier) {
  const run = () => new Promise(async (resolve, reject) => {
    try {
      const {body} = await got(`${config.token_uri}?id=${identifier}`);
      const jsonData = JSON.parse(body);

      // Set initialized to true, so we don't have to auth again in the future.
      jsonData.init = true;
      // Sets the date that it was initialized at, so we know when we need to refresh.
      jsonData.initializedAt = new Date();

      // Set it to the config file.
      conf.set(jsonData);
      resolve();
    } catch (err) {
      reject(err);
    }
  });

  // Retry it 10 times.
  return await retry(run, {minTimeout: 5000, retries: 10});
}

async function completeInitialAuth() {
  // 0 Start the loader
  loader.start();

  // 1. Create an identifier
  const identifier = uuid();
  conf.set('identifier', identifier);

  // 2. Construct the query string for the initial url open
  const qsConfig = qs.stringify({
    client_id: config.id,
    redirect_uri: config.redirect_uri,
    scope: encodeURIComponent(config.scope),
    response_type: 'code',
    state: identifier
  });

  open(`https://accounts.spotify.com/authorize?${qsConfig}`);
  await getToken(identifier);
  // Stop the loader.
  loader.stop();
}

async function refreshToken() {
  const identifier = conf.get('identifier');
  return await getToken(identifier);
}

module.exports.refreshToken = refreshToken;
module.exports.completeInitialAuth = completeInitialAuth;
module.exports.conf = conf;