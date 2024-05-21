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
    // wrapper using jquery to set focus to passed element id
    function focusElementbyId(id) {
        debugger;
        $(`#${id}`).trigger('focus');
    }
    // local starge wrapper needs to return the parsed and stored data also enclosed in a try catch incase we fail rereaval if it fails lof the error and return null
    function getItem(store) {
try {
    let val = localStorage.getItem(store);
    return JSON.parse(val);
} catch (e) {
    console.log(`${logStrings.storeErr}` + e);
    console.log(e);
    return null;
}
    }
    // local starge wrapper to format and store data
function setItem(store, val) {
    val = typeof (val) === 'object' ? JSON.stringify(val) : val;
    localStorage.setItem(store,val);
}
    // create an element with  tag and set its value to val no attrute assignments

//  create an element with tag and sets its innerText to val no attribute assinment