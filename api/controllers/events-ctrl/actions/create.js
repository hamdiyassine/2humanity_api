const create = async (Event, data, tokenData, createOneMedia, files)=>{
  let { 
    user , name, date_start, date_end
  } = data;

  if(!user || user=='') return {status: false, code: 409, err: {msg: "wrong user"}}


  if(!name || name=='') return {status: false, code: 409, err: {msg: "wrong name"}}

  try {
    let cover = null;
    if (files && files.cover) {
      // const folder = ()
      const new_media = await createOneMedia({}, 
        `uploads/events/covers`, files.cover
      )

      if (!new_media.status) return { status: false, code: new_media.code, err: new_media.err }
      cover = new_media.data.media._id
    }

    try {
      if(date_start)  date_start  = new Date(date_start)

      if(date_end)    date_end    = new Date(date_end)


    } catch (error) { return { status: false, code: 409, err: { msg: "wrong dates" } } }


    const event = new Event({
      ...data, cover
    });

    const new_event = await event.save();
    if(!new_event) return {status: false, code: 500, err: {msg: "error saving"}}

    const created_event = await Event.findById(new_event._id)
      .populate('cover')

    if (!created_event) return { status: false, code: 500, err: { msg: "error saving" } }

    return {status: true, code: 201, data: {event: created_event} }
    
  } catch (err) {
    return {status: false, code: 500, err}
  }
}

export default create