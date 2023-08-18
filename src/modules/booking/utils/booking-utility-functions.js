    // Turn data object into array and filter out any empty, null, false or none values. Booleans have a default of false in our database.
    export const removeEmptyValues = (object) => {

      const dataArr = Object.entries(object);
       const filteredArr = dataArr.filter(function ([key, value]) {
         return value !== '' && value !== null ;
       });
       object = Object.fromEntries(filteredArr)
       return object
   }
   
   
   export function pad(n) {
     return n<10 ? '0'+n : n;
   }