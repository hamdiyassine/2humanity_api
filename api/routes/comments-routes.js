const express = require('express');
const commentsRoutes = express.Router();

const commentsCtrl = require("../controllers/comments-ctrl/commentsCtrl");


const checkAuth = require('../middleware/check-auth');


// GET ALL Comments 

commentsRoutes.get('/:postId',checkAuth.tokenData, commentsCtrl.getPostComments);



// ADD COMMENT

commentsRoutes.post('/:postId',checkAuth.secure, commentsCtrl.comment);


// REMOVE COMMENT
commentsRoutes.delete('/:postId/:commentId', checkAuth.secure, commentsCtrl.deleteOne);


// UPDATE COMMENT
commentsRoutes.patch('/:postId/:commentId', checkAuth.secure, commentsCtrl.update);


module.exports = commentsRoutes;
