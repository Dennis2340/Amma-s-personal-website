const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { format } = require("date-fns")
const storySchema = new Schema({
    storyTitle :{
        type: String,
        required : true
    },
    storyGenre : {
      type: String,
      required: true
    },
    storyDetailed: {
        type: String,
        required: true
    },
    storyAuthor : {
        type: String,
        required : true
    },
    createdAt: {
        type: Date, 
        default: format(new Date(), "MMMM-dd',' yyyy hh:mm aaa")
    }
})

const story = mongoose.model("story", storySchema)
module.exports = story
