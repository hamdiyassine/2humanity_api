const express = require('express');
const commentsRoutes = express.Router();

const commentsCtrl = require("../controllers/comments-ctrl/commentsCtrl");


const checkAuth = require('../middleware/check-auth');


// GET ALL Comments 
<<<<<<< HEAD
<<<<<<< HEAD
commentsRoutes.get('/:postId', checkAuth.tokenData, commentsCtrl.getPostComments);
=======

commentsRoutes.get('/:postId',checkAuth.tokenData, commentsCtrl.getPostComments);
>>>>>>> develop
=======

commentsRoutes.get('/:postId',checkAuth.tokenData, commentsCtrl.getPostComments);
>>>>>>> develop



// ADD COMMENT
<<<<<<< HEAD
<<<<<<< HEAD
commentsRoutes.post('/:postId', commentsCtrl.comment);


// REMOVE COMMENT
commentsRoutes.delete('/:postId/:commentId', commentsCtrl.deleteOne);


// UPDATE COMMENT
commentsRoutes.patch('/:postId/:commentId', commentsCtrl.update);


module.exports = commentsRoutes;
=======
=======
>>>>>>> develop

commentsRoutes.post('/:postId',checkAuth.secure, commentsCtrl.comment);

commentsRoutes.post('/:postId', commentsCtrl.comment);



// REMOVE COMMENT
commentsRoutes.delete('/:postId/:commentId',  commentsCtrl.deleteOne);


// UPDATE COMMENT
commentsRoutes.patch('/:postId/:commentId', checkAuth.secure, commentsCtrl.update);


module.exports = commentsRoutes;
<<<<<<< HEAD
>>>>>>> develop
=======
>>>>>>> develop
