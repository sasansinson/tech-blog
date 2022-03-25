// middleware to verify user loggied in before restricted route access given
const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect("/login");
    } else {
      next();
    }
  };
  
  module.exports = withAuth;