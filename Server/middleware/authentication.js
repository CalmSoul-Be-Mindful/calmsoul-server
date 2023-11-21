const { decode } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw { message: "Unauthenticated" };
    }
    const access_token = authorization.split(" ")[1];
    // console.log(access_token);
    const verify = decode(access_token); //decode token
    // console.log(verify);

    const user = await User.findByPk(verify.id);
    if (!user) {
      throw { message: "Not Found" };
    }
    // console.log(user);
    // const { id, username, role, email } = verify;
    req.loginInfo = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };
    next();
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

module.exports = authentication;
