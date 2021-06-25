require('dotenv').config({ path: '.env.local' })
const express = require('express')
const passport = require('passport')
const cors = require('cors')
const APIStrategy = require('ibmcloud-appid').APIStrategy

const { apiIsAuthenticated } = require('./middleware')

const PORT = process.env.PORT || 5000
const app = express()

app.use(passport.initialize())
app.use(cors({ origin: process.env.WEBAPP_URL }))

const cred = require('./vcap-local.json')
passport.use(new APIStrategy({ oauthServerUrl: cred.AppID[0].oauthServerUrl }))

app.get('/api/me', apiIsAuthenticated, (req, res) => {
  console.log('Security context', req.appIdAuthorizationContext)

  const { accessTokenPayload } = req.appIdAuthorizationContext
  res.send({
    success: true,
    payload: accessTokenPayload,
  })
})

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
)
