
const { createIndexes } = require('../models/Post');
const Post = require('../models/Post');
const User = require('../models/User');
import getAdress from "../globs/helpers/find-adress";
import getGeolocationIp from "../globs/helpers/geolocation-ip";
import getPublicIpAdress from "../globs/helpers/public-IpAdress";


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
    
    

    }  ,


    getByIp : async (req,res)=>{
        const parseIp = (req) =>  req.connection.remoteAddress.split(":")[3];
        let adressIp = parseIp(req)
        //console.log("Adresse Ip : ",adressIp);
        const usersList = []
        const publicIp = await getPublicIpAdress({adressIp})
        // .then(adr =>{
        //     //console.log("Public Ip Adress : " ,adr);
        // })
        if (publicIp){
            //console.log("Public Ip Adress : " ,publicIp);
            
            // const geolocation =
             
            await getGeolocationIp({adressIp:publicIp.ip})
            .then(geo =>{
                const position =  {lat : geo.latitude , lon: geo.longitude }
               // console.log("getGeolocationIp : " ,position);
                
                const users = User.find()
                .then(async (users) =>{
                    //console.log("//users : ",res);
                    for (let i = 0; i < users.length; i++) {
                        await getAdress({adress :users[i].addresse })
                        .then(adressRes=>{
                            //console.log("!!!! adress user : " ,adressRes );
                            if(parseFloat(adressRes.lat)-parseFloat(position.lat)>0 &&  parseFloat(adressRes.lat)-parseFloat(position.lat)<1){
                                usersList.push(users[i]._id)
                            }else{
                                if(parseFloat(position.lat)-parseFloat(adressRes.lat)>0 &&  parseFloat(position.lat)-parseFloat(adressRes.lat)<1){
                                    usersList.push(users[i]._id)
                                }
                            }
                        })
                        
                    }
                    //console.log("///// usersList  : ",usersList);
                    Post.find({ postedBy : { $in: usersList } })
                    .then((posts)=>{
                        console.log("///// posts  : ",posts);
                        res.json(posts);
                    })
                    .catch(err=>console.log(err))
                })

                
             })
             .catch(err=>console.log(err))
        }
        else{
            res.json({error:"ip not found"})
        }
        
        
        // const { id } = req.params;
        // const userByPost = await Post.findById(id).populate('user');
        // Post.find()
        // .then((posts)=>{
        //     res.json(posts);
        // })
        // .catch(err=>console.log(err))

    },
}
