const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const { rmSync } = require("fs");
const port = 3000;
var cookieParser = require('cookie-parser');

// const ReactDOMServer = require("react-dom/server");
// const { StaticRouter } = require("react-router-dom/server");
// const Main = require("../client/Main.jsx");

const loginController = require('./controllers/loginController.js');
const cookieController = require('./controllers/cookieController.js');
const { restart } = require("nodemon");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//app.use(express.static("client"));
//app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get("/", (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
});

app.get('/login', loginController.querySpotify, (req, res) => {
  console.log('success in /login')
  res.redirect(res.locals.redirect);
});

app.get('/callback', loginController.callbackSpotify, cookieController.setAuthTokenCookie, (req, res) => {
  res.redirect("/");
});

app.get('/playlists', loginController.getPlaylists, (req, res) => {
  //console.log('res locals playlists in route', res.locals.playlists);
  res.status(200).json(res.locals);
})

app.get('/loginstatus', loginController.getLoginStatus, (req, res) => {
  return res.status(200).json(res.locals);
})

app.post('/getplaylist', loginController.getPlaylist, loginController.getSongs, loginController.getEnergies, (req,res) => {
  console.log('energies in route', res.locals.trackEnergies)
  console.log('tracklist in route', res.locals.trackList)
  return res.status(200).json({trackList: res.locals.trackList, 
                              trackEnergies: res.locals.trackEnergies, 
                              trackDanceability: res.locals.trackDanceabilities, 
                              playlistName: res.locals.playlistName})
})

app.get('/refresh_token', loginController.refreshToken, cookieController.setAuthTokenCookie, function(req, res) {
  res.status(200).send('hello')
});

//GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Error in server.js');
});

app.listen(port, () => {console.log(`The app server is running on port: ${port}`); });

module.exports = app;

