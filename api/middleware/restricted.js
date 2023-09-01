const jwt = require("jsonwebtoken");
const { SECRET } = require("../../data/index");

const restrict = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("token: ", token);
  console.log("secret:", SECRET);
  if (!token) {
    res.status(404).json({ message: "token required" });
  } else if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        res.status(404).json({ message: "token invalid" });
      } else {
        next();
      }
    });
  }

  // if (token) {
  //   jwt.verify(token, SECRET, (err, decoded) => {
  //     if (err) {
  //       next(err);
  //     } else {
  //       next();
  //     }
  //   });
  // } else {
  //   next({ status: 401, message: "token invalid" });
  // }
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
module.exports = restrict;
