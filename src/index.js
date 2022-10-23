const express = require("express");
const JSONdb = require("simple-json-db");
const app = express();
const db = new JSONdb("data.json", { syncOnWrite: true });
app.post("/add", (req, res) => {
  if (req.query.loadavg) {
    var e = db.get("loadavg");
    e.push(req.query.loadavg);
    db.set("loadavg", e);
  }
});
