const express = require("express");
const compression = require("compression");
const JSONdb = require("simple-json-db");
const FileLogger = require("nano-file-logger");
const app = express();
const log = new FileLogger("./log.txt");

const db = new JSONdb("data.json", { syncOnWrite: true });
app.use(compression());
app.post("/add", (req, res) => {
  if (req.query.totalmem) {
    var ar = db.get("totalmem");
    ar.push(req.query.totalmem);
    db.set("totalmem", ar);
  }
  if (req.query.os) {
    var ar = db.get("os");
    ar.push(req.query.os);
    db.set("os", ar);
  }
  if (req.query.arch) {
    var ar = db.get("arch");
    ar.push(req.query.arch);
    db.set("arch", ar);
  }
  var ip = req.headers["x-forwarded-from"] || req.socket.remoteAddress;
  log.add(`IP:${ip} Route: /add`);
  res.status(200).send(Buffer.from("Data Stored and Request Logged!"));
});

app.get("/avgOS", (req, res) => {
  //Darwin,Linux,Windows
  var results = [];
  var os = db.get("os");
  os.map((o) => {
    if (o == "Darwin") {
      results[0] = results[0]++;
    } else if (o == "Linux") {
      results[1] = results[1]++;
    } else if (o == "Windows_NT") {
      results[2] = results[2]++;
    }
  });
  res.status(200).send(results);
});
app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});

app.listen(2525, () => {
  console.log("The Lima Telemetry Server is now running...!");
});
