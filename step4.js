const argv = process.argv;
const fs = require("fs");
const axios = require("axios");


function cat(path) {
  let p = new Promise(function (resolve, reject) {
    fs.readFile(path, "utf8", function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  return p;
}

async function catWrite(path, out) {
  if (path.includes('http')) {
    let resp = await axios.get(path);
    let newpath = resp.data;
    writeTo(newpath, out);
  } else {
    let otherpath = await cat(path)
    writeTo(otherpath, out);
  }
}

function webCat(url) {
  axios.get(url)
    .then(console.log)
    .catch(e => console.error(e.response.status));
}

function writeTo(path, out) {
  fs.writeFile(out, path, "utf8", function (err) {
    if (err) {
      console.error(err);
      process.exit(3);
    }
    console.log("FILE WRITE IS SUCCESSFUL");
  });
}


async function main(argv) {

  if (argv[2] === "--out") {
    let path = argv[4];
    let out = argv[3];
    catWrite(path, out);
  } else if (argv[2].includes('http')) {
    let url = argv[2]
    webCat(url);
  } else {
    let path = argv[2];
    let result = await cat(path);
    console.log(result);
  }
}

main(argv);