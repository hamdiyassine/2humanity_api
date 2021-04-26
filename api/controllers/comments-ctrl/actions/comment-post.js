const create = async (Comment, Post, data, tokenData, post_id, ObjectId) => {
    let { message } = data;
    if (!message || message == '') return { status: false, code: 409, err: { msg: "wrong comment" } }

    if (!ObjectId.isValid(post_id)) return { status: false, code: 409, err: { msg: "wrong post id" } }



    try {

        let post_comments = [];

        const post = await Post.findById(post_id)
        if (!post) return { status: false, code: 409, err: { msg: "Wrong post id" } }

        const old_comment = await Comment.findOne({ post: post_id });

        post_comments = old_comment.comments;

        post_comments.push({ user: data.user, message: message })


        let new_data = {
            comments: post_comments
        }

        const patch = await Comment.updateOne({ _id: old_comment._id }, { $set: new_data });

        if (patch) {
            const post = await Post.findById(post_id)
            const comment = await Comment.findOne({ post: post._id })
                .populate({
                    path: "comments.user",
                    select: "name mobile avatar ",
                    populate: [{
                        path: "avatar",
                        select: "name path",
                    }]
                })
            let new_post = {
                ...post._doc,
                comments: comment.comments


            }
            return { status: true, code: 200, data: { "success": true, post: new_post } }
        }

    } catch (err) {
        console.log('errr', err);

        return { status: false, code: 500, err }
    }
}

export default create