import moment from 'moment'

module.exports = function (app, passport) {
	app.route('/')
		.get((req, res) => res.end('API Basejump: Timestamp microservice'))

  app.route('/:date')
    .get((req, res) => {
      const dateInput = req.params.date
      let date = moment(`${dateInput} +0000`, 'MMMM DD, YYYY Z')
      if (!date.isValid()) {
        date = moment.unix(dateInput)
      }
      res.json({
        unix: date.unix(),
        date: date.format('MMMM DD, YYYY')
      })
    })
}
