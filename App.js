require("dotenv").config({path: './config/.env'})
const express = require("express")
const cors = require("cors")

const app = express()
const port = process.env | 3600

app.use(express.json())

app.get("/hello", (req,res) => {
    res.json({message: "i am saying hello"})
})

app.listen(port, () => console.log(`server started at ${port}`))
