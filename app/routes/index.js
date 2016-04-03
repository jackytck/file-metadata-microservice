import requestIp from 'request-ip'
import UA from 'user-agent'
import validator from 'validator'
import ShortUrl from '../models/short-url'

export default (app, passport) => {
  const validOpts = {
    protocols: ['http', 'https'],
    require_protocol: true
  }

  function modelToJson (model) {
    const { original_url, short_url } = model
    return {
      original_url,
      short_url: `${process.env.APP_URL}${short_url}`
    }
  }

  app.route('/')
    .get((req, res) => {
      res.end('URL Shortener Microservice!')
    })

  app.route('/:short_url')
    .get(async (req, res) => {
      const { short_url } = req.params
      const url = await ShortUrl.findOne({ short_url })
      if (url) {
        return res.redirect(url.original_url)
      }
      res.json({
        error: 'This url is not in the database.'
      })
    })

	app.route('/new/:http://:url')
		.get(async (req, res) => {
      const { http, url } = req.params
      const original_url = `${http}://${url}`

      if (!validator.isURL(original_url, validOpts)) {
        return res.json({
          error: 'Wrong url format, make sure you have a valid protocol and real site.'
        })
      }

      const exist = await ShortUrl.findOne({ original_url })
      if (exist) {
        return res.json(modelToJson(exist))
      }

      const hash = await ShortUrl({ original_url }).save()
      res.json(modelToJson(hash))
    })
}
