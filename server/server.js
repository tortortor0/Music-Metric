const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const { rmSync } = require("fs");
const port = 3000;
const querystring = require("querystring");
const loginController = require('./controllers/loginController.js');
var cookieParser = require('cookie-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//app.use(express.static("client"));
//app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get("/", (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/login', loginController.querySpotify, (req, res) => {
  res.status(200).json('success');
});

app.get('/callback', loginController.callbackSpotify, (req, res) => {
  return res.status(200).json('success');
});

app.use((err, req, res, next) => {
   console.log(err);
   res.status(500).send('Error in server.js');
});

app.listen(port, () => {console.log(`The app server is running on port: ${port}`); });

module.exports = app;

