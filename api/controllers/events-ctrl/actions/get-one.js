 const getOne = async (Event, tokenData, event_id) => {
    try {
      const event = await Event.findById(event_id)
      .populate('cover')
      
      if (!event) return { status: false, code: 500, err: { msg: "error finding" } }
  
      return {
        status: true, code: 200, data: {
          event
        }
      }
  
    } catch (err) {
      return { status: false, code: 500, err }
    }
  }
  module.exports=getOne;