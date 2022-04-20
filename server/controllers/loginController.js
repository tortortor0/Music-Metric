const loginController = {};
var SpotifyWebApi = require('spotify-web-api-node');
const querystring = require("querystring");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const client_id = 'cb31577e277e4449991c0be4d990563a';
const client_secret = 'b45f74650b1b44f98389f36458ced6b1';
const redirect_uri = 'http://localhost:8080/callback';

const generateRandomString = (myLength) => {
  const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
  const randomArray = Array.from(
    { length: myLength },
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomString = randomArray.join("");
  return randomString;
};

loginController.querySpotify = (req, res, next) => {
    var state = generateRandomString(16);
    var scope = `user-read-private 
                user-read-email 
                user-read-recently-played 
                user-library-modify
                user-library-read
                playlist-modify-public
                playlist-read-private
                playlist-modify-private`;
    return res.redirect('https://accounts.spotify.com/authorize?' +
      new URLSearchParams({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
}

var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri
});

loginController.callbackSpotify = (req, res, next) => {
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
    let access_token;
    let refresh_token;

    fetch('https://accounts.spotify.com/api/token', authOptions)
    .then(result => result.json())
    .then(result => {
      console.log(result.access_token);
      spotifyApi.setAccessToken(result.access_token);
      spotifyApi.setRefreshToken(result.refresh_token);
      return spotifyApi.getUserPlaylists({limit: 50})
    })
    .then(function(data) {
      console.log(data.body.items)
      var arr = [], songIDs = [];
      data.body.items.forEach(function(p) {
          var obj = {
              id: p.track.id,
              played_at: p.played_at,
              name: p.track.name
          };

          arr.push(obj);
          songIDs.push(p.track.id);
          console.log(arr);
      });
    
  })

    return next();
  }
}

module.exports = loginController;
