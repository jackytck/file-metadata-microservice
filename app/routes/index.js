import Search from 'bing.search'
import bluebird from 'bluebird'
import RecentSearch from '../models/recent-search'

const search = new Search(process.env.BING_ACCOUNT_KEY)
const imageSearch = bluebird.promisify(search.images, { context: search })

export default (app, passport) => {
  app.route('/')
    .get((req, res) => {
      res.end('Image Search Abstraction Layer!')
    })

  app.route('/api/imagesearch/:query')
    .get(async (req, res) => {
      const query = req.params.query
      const skip = req.query.offset
      const results = await imageSearch(query, { skip })
      RecentSearch({ term: query }).save()
      res.json(results.map(x => ({
        url: x.url,
        snippet: x.title,
        thumbnail: x.thumbnail.url,
        context: x.sourceUrl
      })))
    })

  app.route('/api/latest/imagesearch')
    .get(async (req, res) => {
      const latest = await RecentSearch.find().limit(10).sort({ when: -1 })
      res.json(latest.map(x => ({
        term: x.term,
        when: x.when
      })))
    })
}
