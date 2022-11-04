const { stdin, stdout } = process;
const path = require("path");
const fs = require("fs");
const src = path.join(__dirname, "text.txt");

fs.writeFile(
  path.join(src),
  "",
  (err) => {
    if (err) throw err;

    stdout.write("Please, enter text for the file 'text.txt' : ");

    stdin.on("data", data => {
      if(data.toString().trim() === "exit"){
        stdout.write("It was nice to work with you");
        process.exit();
      } else {
        fs.appendFile(
          path.join(src),
          data,
          (err) => {
            if (err) throw err;
          }
        )
      }
    })
  }
)

process.on("SIGINT", () =>{
  stdout.write("It was nice to work with you")
  process.exit()
});

