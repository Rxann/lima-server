const express = require("express");
const JSONdb = require("simple-json-db");
const app = express();
const db = new JSONdb("data.json", { syncOnWrite: true });
app.post("/add", (req, res) => {
  if (req.query.loadavg) {
    var ar = db.get("loadavg");
    ar.push(req.query.loadavg);
    db.set("loadavg", ar);
  }
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
  res.status(200).send("Logged");
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
});
app.listen(2525);
