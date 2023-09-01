const authModel = require("./auth-model");

const userNameCheck = async (req, res, next) => {
  const { username } = req.body;
  console.log(username);
  const nameList = await authModel.findByName(username);
  if (nameList.length === 0) {
    next();
  } else {
    res.status(404).json({ message: "username taken" });
  }
};

const checkBody = async (req, res, next) => {
  //check username and password middleware
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(404).json({ message: "username and password required" });
  } else {
    next();
  }
};

module.exports = {
  userNameCheck,
  checkBody,
};
