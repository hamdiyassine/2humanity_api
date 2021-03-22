import { acceptableImage } from '../helpers/accept-file';
import fs from 'fs'
const Media   = require('../../models/Media');
//const mkdirp = require('mkdirp')

const deleteOneMedia = async (path)=>{
    // console.log('path in delete function',path);
    // try {
    //     fs.unlink(path)
    //     console.error('file removed')  //file removed
    //   } catch(err) {
    //     console.error(err)
    fs.unlink(path, (err) => {
        if (err)  console.log('Delete file error',err);
        // if no error, file has been deleted successfully
        console.log('File deleted!');
        return{msg:'file deleted'} 
    
    });
}

const deleteMedia = async (_id)=>{
  const media = await Media.findById(_id)
  
  if(media)
  fs.unlink(media.path, (err) => {
    if (err) return {status: false, code: 500, err: {msg: "error deleting file"}}

    Media.deleteOne({_id})

    return{msg:'file deleted'} 
  });

  return{msg:'media not exist'} 
}

export {deleteOneMedia, deleteMedia}