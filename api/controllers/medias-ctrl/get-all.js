const getAll = async (Media)=>{
  try {
    const medias = await Media.find()
    if( !medias ) return {status: false, code: 409, err: {msg: "error getting medias"} }

    return {status: true, code: 200, data: {medias} }
    
  } catch (err) {
    return {status: false, code: 500, err}
  }
}

module.exports=getAll;