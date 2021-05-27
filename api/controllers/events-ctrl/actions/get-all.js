
 const getAll = async (Event, tokenData, offset = null, limit = null) => {
  
    try {
      const events = await Event.find()
        .skip(parseInt(offset)).limit(parseInt(limit))
        .sort({ _id: -1 })
  
      // console.log('events', events);
  
  
      if (!events) return { status: false, code: 500, err: { msg: "error finding" } }
  
      const count = await Event.find().countDocuments()
      return {
        status: true, code: 200, data: {
          events,
          count: (!count) ? 0 : count
        }
      }
  
    } catch (err) {
      return { status: false, code: 500, err }
    }
  }
  
module.exports=getAll;