 const deleteOne = async (Event, tokenData, event_id, deleteMedia)=>{

  try {
    const event = await Event.findById(event_id)

    const deleting = await Event.deleteOne({_id: event_id})
    if(!deleting || deleting.deletedCount== 0 ) return {status: false, code: 500, err: {msg: "error deleting"}}

    if(event) deleteMedia(event.cover)

    if(deleting) return {status: true, code: 202, data: {_id: event_id} }
    
  } catch (err) {
    return {status: false, code: 500, err}
  }
}
module.exports=deleteOne;