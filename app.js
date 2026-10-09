const express = require("express");
const _ = require("lodash");

const app = express();
app.use(express.json());

const defaults = { theme: "light", notifications: true };

// Deliberately vulnerable: request data is deep-merged without stripping __proto__.
app.post("/profile", (req, res) => {
  const settings =
    _.merge({}, defaults, req.body);
  res.json(settings);
});

app.get("/tags", (req, res) => {
  const tags = _.uniq(["node", "express", "node"]);
  res.json(tags);
});

app.post("/settings", (req, res) => {
  const prefs = _.merge({}, defaults, req.body);
  res.json(prefs);
});

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => console.log("demo app on http://localhost:3000"));
}
