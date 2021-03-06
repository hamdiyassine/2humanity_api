const Media  = require('../../models/Media');
// const fs    = require('file-system');

const getAll=require('./get-all');
module.exports = {
  getAll: async (req, res, next) =>{
    const resp = await getAll(Media)
    
    return res.status(resp.code).json(resp.status ? resp.data : resp.err);
  }
}