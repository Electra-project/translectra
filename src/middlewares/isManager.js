export default function(req, res, next) {
  if (process.env.NODE_ENV !== 'development' && (req.user === undefined || !req.user.isActivated || !req.user.isManager)) {
    res.redirect('/')

    return
  }

  next()
}