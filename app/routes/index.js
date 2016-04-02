import requestIp from 'request-ip'
import UA from 'user-agent'

module.exports = function (app, passport) {
	app.route('/')
		.get((req, res) => {
      const ipaddress = requestIp.getClientIp(req)
      const language = req.acceptsLanguages()[0] || 'en-US'
      const software = UA.parse(req.headers['user-agent']).os
      res.json({
        ipaddress,
        language,
        software
      })
    })
}
