var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Post=new Schema({
    title:{type:String,default:"",required:true},
    content:{type:String,default:"",required:true},
    media:{type:mongoose.Schema.Types.ObjectId, ref:'Media'},
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