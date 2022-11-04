const { readdir } = require('fs/promises');
const fs = require("fs");
const path = require("path");
const src = path.join(__dirname, "secret-folder");
(async function(mainPath){
  try {
    const files = await readdir(mainPath, {withFileTypes: true});
    for (const file of files){
      if(!file.isDirectory()){
        let promise = fs.promises.stat(path.join(__dirname, "secret-folder", file.name));
        promise.then(resp =>{
          console.log(`${file.name.split(".")[0]}----${file.name.split(".")[1]}----${resp.size}b`)
        });
      }
    }
    } catch (err) {
      console.error(err);
    }
  }
)(src)



