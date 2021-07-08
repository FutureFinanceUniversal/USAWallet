const fs = require("fs");
let newmap = {};

console.log("Loading data...");
fs.readFile("./rawNewList.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Parsing data...");
  data = JSON.parse(data);

  console.log("Refactoring Data...");
  data.forEach((element) => {
    let index = element.name.toLowerCase();
    newmap[index] = element;
    newmap[index].address = element.platforms.ethereum;
    newmap[index].symbol = element.symbol.toUpperCase();
    newmap[index].name = element.name.toLowerCase();
  });

  console.log("Serializing new data...");
  const filedata = JSON.stringify(newmap);
  fs.writeFile("./coinGeckoTokenList.json", filedata, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File written successfully.");
  });
});
