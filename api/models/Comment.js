const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = Schema({

    post: { type: Schema.Types.ObjectId, ref: 'Post' },

    comments: [{
        user: { type: Schema.Types.ObjectId, ref: 'User', default: '528149b38da5b85003000002' },
        created_time: { type: Date, default: () => Date.now() },
        message: { type: String, default: "" },
       
    }],
    

}, {
    collection: 'comments'
});

module.exports = mongoose.model('Comment', Comment);