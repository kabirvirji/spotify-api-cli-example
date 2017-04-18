const url = require('url');
const {post} = require('got');
const lib = require('./lib');

module.exports = async function(req, res) {
  // Get the "code" query string value
  const parsedUrl = url.parse(req.url, true);
  const {code, state: id} = parsedUrl.query;  
  
  // Send a "POST" request with the code to get token
  try {
    const {body} = await post(process.env.SPOTIFY_TOKEN_ENDPOINT, {
      json: true,
      body: {
        grant_type: 'authorization_code',
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code
      }
    });

    lib.write(id, body);
  } catch (err) {
    return 'Oops! Something went wrong. You can try restarting it!';
  }

  return 'It is safe to close your browser now. You can return to your command line.';
}