const database = require('./database');

function startRefreshWorker() {
  setInterval((async function() { await database.refresh(); }), Number(process.env.TOKEN_REFRESH_TIME));
}

module.exports.start = startRefreshWorker;
