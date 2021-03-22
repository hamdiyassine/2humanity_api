const acceptableImage = (mime, types=[])=>{
  console.log('in accept file');
  
  if(!types.length || types==[]) return mime.match('image.*');

  for (let i = 0; i < types.length; i++) {
    if(mime.match(types[i])!=null) return true;
  }
  return {status: false, code: 422, err: {msg: "unacceptable image type"}}
}

export {acceptableImage}