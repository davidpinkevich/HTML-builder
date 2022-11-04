const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "text.txt");
const readStream = fs.createReadStream(src, "utf-8");
readStream.on("data", data => console.log(data));