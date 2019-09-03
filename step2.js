const argv = process.argv;
const path = argv[2];
const axios = require("axios");

async function webCat(path) {
  await axios.get(path)
  .then(console.log)
  .catch(e => console.error(e.response.status));
}

webCat(path);