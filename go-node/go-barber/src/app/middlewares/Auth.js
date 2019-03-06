module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user // make user available to all views
    return next()
  }

  return res.redirect('/')
}
