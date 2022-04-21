const { response } = require("../server");
const cookieController = {};

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setAuthTokenCookie = (req, res, next) => {
  res.cookie('AuthToken', res.locals.accessToken, { httpOnly: true });
  res.cookie('RefreshToken', res.locals.refreshToken, { httpOnly: true });
  return next();
}

module.exports = cookieController;