/**
 * Parses a stringified CSV file to an object or JSON string
 * @param {String} csv The stringified csv file to parse
 * @param {boolean} [object = true] True returns parsed object; False returns parsed JSOn
 */
function csvToJSON(csv, object = true){
  let result = [[]];
  
  // create RegExp to parse CSV
  const objPattern = new RegExp("(\\,|\\r?\\n|\\r|^)(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|([^\"\\,\\r\\n]*))","gi");
  
  // Create an array to hold our individual pattern
  // matching groups.
  let arrMatches = null;
  
  // loop until objPattern stops matching
  while (arrMatches = objPattern.exec(csv)){
    let strMatchedValue;
    let foundDelimiter = arrMatches[1];
    
    //check to see if row delimiter
    if (foundDelimiter.length && (foundDelimiter != ",")) 
    {
      result.push([]);
    }
    
    // check if value is quoted or unquoted
    if (arrMatches[ 2 ]) {
      
      // unescape double quotes.
      strMatchedValue = arrMatches[2].replace(/\"\"/g, "\"");
    } else {
      strMatchedValue = arrMatches[3];
    }
    
    result[ result.length - 1 ].push( strMatchedValue );
  }
  
  //turn array data into arr of objects
  let headers = result[0];
  
  result.shift();
  
  for(let i = 0; i < result.length; i++) {
    let obj = {};
    
    let currentline = result[i];
    
    for(let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    
    result[i] = obj;
  }
    
  if(object) {
    return result; // JavaScript object    
  } else {
    return JSON.stringify(result); // JSON
  }
}

/**
 * Uses a fetch request to get the data from a csv file and
 * the next function
 * @param {String} URL URL of csv file
 * @param {function} func The callback function
 */
function getSheetData(URL, func) {
  fetch(URL)
		.then(response => {return response.text()})
		.then(data => {func(data);});
}