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
        default: new Date().getTime()
    }
})

const story = mongoose.model("story", storySchema)
module.exports = story
