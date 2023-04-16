const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { format } = require("date-fns")
const articleSchema = new Schema({
    articleTitle :{
        type: String,
        required : true
    },
    articleGenre : {
      type: String,
      required: true
    },
    articleDetails: {
        type: String,
        required: true
    },
    articleAuthor : {
        type: String,
        required : true
    },
    createdAt: {
        type: Date, 
        default: format(Date.now(), "MMMM-dd',' yyyy hh:mm aaa")
    }
})

const article = mongoose.model("article", articleSchema)
module.exports = article
