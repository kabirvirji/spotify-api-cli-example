const {JSONStorage} = require('simple-json-storage');
const store = new JSONStorage(process.env.TMP_STORE_LOCATION);

function write(key, value) {
  try {
    return store.setSync('data', key, value);
  } catch (err) {
    return false;
  }
}

function read(key) {
  try {
    return store.getSync('data', key);
  } catch (err) {
    return false;
  }
}

module.exports.store = store;
module.exports.write = write;
module.exports.read = read;
