import express from 'express'
import routes from './app/routes/index.js'
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'
import appPassport from './app/config/passport'
import path from 'path'

const app = express()
appPassport(passport)
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGO_URI)

app.use('/controllers', express.static(process.cwd() + '/app/controllers'))
app.use('/public', express.static(process.cwd() + '/public'))
app.use('/common', express.static(process.cwd() + '/app/common'))

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'jade')
app.set('views', path.join(__dirname, 'app/templates'))

routes(app, passport)

const port = process.env.PORT || 8080
app.listen(port,  function () {
	console.log(`Node.js listening on port ${port}...`)
})
