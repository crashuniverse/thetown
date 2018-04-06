const request = require('request');

const url1 = 'https://api.foursquare.com/v2/venues/search?near=Berlin&intent=Browse&categoryId=4d4b7104d754a06370d81259&oauth_token=0NFKW43DRFDMQAIQLKSAMW5PM1MLEL5UI2AD41WO14I35DP1&v=20180406&_=1523029187756';
const url2 = 'https://api.foursquare.com/v2/venues/search?near=Berlin&intent=Browse&categoryId=4d4b7105d754a06373d81259&oauth_token=0NFKW43DRFDMQAIQLKSAMW5PM1MLEL5UI2AD41WO14I35DP1&v=20180406&_=1523029187756';
const url3 = 'https://api.foursquare.com/v2/venues/search?near=Berlin&intent=Browse&categoryId=4d4b7105d754a06374d81259&oauth_token=0NFKW43DRFDMQAIQLKSAMW5PM1MLEL5UI2AD41WO14I35DP1&v=20180406&_=1523029187756';
const url4 = 'https://api.foursquare.com/v2/venues/search?near=Berlin&intent=Browse&categoryId=4d4b7105d754a06376d81259&oauth_token=0NFKW43DRFDMQAIQLKSAMW5PM1MLEL5UI2AD41WO14I35DP1&v=20180406&_=1523029187756';
const url5 = 'https://api.foursquare.com/v2/venues/search?near=Berlin&intent=Browse&categoryId=4d4b7105d754a06377d81259&oauth_token=0NFKW43DRFDMQAIQLKSAMW5PM1MLEL5UI2AD41WO14I35DP1&v=20180406&_=1523029187756';

apiRequest(url1, function (venue) {
  console.log(venue);
});

apiRequest(url2, function (venue) {
  console.log(venue);
});

apiRequest(url3, function (venue) {
  console.log(venue);
});

apiRequest(url4, function (venue) {
  console.log(venue);
});

apiRequest(url5, function (venue) {
  console.log(venue);
});

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