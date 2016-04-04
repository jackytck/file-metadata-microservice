import mongoose, { Schema } from 'mongoose'

var RecentSearch = new Schema({
  term: String,
  when: { type: Date, default: Date.now }
})

export default mongoose.model('RecentSearch', RecentSearch)
