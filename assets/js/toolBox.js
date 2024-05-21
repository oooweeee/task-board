// strings we want to reuse for console logging 
const logStrings = {storeErr: "storage Error: " }
// this will remove the chars from strings for key generation 
const badKeyChars = ['-', ':', '.', '\\', '[', ']', '{', '}'];
// this will generate a key based on the js Date obj passed
function keyGenerator(date){
    // this will create a key string with the special characters everytime because it is based on time
    let key = date.toISOString();
    // use a for loop with an inline function declaration to remove unwanted characters from the key. this is a foreach displayed as a for loop 
    //for (let i = 0; i < badkeyChars.length; i++) { key = key.replaceAll(badchars[i], ''); }
    badKeyChars.forEach((char) =>{
         key = key.replaceAll(char, '');
    });
    return key;
    }
    