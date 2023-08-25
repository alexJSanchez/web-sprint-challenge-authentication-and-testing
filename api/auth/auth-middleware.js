const authModel = require("./auth-model");

const userNameCheck = async (req, res, next) => {
  const { username } = req.body;
  console.log(username);
  const findName = await authModel.findByName(username);
  if (findName.length === 0) {
    next();
  } else {
    res.json({ message: "username already exists" });
  }
};

module.exports = {
  userNameCheck,
};
