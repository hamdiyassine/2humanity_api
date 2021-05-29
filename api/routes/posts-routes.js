const express = require('express');
const postsRouter = express.Router();
const postsCtrl = require('../controllers/postsCtrl');

// const checkAuth = require('../middleware/check-auth');

postsRouter.post('/create', postsCtrl.create); 
postsRouter.get('/findByUser/:id', postsCtrl.findById);
postsRouter.delete('/deletePost/:id',postsCtrl.delete);
postsRouter.put('/update/:id',postsCtrl.update);
postsRouter.get('/getAll',postsCtrl.getAll);
<<<<<<< HEAD
=======
postsRouter.get('/',postsCtrl.getByIp);
>>>>>>> develop
module.exports = postsRouter;