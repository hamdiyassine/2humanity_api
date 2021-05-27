var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Post=new Schema({
    title:{type:String,default:"",required:true},
    content:{type:String,default:"",required:true},
    media:{type:String,default:"",required:true},
    category:{type:String,default:"",required:true},
     
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
module.exports=mongoose.model('Post',Post);
