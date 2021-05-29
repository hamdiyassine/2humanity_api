

const acceptableImage = require('../helpers/accept-file');
const fileSize=require('../helpers/file-size');
const Media = require('../../models/Media');
const mkdirp = require('mkdirp')

const createOneMedia = async (data, directory, file, type = "any", maxSize = 5242880) => {
  try {

   
    if(type=='image' && !acceptableImage(file.mimetype))
    return {status: false, code: 422, err: {msg: "unacceptable image type"}}


    if(file.data.length/maxSize>1)
    return {status: false, code: 422, err: {msg: "file is more than limit of 1Mb"}}

    // return {status: false, code: 422, err: {msg: "unacceptable image type"}}

    // if (file.data.length / max_size > 1)
    //   return { status: false, code: 422, err: { msg: "file is more than limit of 1Mb" } }

    const { name, desc } = data;

    const made = await mkdirp(directory)
    //TO DO TEST IF DIR CREATED SUCCESS
    // if(!made) return {status: false, code: 422, err: {msg: "error creating directory locattion"}} 

    const file_path = `${directory}/${new Date().toISOString()}-${file.name}`;
    const new_file = await file.mv(file_path)
    // console.log('new file', new_file);

    //TO DO TEST IF FILE CREATED SUCCESS
    // if (!new_file) return { status: false, code: 422, err: { msg: "error uploading file" } }

    const media = new Media({
      path: file_path,
      name: name || file.name,
      desc: desc || "",
      type
    });

    const new_media = await media.save();

    if (!new_media) return { status: false, code: 500, err: { msg: "error saving" } }

    return { status: true, code: 201, data: { media: new_media } }
  } catch (error) {
    console.log('+++++++++++> catch createOneMedia', error);
    return { status: false, code: 422, err: { msg: "error creating directory locattion" } }
  }
}

const createMediaFromBase64 = async (directory, base64String, fs, file_name, desc="", type = "any") => {
  try {
    const made = await mkdirp(directory)
    //TO DO TEST IF DIR CREATED SUCCESS
    // if(!made) return {status: false, code: 422, err: {msg: "error creating directory locattion"}} 

    const base64Image = base64String.split(';base64,').pop();
    const file_path = `${directory}/${new Date().toISOString()}-${file_name}`;

    await fs.writeFileSync(file_path, base64Image, {encoding: 'base64'})
    // console.log('base64Image new_file', new_file)

    //TO DO TEST IF FILE CREATED SUCCESS
    // if (!new_file) return { status: false, code: 422, err: { msg: "error uploading file" } }

    const media = new Media({
      path: file_path,
      name: file_name, desc, type
    });

    const new_media = await media.save();

    if (!new_media) return { status: false, code: 500, err: { msg: "error saving" } }

    return { status: true, code: 201, data: { media: new_media } }
  } catch (error) {
    console.log('+++++++++++> catch createMediaFromBase64', error);
    return { status: false, code: 422, err: { msg: "error creating directory locattion" } }
  }
}

module.exports={createOneMedia, createMediaFromBase64};