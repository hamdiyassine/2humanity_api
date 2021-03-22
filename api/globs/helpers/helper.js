import isValidEmail from "./is-valid-email";
import makeHttpError from "./http-error";

export  function upperFirst (word) {
  if (word.length === 1) return word.toUpperCase()
  
  return word.charAt(0).toUpperCase() + word.substring(1)
}

const helper = {isValidEmail, upperFirst, makeHttpError};

export default helper 