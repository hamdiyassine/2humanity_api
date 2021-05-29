const patch = async (Event, tokenData, data, event_id, files, createOneMedia, deleteMedia)=>{
  delete data._id;

  let {
    name, date_start, date_end
  } = data;
  
  if(name=='') return {status: false, code: 409, err: {msg: "wrong name"}}
  
  try {
    try {
      if(date_start)  date_start  = new Date(date_start)

      if(date_end)    date_end    = new Date(date_end)


    } catch (error) { return { status: false, code: 409, err: { msg: "wrong dates" } } }
    
    const old_event = await Event.findById(event_id)
    if(!old_event) return {status: false, code: 404, err: {msg: "not exist"}}


    let cover = null;
    if (files && files.cover) {
      const new_media = await createOneMedia({},
        `uploads/events/covers`, files.cover
      )

      if (!new_media.status) return { status: false, code: new_media.code, err: new_media.err }
      cover = new_media.data.media._id
    }

    if(cover) data['cover'] = cover
    else delete data.cover; 

    const patch = await Event.updateOne({_id: event_id}, {$set: data})

    if(patch){
      const new_event = await Event.findById(event_id)
      .populate('cover')
      
      if(!new_event) return {status: false, code: 500, err: {msg: "error saving"}}

      if(cover && old_event.cover) deleteMedia(old_event.cover)

      return {status: true, code: 200, data: {event: new_event} }
    }

    return {status: false, code: 500, err: {msg: "error saving"}}
    
  } catch (err) {
    return {status: false, code: 500, err}
  }
}
module.exports=patch;
