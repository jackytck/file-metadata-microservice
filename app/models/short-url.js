import mongoose, { Schema } from 'mongoose'
import uid2 from 'uid2'

var ShortUrl = new Schema({
  original_url: String,
  short_url: { type: String, default: uid2.bind(this, 4) }
})

export default mongoose.model('ShortUrl', ShortUrl)
