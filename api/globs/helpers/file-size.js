const fileSize = (data, maxSize) => {
  console.log('in  file size', data.length / 1048576);

  {if (data.length / 1048576 > maxSize)
    console.log('erreur  size');
    
    return { status: false, code: 422, err: { msg: "file is more than limit" } }}
}

export { fileSize }