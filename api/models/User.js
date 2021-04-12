const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = Schema({
  email: { type: String, default: "", trim: true },
  pass: { type: String, default: "" },
  name: { type: String, default: "" },
  rating: { type: Number, default: 0, trim: true },
  
  type: { type: String,trim: true , enum: ["association", "volunteer"] },


  avatar: { type: Schema.Types.ObjectId, ref: 'Media', default: '528149b38da5b85003000002' },


  mobile: { type: String, default: "", trim: true },


  // new
  posts: [
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Post'
    }
 ]
 addresse: { type: String, default: "", trim: true },



  is_active: { type: Boolean, default: false },
}, {
  collection: 'users',
  timestamps: true
});

module.exports = mongoose.model('User', User);