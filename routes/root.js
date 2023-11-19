const express = require("express");
const router = express();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/newcontact", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "newcontact.html"));
});

router.get("/nameinvalid", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "nameinvalid.html"));
});

router.get("/phoneinvalid", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "phoneinvalid.html"));
});

router.get("/emailinvalid", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "emailinvalid.html"));
});

router.get("/updatecontact/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "updatecontact.html"));
});

router.get("/deletecontact/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "deletecontact.html"));
});

router.get("/400", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "400.html"));
});

module.exports = router;