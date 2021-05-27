const express = require('express');
const userRouter = express.Router();
const UserCtrl = require('../../controllers/users-ctrl/usersCtrl');
const userController = require('../../controllers/users-ctrl/creation/userController');

//const checkAuth = require('../../middleware/check-auth');


userRouter.post('/login', UserCtrl.login);
userRouter.post('/signup', UserCtrl.signup);
userRouter.get('/Recommend/:userId', UserCtrl.Recommend);

//user CRUD

userRouter.get('/', userController.findAll);
userRouter.get('/AllPoints', userController.findAllByPoints);

userRouter.get('/:id', userController.findOne );
userRouter.delete('/:id', userController.delete);
userRouter.patch('/:id', userController.update);

module.exports = userRouter;