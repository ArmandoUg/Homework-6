var key4api = `302b573884b541013a8536ccbbae8a5d`;
var weatherapi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${key}`;
var geocode = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname},${statecode},${countrycode}&limit=${limit}&appid=${APIkey}`;
var results = document.querySelector(".citymain");
