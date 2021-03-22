const express = require('express');
const userRouter = express.Router();
const UserCtrl = require('../../controllers/users-ctrl/usersCtrl');

//const checkAuth = require('../../middleware/check-auth');


userRouter.post('/login', UserCtrl.login);
userRouter.post('/signup', UserCtrl.signup);


module.exports = userRouter;