const getPostComments = async (Comment, Post, post_id, ObjectId) => {

    if (!ObjectId.isValid(post_id)) return { status: false, code: 409, err: { msg: "wrong post id" } }


    try {
        const post = await Post.findById(post_id)
        if (!post) return { status: false, code: 409, err: { msg: "Post not exist" } }
        const comments = await Comment.findOne({ post: post_id })
            .populate({
                path: "comments.comments",
                populate: [{
                    path: "user",
                    select: "name mobile avatar ",
                    populate: [{
                        path: "avatar",
                        select: "name path",
                    }]
                }]
            })
        if (comments) {
            return { status: true, code: 200, data: { comments: comments } }
        } else
            return { status: false, code: 409, err: { msg: "no comments" } }

    } catch (err) {
        console.log('err', err);

        return { status: false, code: 500, err }
    }
}

<<<<<<< HEAD
<<<<<<< HEAD
export default getPostComments
=======
module.exports=getPostComments;
>>>>>>> develop
=======
module.exports=getPostComments;
>>>>>>> develop
