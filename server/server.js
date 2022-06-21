const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const { rmSync } = require("fs");
const port = 3000;
var cookieParser = require('cookie-parser');

const spotifyController = require('./controllers/spotifyController.js');
const cookieController = require('./controllers/cookieController.js');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/api/login', spotifyController.querySpotify, (req, res) => {
  res.status(200).json(res.locals.spotifyString);
});

app.get('/api/callback', spotifyController.callbackSpotify, cookieController.setAuthTokenCookie, (req, res) => {
  res.redirect("/");
});

app.get('/api/playlists', spotifyController.getPlaylists, (req, res) => {
  res.status(200).json(res.locals.playlists);
})

app.get('/api/loginstatus', spotifyController.getLoginStatus, (req, res) => {
  return res.status(200).json(res.locals.loginStatus);
})

app.post('/api/getplaylist', spotifyController.getPlaylist, spotifyController.getSongs, spotifyController.getSongData, (req,res) => {
  return res.status(200).json(res.locals)
})

app.get('/api/refresh_token', spotifyController.refreshToken, cookieController.setAuthTokenCookie, function(req, res) {
  res.status(200).send('refresh token set')
});

//GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Error in server.js');
});

app.listen(port, () => {console.log(`The app server is running on port: ${port}`); });

module.exports = app;

