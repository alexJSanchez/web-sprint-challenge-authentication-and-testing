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

const checkBody = async (req,res,next){
    const { username, password } = req.body;
    //check username and password middleware
    if (!username || !password) {
      res.status(404).json({ message: "username and password required" });
    }else{
      next()
    }
}

module.exports = {
  userNameCheck,
  checkBody
};
