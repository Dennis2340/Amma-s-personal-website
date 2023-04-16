const express = require('express');
const router = express.Router();
const videosController = require('../controllers/videosController');

router.post('/', videosController.create);

module.exports = router;
