const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = Schema({
  name : {type: String, default: ""},
  email: { type: String, default: "", trim: true },
  pass: { type: String, default: "" },

  rating: { type: Number, default: 0, trim: true },
  
  type: { type: String,trim: true , enum: ["association", "volunteer"] },


  avatar: { type: Schema.Types.ObjectId, ref: 'Media', default: '528149b38da5b85003000002' },


  mobile: { type: String, default: "", trim: true },

  addresse: {
    type: String, default: ""
  },


  //active: { type: Boolean, default: true },
}, {
  collection: 'users',
  timestamps: true
});

module.exports = mongoose.model('User', User);