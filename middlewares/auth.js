const is_login = async (req, res, next) => {
  try {
    if (req.session.userData) {
      next();
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const is_logout = async (req, res, next) => {
  try {
    if (req.session.userData) {
      res.redirect("/home");
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { is_login, is_logout };
