export function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

// export function removeDuplicates(arr, comp) {

//     // store the comparison  values in array
// const unique =  arr.map(e => e[comp])

//   // store the indexes of the unique objects
//   .map((e, i, final) => final.indexOf(e) === i && i)

//   // eliminate the false indexes & return unique objects
//  .filter((e) => arr[e]).map(e => arr[e]);

// return unique;
// }