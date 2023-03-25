const express = require("express")
const Router = express.Router()
const poemController = require("../Controller/peomController")

Router.post("/", poemController.addNewPoem)