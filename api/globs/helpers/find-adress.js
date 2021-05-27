import axios from 'axios';

const getAdress = async options =>{
    
    let {adress} = options
    let result = null
    
    await axios.get(`https://nominatim.openstreetmap.org/search?q=${adress}&format=json&polygon=1&addressdetails=1`)
      .then(resp=>{
          
          let listAdrsse = []
          for (let i = 0; i < resp.data.length; i++) {

            listAdrsse.push({lat:resp.data[i].lat , lon:resp.data[i].lon})
            
          }
         // console.log("getCoordinateFromAdresse SUCCESS: ",listAdrsse);
          //return res.status(200).json({ data : listAdrsse });
          result = listAdrsse[0];
          
      })
      .catch(error=>{
          //console.log("getCoordinateFromAdresse error: ",error);
         // return res.status(401).json({ msg: ' adresse not found' , error });
         result = []
      })

      return result
}

module.exports = getAdress