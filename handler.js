const serverless = require("serverless-http");
const hbs = require("hbs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.set("view engine", "hbs");
app.get("/", function(req, res) {
  res.status(200).render("index");
});

app.get("/form", function(req, res) {
  res.status(200).render("form");
});

app.post("/submit", function(req, res) {
  let inputIsValid = true
  // validate input here
  // ...
  
  // input is valid
  if(inputIsValid) {
    res.status(200).render("success");
  } else {
    // input is invalid
    res.status(400).render("error");
  }
});

module.exports.proptax_collector = serverless(app);