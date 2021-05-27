
const { createIndexes } = require('../models/Post');
const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {
    create : async (req, res) => {

        user = req.params;
        id = User.id;
        const { title, content,media,category,postedBy} = req.body;
        const post = await Post.create({
            title,
            content,
            media,
            category,
            postedBy //to remove i guess
            
        });
         await post.save()
         .then(post=>{res.json(post)})
         .catch(err=>console.log(err));
         
   
        const userById = await User.findById(id);
        var userP = await User.findById(postedBy);
        console.log("User"+userP)
        console.log("Points"+userP.points)

         userP.points=user.points+1;
        var Newpoints=userP.points+1
         await User.findByIdAndUpdate(postedBy,{points:Newpoints},
            function(err, result) {
              if (err) {
                console.log("error "+err);
              } else {
                console.log(result);
              }
              
            })
        //  User.updateOne(points++)
        
        console.log("User points"+userP.points)

        userById.posts.push(post);
        await userById.save();

        return res.send(userById);
    },

    findById : async (req,res)=>{
        const { id } = req.params;
        const userByPost = await Post.findById(id).populate('user');
        res.send(userByPost);
    },

    update:async(req,res)=> {
        let id=req.params.id;
        await Post.findById(id)
        .then((post=>{
            post.title=req.body.title;
            post.content=req.body.content;
            post.save()
            .then(post=>{
             res.send({messgae:'Post update successfully',status:'success',post:post})
            })
            .catch(err=>console.log(err))
        }))


    },
    getAll:async(req,res)=>{
     Post.find()
     .then((posts)=>{
         res.json(posts);
     })
     .catch(err=>console.log(err))
    },
    
    delete: async(req,res)=>{
    let id=req.params.id;
    await Post.findById(id)
    .then(post=> {post.delete().then(post=>{
        res.send({
            message:'Post deleted successfully',
            status:'success',
            post:post
        })
    })
    .catch(err=>console.log(err))
})
    
    }  
} 
