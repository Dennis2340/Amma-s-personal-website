const express = require("express")
const Router = express.Router()
const poemController = require("../Controller/peomController")

Router.post("/", poemController.addNewPoem)
Router.get('/', poemController.getAllPoems);
Router.get('/', poemController.getSinglePoem);
Router.put('/', poemController.updatePoem);
Router.delete('/', poemController.deletePoem);

module.exports = Router