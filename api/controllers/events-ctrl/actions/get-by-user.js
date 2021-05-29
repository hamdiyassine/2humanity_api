
 const getByUser = async (Event, tokenData, user, offset = 0, limit = 10) => {
  const filter = { user: user }

  // if(!tokenData || !tokenData.admin_roles.includes("ADMIN")){
  //   filter['active'] = false
  // }

  try {
    const events = await Event.find(filter)
      .skip(parseInt(offset)).limit(parseInt(limit))
      .sort({ _id: -1 })

    console.log('events', events);

    if (!events) return { status: false, code: 500, err: { msg: "error finding" } }

    const count = await Event.find(filter).countDocuments()

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

module.exports=getByUser;