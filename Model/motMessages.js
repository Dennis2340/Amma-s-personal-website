const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { format } = require("date-fns")
const motivationalMessageSchema = new Schema({
    motMessageTitle : {
        type: String,
        required : true
    },
    motMessageGenre : {
      type: String,
      required: true
    },
    motMessageDetails: {
        type: String,
        required: true
    },
    motMessageAuthor : {
        type: String,
        required : true
    },
    createdAt: {
        type: Date, 
        default: format(Date.now(), "MMMM-dd',' yyyy hh:mm aaa")
    }
})

const motMessage = mongoose.model("motMessage", motivationalMessageSchema)
module.exports = motMessage
