var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Post=new Schema({
    title:{type:String,default:"",required:true},
    content:{type:String,default:"",required:true},
    media:{type:String,default:"",required:true},
<<<<<<< HEAD
=======
    category:{type:String,default:"",required:true},
     
>>>>>>> develop
    postedBy: 
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'User'
        },
    
},

 {
    collection: 'posts',
    timestamps: true
  })
<<<<<<< HEAD
module.exports=mongoose.model('Post',Post);
=======
module.exports=mongoose.model('Post',Post);
>>>>>>> develop
