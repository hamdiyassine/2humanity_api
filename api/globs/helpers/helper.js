const isValidEmail = require('./is-valid-email');
const makeHttpError=require('./http-error');
export  function upperFirst (word) {
  if (word.length === 1) return word.toUpperCase()
  
  return word.charAt(0).toUpperCase() + word.substring(1)
}

const helper = {isValidEmail, upperFirst, makeHttpError};

export default helper 