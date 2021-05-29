const RecommendedAssociations=async (User,Post,userId) => 
{

try {
  console.log("user id is "+userId)
var CreatedPosts=await Post.find({postedBy:userId})
console.log("CreatedPosts"+CreatedPosts.length+CreatedPosts)

var foods=0;
var educts=0;
var clothes=0;
var bloodDonation=0;
var Environment=0;
var Other=0;
var max;
var Finalcategory;
console.log("hello")

for(i=0;i<CreatedPosts.length;i++){
     
      if(CreatedPosts[i].category=='Food'){
        foods++;
         }else if(CreatedPosts[i].category=='Education'){
           educts++
         }
         else if(CreatedPosts[i].category=='Clothes'){
            clothes++
          }
          else if(CreatedPosts[i].category=='Blood donation'){
            bloodDonation++
          }
          else if(CreatedPosts[i].category=='Environment'){
            Environment++
          }
          else {
            Other ++;
          }
          max=Math.max(foods,educts,clothes,Environment,bloodDonation,Other);
     
        

}
console.log("hi")
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
console.log("Max"+max+ Finalcategory)

var Associations=await User.find({type:"association",category:Finalcategory})
var FinalAssociations=[];
var equals=[];
console.log("foods"+foods+"clothes"+clothes)
 if(foods===clothes){
  FinalAssociations=await User.find({type:"association",category:['Clothes','Food']})
}
if(foods==bloodDonation){
  FinalAssociations=await User.find({type:"association",category:['Blood donation','Food']})

}
if(foods===educts){
  FinalAssociations=await User.find({type:"association",category:['Education','Food']})
}
if(foods===Environment){
  FinalAssociations=await User.find({type:"association",category:['Environment','Food']})
}
if(clothes===Environment){
  FinalAssociations=await User.find({type:"association",category:['Environment','Clothes']})
}
else if(max===foods===clothes===Environment===Other===educts===bloodDonation){
  FinalAssociations=User.find({type:"association"})
}

else {
  console.log("HERE")
  FinalAssociations=Associations
}
  

console.log("associations"+Associations.length)
console.log('final'+FinalAssociations)
    return { status: true, code: 200,data:FinalAssociations} 
}
catch (err) {
    return { status: false, code: 500, err }
  }

}
module.exports = RecommendedAssociations;
