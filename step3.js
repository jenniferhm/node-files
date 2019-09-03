const argv = process.argv;
const fs = require("fs");
const axios = require("axios");

async function webCat(argv) {

  // if --out is specified
  if (argv[2] === "--out") {

    // if source is url, make a get request
    if (argv[4].includes("http")) {
      let resp = await axios.get(argv[4]);
      argv[4] = resp.data;
    }
    //write --out source to new file
    fs.writeFile(argv[3], argv[4], "utf8", function (err) {
      if (err) {
        console.error(err);
        process.exit(3);
      }
      console.log("FILE WRITE IS SUCCESSFUL");
    });

    // if third argument is a url, then print contents
  } else if (argv[2].includes("http")) {
    await axios.get(argv[2])
      .then(console.log)
      .catch(e => console.error(e.response.status));

    // if third argument is a file, then print file contents
  } else {
    fs.readFile(argv[2], "utf8", function (err, data) {
      if (err) {
        console.error(err);
        process.exit(3);
      }
      console.log(data);
    });
  }
}

webCat(argv);