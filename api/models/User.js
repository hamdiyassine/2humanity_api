const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = Schema({
  name : {type: String, default: ""},
  email: { type: String, default: "", trim: true },
  pass: { type: String, default: "" },
  name: { type: String, default: "" },
  rating: { type: Number, default: 0, trim: true },
  
  type: { type: String,trim: true , enum: ["association", "volunteer"] },
  category:{type:String,default:"Other"},

  avatar: { type: Schema.Types.ObjectId, ref: 'Media', default: '528149b38da5b85003000002' },


  mobile: { type: String, default: "", trim: true },
  points:{type:Number,default:0},

  // new
  posts: [
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Post'
    }
 ],
 addresse: { type: String, default: "", trim: true },


  addresse: {
    type: String, default: ""
  },

 addresse_ip: { type: String, default: ""},



  is_active: { type: Boolean, default: false },
}, {
  collection: 'users',
  timestamps: true
});

module.exports = mongoose.model('User', User);