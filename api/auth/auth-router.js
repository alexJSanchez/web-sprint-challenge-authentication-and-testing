const router = require("express").Router();
const bcrypt = require("bcryptjs");
const authModel = require("./auth-model");
const jwt = require("jsonwebtoken");
const { userNameCheck, checkBody } = require("./auth-middleware");
const { SECRET } = require("../../data/index");

// function buildToken(user) {
//   return jwt.sign(
//     {
//       subject: user.id,
//       username: user.username,
//     },
//     JWT_SECRET,
//     {
//       expiresIn: "1d",
//     }
//   );
// }

router.post("/register", checkBody, userNameCheck, async (req, res, next) => {
  // res.end("implement register, please!");
  try {
    const { username, password } = req.body;
    //check username and password middleware

    const hash = bcrypt.hashSync(password, 8);
    const newUser = { username, password: hash };
    const result = await authModel.add(newUser);

    res.status(200).json({
      id: result.id,
      username: result.username,
      password: result.password,
    });
  } catch (err) {
    next(err);
  }
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

router.post("/login", checkBody, (req, res, next) => {
  const { username, password } = req.body;

  authModel
    .findBy(username)
    .then((username) => {
      if (!username) {
        res.status(404).json({ message: "invalid credentials" });
      } else if (bcrypt.compareSync(password, username.password)) {
        const token = buildToken(username);
        res
          .status(200)
          .json({ message: `welcome, ${username.username}`, token: token });
      } else if (!bcrypt.compareSync(password, username.password)) {
        res.status(404).json({ message: "Invalid credentials" });
      }
    })
    .catch(next);

  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});
function buildToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, SECRET, options);
}

module.exports = router;
