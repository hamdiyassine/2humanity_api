 const Recommended = async (Event,user, offset = null, limit = null) => {
console.log("USER: "+user)
  try {
    const events = await Event.find({user:user._id})
      .skip(parseInt(offset)).limit(parseInt(limit))
      .sort({ _id: -1 })

    // console.log('events', events);
// console.log("user id : "+user)
//  console.log("SUBSRIBER ID"+ events[0].subscribers.subscribe._id)
console.log("events are"+events.length)
    if (!events) return { status: false, code: 500, err: { msg: "error finding" } }

    var foods=0;
    var educts=0;
    var clothes=0;
    var bloodDonation=0;
    var Environment=0;
    var Other=0;
    var max;
    var Finalcategory;
 for( i=0;i<events.length;i++){

   for(j=0;j<events[i].subscribers.length;i++){
    console.log('user_id:'+user)
    if(events[i].subscribers[j].subscribe==user){
      console.log("subscibers"+events[i].subscribers[j].subscribe)
      if(events[i].category=='Food'){
        foods++;
         }else if(events[i].category=='Education'){
           educts++
         }
         else if(events[i].category=='Clothes'){
            clothes++
          }
          else if(events[i].category=='Blood donation'){
            bloodDonation++
          }
          else if(events[i].category=='Environment'){
            Environment++
          }
          else {
            Other ++;
          }
          max=Math.max(foods,educts,clothes,Environment,bloodDonation,Other);
     
    }
   }
  
    
    //  console.log("number of food events are: "+foods)

 }
 

 if(max==foods){
    Finalcategory="Food";

  }
  else if(max==clothes){
   Finalcategory="Clothes";

  }
  else if(max==educts){
   Finalcategory="Education";

  }
  
else if(max==bloodDonation){
  Finalcategory="Blood donation";

}
else if(max==Environment){
  Finalcategory="Environment";

}
else {
  Finalcategory="Other";

}
  console.log(max, Finalcategory)
  
  const RecEvents = await events.filter(function(event){
return event.category==Finalcategory
 })
//  console.log("user info is "+events_by_user);
var FinalEvents=[];
if(max===foods===clothes===Environment===Other===educts===bloodDonation){
FinalEvents=events
}
else {
  FinalEvents=RecEvents
}
  return { status: true, code: 200,data:FinalEvents}
    } catch (err) {
      return { status: false, code: 500, err }
    }
  }
  
module.exports=Recommended;