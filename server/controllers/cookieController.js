const { response } = require("../server");
const cookieController = {};

cookieController.setAuthTokenCookie = (req, res, next) => {
  res.cookie('AuthToken', res.locals.accessToken, { expires: new Date(Date.now() + 3600000), httpOnly: true });
  res.cookie('RefreshToken', res.locals.refreshToken, { httpOnly: true });
  return next();
}

module.exports = cookieController;