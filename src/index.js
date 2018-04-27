import crypto from 'crypto'
import dotenv from 'dotenv'
import fs from 'fs'
import { Lexpress } from 'lexpress'
import passport from 'passport'
import passportGoogleOauth from 'passport-google-oauth'
import path from 'path'

import mongoDb from './middlewares/mongoDb'
import User from './models/User'
import routes from './routes'

dotenv.config()

passport.use(new passportGoogleOauth.OAuth2Strategy(
  {
    clientID: process.env.GOOGLE_API_KEY,
    clientSecret: process.env.GOOGLE_API_SECRET,
    callbackURL: `${process.env.WEBSITE_URL}/auth/callback`,
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOne({ googleId: profile.id }, (err, user) => {
      if (err !== null) {
        cb(err)

        return
      }

      if (!user) {
        const newUser = User.create({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          gravatar: crypto.createHash('md5').update(profile.emails[0].value).digest('hex'),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })
          .then(newUser => {
            console.log(newUser)
            cb(undefined, newUser)
          })
          .catch(cb)

        return
      }

      User.updateOne({ googleId: profile.id }, { updatedAt: Date.now() }, err => {
        if (err !== null) {
          cb(err)

          return
        }

        cb(undefined, user)
      })
    })
  }
))
passport.serializeUser((user, cb) => cb(null, user.id))
passport.deserializeUser((id, cb) => User.findById(id, cb))

const commonConfig = {
  middlewares: [
    passport.initialize(),
    passport.session(),
    mongoDb,
  ],
  routes,
  staticPath: 'public',
  viewsEngine: 'pug',
  viewsPath: 'src/views',
}

const lexpress = new Lexpress(process.env.NODE_ENV === 'development'
  ? {
    ...commonConfig,
    ...{
      https: {
        cert: fs.readFileSync(path.resolve('./server.crt')),
        key: fs.readFileSync(path.resolve('./server.key')),
        requestCert: false,
        rejectUnauthorized: false
      },
    },
  }
  : {
    ...commonConfig,
    ...{},
  }
)

lexpress.start()
