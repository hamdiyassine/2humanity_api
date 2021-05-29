import axios from 'axios';

const getPublicIpAdress = async options =>{
    
    let {adressIp} = options
    const data = {
        ip : adressIp
    }
    let result = null

    //console.log('--------- > data', data);

    await axios.get(`https://api.ipgeolocation.io/getip`, data, {
        apiKey : 'e19c14f22d7a4910a00e7ef9a0d12afa',
    })
    .then(resp=>{
        //console.log('////// resp', resp.data);
        result = resp.data ;
        
    })
    .catch(error=>{
       result = error ;
    })
    return result
}

module.exports = getPublicIpAdress

