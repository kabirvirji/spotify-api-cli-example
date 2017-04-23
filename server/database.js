const mongorito = require('mongorito');
const {Model} = mongorito;
const {post} = require('got');
const {authHeader} = require('./lib');

class Tokens extends Model{}

async function connect() {
  return mongorito.connect(process.env.MONGO_URI);  
}

async function create(id, data) {
  data.id = id;
  data.refreshedAt = new Date().getTime();

  const entry = new Tokens(data);
  await entry.save();
}

async function getEntry(id) {
  return await Tokens.findOne({id});
}

async function refreshToken(refreshToken) {
  try {
    const newTokens = await post(process.env.SPOTIFY_TOKEN_ENDPOINT, {
      headers: {
        Authorization: authHeader,
      },
      body: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }
    });

    return JSON.parse(newTokens.body);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err);
    }
  }
}

async function refreshTokens() {
  // Get current time
  const now = new Date().getTime();
  // Get the time that tokens need to be refreshed from
  const tokenRefreshBound = now - process.env.SPOTIFY_TOKEN_EXPIRATION;

  // Find all the tokens that need to be refreshed
  const toRefresh = await Tokens.find({refreshedAt: {$lte: tokenRefreshBound}});
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`Refreshing ${toRefresh.length} tokens`);
  }

  // Iterate through the tokens and refresh them by hitting the endpoint
  for (const token of toRefresh) {
    const {refresh_token} = token.toJSON();
    const newTokens = await refreshToken(refresh_token);
    
    newTokens.refreshedAt = new Date().getTime();
    
    Object.keys(newTokens).forEach(key => {
      token.set(key, newTokens[key]);
    });

    await token.save();
  }
}

module.exports.connect = connect;
module.exports.create = create;
module.exports.get = getEntry;
module.exports.refresh = refreshTokens;
