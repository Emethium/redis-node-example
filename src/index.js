// Imports
const redis = require("redis");
const { promisify } = require("util");

// Globals
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

const setAsync = promisify(client.set).bind(client);

async function publish() {
  console.log(await setAsync("hello", "world"));
}

function setupEventHandlers() {
  client.on("error", err => {
    console.log(`An communication error happened: ${err}`);
  });
}

// module.exports = { publish };

setupEventHandlers();
publish();
