const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { format } = require("date-fns")
const poemSchema = new Schema({
    poemTitle :{
        type: String,
        required : true
    },
    poemGenre : {
      type: String,
      required: true
    },
    poemDetails: {
        type: String,
        required: true
    },
    poemAuthor : {
        type: String,
        required : true
    },
    createdAt: {
        type: Date, 
        default: new Date().getTime()
    }
})

const poem = mongoose.model("peom", poemSchema)
module.exports = poem
