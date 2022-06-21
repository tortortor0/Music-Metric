const spotifyController = {};
var SpotifyWebApi = require('spotify-web-api-node');
const querystring = require("query-string");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

//in .gitignore
const key = require('../key')

const client_id = key.client_id;
const client_secret = key.client_secret;
const refresh_token = key.refresh_token;
const redirect_uri = 'http://localhost:8080/api/callback';

const generateRandomString = (myLength) => {
  const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
  const randomArray = Array.from(
    { length: myLength },
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomString = randomArray.join("");
  return randomString;
};

spotifyController.getLoginStatus = (req, res, next) => {
  if(req.cookies.AuthToken !== undefined) {
    res.locals.loginStatus = true;
  }
  else res.locals.loginStatus = false;
  return next();
}

spotifyController.querySpotify = (req, res, next) => {
  var state = generateRandomString(16);
  var scope = `user-read-private 
                ugc-image-upload
                user-read-currently-playing
                user-library-modify
                user-library-read
                playlist-modify-public
                user-follow-modify
                playlist-read-private
                playlist-modify-private`;
  let redirectLink = 'https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state});
  res.locals.spotifyString = redirectLink;
  return next();
}

var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri
});

spotifyController.callbackSpotify = (req, res, next) => {
  var code = req.query.code || null;
  var state = req.query.state || null;
 
  if (state === null) {
    res.redirect('/#' +
        new URLSearchParams({
          error: 'state_mismatch'
        }));
  } else {
    const authOptions = {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(client_id + ":" + client_secret),
      },
      json: true,
    };

    fetch('https://accounts.spotify.com/api/token', authOptions)
      .then(result => result.json())
      .then(result => {
        res.locals.accessToken = result.access_token;
        res.locals.refreshToken = result.refresh_token;
        spotifyApi.setAccessToken(result.access_token);
        spotifyApi.setRefreshToken(result.refresh_token);
        return spotifyApi.getUserPlaylists({limit: 50})
      })
      .then((data) => {
        res.locals.playlists = data.body.items;
      })
      .then(() => {
        return next()});
  }
}

spotifyController.getPlaylists = (req,res,next) => {
  spotifyApi.setAccessToken(req.cookies.AuthToken)
  spotifyApi.getUserPlaylists({limit: 50})
    .then(data => data.body.items)
    .then(data => {
      res.locals.playlists = data;
    })
    .then(() => {
      return next()});
}

spotifyController.getPlaylist = (req, res, next) => {
  spotifyApi.setAccessToken(req.cookies.AuthToken)
  spotifyApi.getPlaylist(req.body.id)
    .then(data => {
      res.locals.playlistName = data.body.name;
      return data.body.tracks
    })
    .then(data => {
      res.locals.playlist = data;
      return next();
    })
}

spotifyController.getSongs = (req, res, next) => {
  const trackList = [];
  const trackIds = [];
  let songs = res.locals.playlist.items;
  for(let i=0; i<songs.length; i++) {
    trackList.push(songs[i].track.name);
    trackIds.push(songs[i].track.id);
  }

  res.locals.trackList = trackList;

  spotifyApi.getAudioFeaturesForTracks(trackIds)
    .then(data => data.body)
    .then(data => {
      res.locals.audioFeaturesArray = data;
      return next();
    }
    )
}

spotifyController.getSongData = (req, res, next) => {
  const energy = [];
  const danceability = [];
  const key = [];
  const loudness = [];
  const tempo = [];
  const valence = [];

  let data = res.locals.audioFeaturesArray;
  data = data.audio_features;

  for(let i=0; i<data.length; i++) {
    energy.push(data[i].energy);
    danceability.push(data[i].danceability);
    key.push(data[i].key);
    loudness.push(data[i].loudness);
    tempo.push(data[i].tempo);
    valence.push(data[i].valence);
  }

  res.locals.energy = energy;
  res.locals.danceability = danceability;
  res.locals.key = key;
  res.locals.loudness = loudness;
  res.locals.tempo = tempo;
  res.locals.valence = valence;
  return next();
}

spotifyController.refreshToken = (req, res, next) => {
  spotifyApi.setRefreshToken(refresh_token);
  spotifyApi.setClientId = client_id;
  spotifyApi.setClientSecret = client_secret;
  spotifyApi.refreshAccessToken()
    .then(
      function(data) {
        console.log('The access token has been refreshed!');

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
        res.locals.accessToken = data.body['access_token'];
        res.locals.refreshToken = refresh_token;
      },
      function(err) {
        console.log('Could not refresh access token', err);
      }
    )
    .then(() => next());
}
module.exports = spotifyController;
