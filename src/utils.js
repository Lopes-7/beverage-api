/**
 * CODE
 */

// function to get parameters from url 
function getUrlParameters (url) {
    // initialize result
    let result = {};

    // split url into params key=value
    const params = url.split(/\?|&/);

    // for each param get key and value
    for (let param of params){
        // there is a "/" in the string: continue
        if (param.match(/\//))
            continue
        
        // split params from key=value
        let pair = param.split(/=/);
        let key = pair[0];

        // replace every '+' for ' ' in value string
        let spaced = pair[1].replace(/\+/g,' ');

        let value = spaced.toLowerCase();
        // value is a number: add key value to result
        if (!isNaN(Number(value))) {
            result = {...result, [key]: value}
        }
        // value is not a number: add key and value as regular expression to result 
        else {
            result = {...result, [key]: new RegExp(`${value}`, 'i')}
        }
    }

    // result is not empty: return it
    return result;
}


/**
 * EXPORTS
 */
module.exports = getUrlParameters;
