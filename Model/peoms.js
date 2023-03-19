// const mongoose = require("mogoose")
// const Schema = mongoose.Schema

// const peomSchema = new Schema({
//     peomTitle :{
//         type: String,
//         required : true
//     },
//     peomDetails: {
//         type: String,
//         required: true
//     }
// })

const dataBase = require("../config/firebaseConfig")

const peom = dataBase.collection("peom")
module.exports = peom