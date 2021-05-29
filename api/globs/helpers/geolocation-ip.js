import axios from 'axios';

const getGeolocationIp = async options =>{
    
    let {adressIp} = options
    // const data = {
    //     ip : adressIp
    // }

    // console.log('///////////// data', data);
    let result = null

    await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=e19c14f22d7a4910a00e7ef9a0d12afa`, {ip:adressIp}, {
        // params : {apiKey : 'e19c14f22d7a4910a00e7ef9a0d12afa',}
    })
    .then(resp=>{
        //   console.log("//getGeolocationIp => ",resp);
          
        // return res.status(200).json({ data : resp });
        result = resp.data ;
        
    })
    .catch(error=>{
    //    return res.status(401).json({ msg: error });
        console.log("//getGeolocationIp  error => ",error);
        result = error ;
    })
    return result
}

module.exports = getGeolocationIp