const subscibe = async (Event, event_id, data, tokenData)=>{
  let { //user, 
    subscriber_id
  } = data;
  

  try {
    const event = await Event.findById(event_id)
    if(!event) return {status: false, code: 404, err: {msg: "not exist"}}
    

    const subscribers = event.subscribers || []
    
    let exist = false;
    for (let i = 0; i < subscribers.length; i++) {
      if(subscribers[i].subscribe == subscriber_id){
        subscribers.splice(i, 1)
        exist = true
      }
    }
    if(!exist) subscribers.push({subscriber_id})

    const patch = await Event.updateOne({_id: event_id}, {$set: {subscribers}})
    

    if(patch){
      const new_event = await Event.findById(event_id)
      .populate('cover')

      if(!new_event) return {status: false, code: 500, err: {msg: "error saving"}}

      return {status: true, code: 200, data: {event: new_event} }
    }

    return {status: false, code: 500, err: {msg: "error saving"}}
    
  } catch (err) {
    return {status: false, code: 500, err}
  }
}

export default subscibe