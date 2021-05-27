const update = async (Comment, Post, data, post_id, comment_id, ObjectId) => {
    let { message } = data;
    if (!ObjectId.isValid(post_id)) return { status: false, code: 409, err: { msg: "wrong post id" } }
    if (!ObjectId.isValid(comment_id)) return { status: false, code: 409, err: { msg: "wrong comment id" } }



    try {

        const post = await Post.findById(post_id)
        if (!post) return { status: false, code: 409, err: { msg: "Wrong post id" } }

        const old_comment = await Comment.findOne({ post: post_id });


        if (!old_comment) return { status: false, code: 404, err: { msg: "Not exist" } }
        let post_comments = old_comment.comments;

        const found = post_comments.findIndex(el => ObjectId(el._id).toString() === comment_id);

        if (found != -1) {

            post_comments[found].message = message;
            
        } else
            return { status: false, code: 404, err: { msg: "Comment not exist" } }


        let data = {
            comments: post_comments,
            total_comments: post_comments.length
        }
       

        const patch = await Comment.updateOne({ _id: old_comment._id }, { $set: data });

        if (patch) {
            return { status: true, code: 200, data: { "edited": true } }
        } else
            return { status: false, code: 500, err: { "edited": false } }
    } catch (err) {
        console.log('errrr', err);

        return { status: false, code: 500, err }
    }
}

module.exports=update;