const {send} = require('micro');
const url = require('url');
const database = require('./database');

module.exports = async function(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const {id} = parsedUrl.query;
    const tokens = await database.get(id);

    if (tokens) {
      send(res, 200, tokens);
      return;
    }

    send(res, 400, {error: 'Try again!'});
}