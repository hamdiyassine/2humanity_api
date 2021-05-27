const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Event = Schema({

    name: { type: String, default: "" },
    cover: {type: String,default:"" },
    category:{type: String, default: ""},
    date_start: { type: Date, default: "" },
    date_end: { type: Date, default: "" },

    
    address: { type: String, default: "" },

    desc: { type: String, default: "" },

    subscribers: [
      {
      subscribe: { type: Schema.Types.ObjectId, ref: 'User' },
    }
  ],


    user:{type: Schema.Types.ObjectId, ref:"User"}
}, {
    collection: 'events'
}
);

module.exports = mongoose.model('Event', Event)