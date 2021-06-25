const passport = require('passport')
const APIStrategy = require('ibmcloud-appid').APIStrategy

function apiIsAuthenticated(req, res, next) {
  passport.authenticate(APIStrategy.STRATEGY_NAME, { session: false })(
    req,
    res,
    next
  )
}

module.exports = { apiIsAuthenticated }
