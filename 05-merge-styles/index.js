const fs = require("fs");
const path = require("path");

(async function createBuildCss(){
  try {
    await fs.promises.writeFile(
      path.join(__dirname, "project-dist", "bundle.css"),
      ""
    )
    const items = await fs.promises.readdir(path.join(__dirname, "styles"),{withFileTypes: true});
    for (const item of items) {
      if(!item.isDirectory() && path.extname(path.join(__dirname, "styles", item.name)) === ".css"){
        let readStream = await fs.promises.readFile(path.join(__dirname, "styles", item.name), { encoding: 'utf8' });
        await fs.promises.appendFile(
          path.join(__dirname, "project-dist", "bundle.css"),
          `${readStream}\n`
        )
      }
    }
  } catch (error) {
    console.log(error);
  }
})()