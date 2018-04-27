const request = require('request');

const apiRoot = 'https://api.foursquare.com/v2/venues/search';
const token = '0NFKW43DRFDMQAIQLKSAMW5PM1MLEL5UI2AD41WO14I35DP1';
const city = 'Berlin';
const categories = ['4d4b7104d754a06370d81259', '4d4b7105d754a06373d81259',
  '4d4b7105d754a06374d81259', '4d4b7105d754a06376d81259',
  '4d4b7105d754a06377d81259'];

categories.map(function(categoryId, index) {
  const url = getUrl(categories[index]);
  apiRequest(url, function(venue) {
    console.log(venue);
  })
});

function getUrl(categoryId) {
  return `${apiRoot}?near=${city}&intent=Browse&categoryId=${categoryId}
    &oauth_token=${token}&v=20180406`;
}

function apiRequest(url, callback) {
  request.get(url, function (error, response, body) {
    if (error) {
      console.log(error);
    }
    const venue = findBestVenue(JSON.parse(body));
    return callback(venue);
  });
}

function findBestVenue(body) {
  const venue = body.response.venues.sort(function(a, b) {
    return b.stats.usersCount - a.stats.usersCount;
  }).map(function(v) {
    return {name: v.name};
  })[0].name;
  return venue;
}