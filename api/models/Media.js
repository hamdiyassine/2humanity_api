const mongoose = require('mongoose');
const Media = mongoose.Schema ({
  path : { type: String, default: "" },
  name : { type: String, default: "" },
  desc : { type: String, default: "" },
  type : { type: String, default: "" },
},{
    collection: 'medias'
});

module.exports = mongoose.model('Media', Media);