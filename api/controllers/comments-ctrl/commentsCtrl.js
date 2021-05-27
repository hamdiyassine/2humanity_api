const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
const ObjectId = require('mongodb').ObjectId;


const comment=require('./actions/comment-post')
const update =require('./actions/update')

const getPostComments=require('./actions/get-post-comments')
const { deleteOne } =require('./actions/delete')

module.exports = {

    getPostComments: async (req, res, next) => {
        const resp = await getPostComments(Comment, Post, req.params.postId, ObjectId)
      
        return res.status(resp.code).json(resp.status ? resp.data : resp.err);
    },
    comment: async (req, res, next) => {
        
        const resp = await comment(Comment, Post, req.body, req.tokenData, req.params.postId, ObjectId)
        
        return res.status(resp.code).json(resp.status ? resp.data : resp.err);

    },
    update: async (req, res, next) => {
        const resp = await update(Comment, Post, req.body, req.params.postId, req.params.commentId, ObjectId)

        return res.status(resp.code).json(resp.status ? resp.data : resp.err);
    },
    deleteOne: async (req, res, next) => {
        const resp = await deleteOne(Comment, Post, req.params.postId, req.params.commentId, ObjectId)

        return res.status(resp.code).json(resp.status ? resp.data : resp.err);
    }
}