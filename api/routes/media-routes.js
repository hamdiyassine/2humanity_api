const express = require('express');
const mediaRouter = express.Router();
const mediasCtrl = require('../controllers/medias-ctrl/mediasCtrl');
const mediaController = require('../controllers/medias-ctrl/mediaController');

// const checkAuth = require('../middleware/check-auth');

mediaRouter.get('/', mediasCtrl.getAll);
mediaRouter.get('/:id', mediaController.findOne);
module.exports = mediaRouter;