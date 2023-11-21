const authorization = async (req, res, next) => {
  try {
    const { userId, role } = req.loginInfo;
    if (role != "Admin") {
      throw { message: "Forbidden" };
    }
    next();
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

module.exports = authorization;
