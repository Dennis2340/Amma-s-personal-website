const express = require("express")
const router = express.Router()
const poemController = require("../Controller/peomController")

router.post("/:id", poemController.addNewPoem)
router.get('/', poemController.getAllPoems);
router.get('/', poemController.getSinglePoem);
router.put('/:id', poemController.updatePoem);
router.delete('/:id', poemController.deletePoem);

module.exports = router