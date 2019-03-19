const jwt = require('jsonwebtoken')
const auhtConfig = require('../../config/auth')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    // jwt.verify is not a promise, so we use promisify
    const decoded = await promisify(jwt.verify)(token, auhtConfig.secret)

    // save the user id at req
    req.userId = decoded.id

    return next()
  } catch (e) {
    console.log(e)
    return res.status(401).json({
      error: 'Invalid token'
    })
  }
}
