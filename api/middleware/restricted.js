const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../data/index");

const restrict = (req, res, next) => {
  const token = req.headers.authorization;
  console.log("token:", token);
  console.log(JWT_SECRET);

  if (!token) {
    res.json({ status: 401, message: "token required" });
  }
  if (token === JWT_SECRET) {
    next();
  } else {
    next({ status: 401, message: "invalid token" });
  }

  // if (token) {
  //   jwt.verify(token, "secret", (err, decoded) => {
  //     if (err) {
  //       console.log(decoded);
  //       console.log(err);
  //       next({ status: 401, message: "invalid token" });
  //     } else {
  //       next();
  //     }
  //   });
  // } else {
  //   next({ status: 401, message: "token required" });
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
