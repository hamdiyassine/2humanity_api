const express = require('express');
const eventsRouter = express.Router();
const eventsCtrl = require('../../controllers/events-ctrl/eventsCtrl');

const checkAuth = require('../../middleware/check-auth');

eventsRouter.get('/list/:userId', checkAuth.tokenData, eventsCtrl.getByUser);
eventsRouter.get('/list/:offset/:limit', checkAuth.tokenData, eventsCtrl.getAll);
eventsRouter.get('/list', checkAuth.tokenData, eventsCtrl.getAll);
eventsRouter.get('/get-one/:eventId', checkAuth.secure, eventsCtrl.getOne);


eventsRouter.post('/', checkAuth.secure, eventsCtrl.create);
eventsRouter.patch('/edit-one/:eventId', checkAuth.secure, eventsCtrl.patch);

eventsRouter.post('/subscribe/:eventId', checkAuth.secure, eventsCtrl.subscribe);

eventsRouter.delete('/delete-one/:eventId', checkAuth.secure, eventsCtrl.deleteOne);

module.exports = eventsRouter;