const fs = require("fs");
const path = require("path");

(async function copyDir(){
  try{
    const files = await fs.promises.readdir(path.join(__dirname, "files"));
    await fs.promises.mkdir(path.join(__dirname,"files-copy"),{ recursive: true });
    const filesInCopy = await fs.promises.readdir(path.join(__dirname, "files-copy"));
    for(copy of filesInCopy){
      await fs.promises.unlink(
        path.join(__dirname, "files-copy", copy)
      )
    }

    for (const file of files){
      await fs.promises.copyFile(
        path.join(__dirname, "files", file),
        path.join(__dirname, "files-copy", file)
      );
    } 
    console.log(`You copied and updated the data`);
} catch {
  console.log("error")
}
})()



