const base64AuthHeader = `Basic ${new Buffer(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`;

module.exports.authHeader = base64AuthHeader;