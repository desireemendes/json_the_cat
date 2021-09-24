const request = require('request');

const fetchBreedDescription = function(breedName, callback) {

  request('https://api.thecatapi.com/v1/breeds', function(requestError, response, body) {
  
    let error = null;

    if (requestError) {
      callback([requestError, response], null);
      return;
    }

    if (!breedName) {
      error = "Invalid.";
      callback(error, null);
      return;
    }

    const data = JSON.parse(body);
  
    let catNames = [];
    for (const cat of data) {
      catNames.push(cat.name.toLowerCase());
    }

    breedName = breedName.toLowerCase();
  
    if (breedName === "list") {
      const description = catNames;
      callback(null, description);
      return;
    }
  
    if (catNames.includes(breedName)) {
      const catS = catNames.indexOf(breedName);
      const description = data[catS].description;
      callback(null, description);
    } else {
      error = "Cats breed not found.";
      callback(error, null);
      return;
    }
  });
};

module.exports = { fetchBreedDescription };