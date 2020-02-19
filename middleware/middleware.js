const restricted = (req, res, next) => {
  if (!req.session || !req.session.user) {
    res.status(401).json({ message: "You shall not pass!" });
  } else {
    next();
  }
};

module.exports = { restricted };
