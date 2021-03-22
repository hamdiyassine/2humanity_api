const express = require('express');
const mediaRouter = express.Router();
const mediasCtrl = require('../controllers/medias-ctrl/mediasCtrl');

// const checkAuth = require('../middleware/check-auth');

mediaRouter.get('/', mediasCtrl.getAll);
module.exports = mediaRouter;