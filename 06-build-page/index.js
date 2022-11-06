const fs = require("fs");
const path = require("path");

const fromAssets = path.join(__dirname, "assets");
const whereverAssets = path.join(__dirname, "project-dist", "assets");


(async function buildPage(){
  try {
    await fs.promises.mkdir(path.join(__dirname, "project-dist"), { recursive: true });
    await fs.promises.mkdir(path.join(__dirname, "project-dist", "assets"), { recursive: true });
    const itemsAssets = await fs.promises.readdir(path.join(__dirname, "project-dist", "assets"), {withFileTypes: true});
    
    if(itemsAssets.length){
      for(const item of itemsAssets) {
        await fs.promises.rm(path.join(__dirname, "project-dist","assets", item.name), { recursive: true });
      }
    }
    let template = await fs.promises.readFile(path.join(__dirname, "template.html"), { encoding: 'utf8' });
    const itemsHTML = await fs.promises.readdir(path.join(__dirname, "components"),{withFileTypes: true});
    for (const item of itemsHTML) {
      let nameFile = item.name.split(".")[0];
      const itemForBuild = await fs.promises.readFile(
        path.join(__dirname, "components", item.name)
      )
      if(template.includes(`{{${nameFile}}}`)){
        template = template.replaceAll(`{{${nameFile}}}`, itemForBuild)
      }
    }
    await fs.promises.writeFile(
      path.join(__dirname, "project-dist", "index.html"),
      template
    )
    await fs.promises.writeFile(
      path.join(__dirname, "project-dist", "style.css"),
      ""
    )
    const itemsCSS = await fs.promises.readdir(path.join(__dirname, "styles"),{withFileTypes: true});
    for (const item of itemsCSS) {
      if(!item.isDirectory() && path.extname(path.join(__dirname, "styles", item.name)) === ".css"){
        let readStream = await fs.promises.readFile(path.join(__dirname, "styles", item.name), { encoding: 'utf8' });
        await fs.promises.appendFile(
          path.join(__dirname, "project-dist", "style.css"),
          `${readStream}\n`
        )
      }
    }
    (async function copyAssets(from, where){
      try {
        const items = await fs.promises.readdir(from,{withFileTypes: true});
        for(const item of items){
          if(item.isDirectory()){
            const fromPath = path.join(from, item.name);
            const wherePath = path.join(where, item.name);
            copyAssets(fromPath, wherePath);
          } else {
            await fs.promises.mkdir(where, { recursive: true });
            await fs.promises.copyFile(
              path.join(from, item.name),
              path.join(where, item.name)
            )
          }
        }
      } catch(error){
        console.log(error)
      }
    })(fromAssets, whereverAssets)
  } catch(error) {
    console.log(error)
  }
})()


