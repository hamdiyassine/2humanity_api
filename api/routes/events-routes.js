const express = require('express');
const eventsRouter = express.Router();
const eventsCtrl = require('../controllers/events-ctrl/eventsCtrl');

const checkAuth = require('../middleware/check-auth');
const { events } = require('../models/Event');

eventsRouter.get('/list/:userId', checkAuth.tokenData, eventsCtrl.getByUser);
eventsRouter.get('/list/:offset/:limit', eventsCtrl.getAll);
eventsRouter.get('/list' , eventsCtrl.getAll);
eventsRouter.get('/get-one/:eventId', eventsCtrl.getOne);
eventsRouter.get('/Recommended/:userId' , eventsCtrl.Recommended);

eventsRouter.post('/', eventsCtrl.create);
eventsRouter.patch('/edit-one/:eventId', checkAuth.secure, eventsCtrl.patch);

eventsRouter.post('/subscribe/:eventId', eventsCtrl.subscribe);

eventsRouter.delete('/delete-one/:eventId', checkAuth.secure, eventsCtrl.deleteOne);

module.exports = eventsRouter;