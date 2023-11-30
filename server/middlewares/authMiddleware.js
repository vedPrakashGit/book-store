const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.jwt_secret_key);
    // console.log(decoded);
    req.body.userId = decoded.userId;
    next();
  } catch (err) {
    res.send(err);
  }
};
