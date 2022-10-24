const fs = require("fs");

class FileLogger {
  constructor(path) {
    this.path = path;
  }

  add(message) {
    try {
      fs.writeFileSync(this.path, `${new Date()} - ${message}`);
    } catch (err) {
      console.log("Error writing to file");
      console.log(err);
    }
  }
  retrieve() {
    try {
      return fs.readFileSync(this.path).split("\n");
    } catch {
      console.log("Error reading file");
      return null;
    }
  }
}

module.exports = FileLogger;
