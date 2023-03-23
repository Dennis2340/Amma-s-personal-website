const mongoose = require("mongoose")
const Schema = mongoose.Schema

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
    }
})

const poem = mongoose.model("peom", poemSchema)
module.exports = poem
