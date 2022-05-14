var key4api = `302b573884b541013a8536ccbbae8a5d`;
var weatherapi = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${key4api}`;
var geocode = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname},${statecode},&limit=${limit}&appid=${key4api}`;
var lon;
var lat;
var limit;
var statecode;

var results = document.querySelector(".citymain");
var cityname = document.querySelector(".searchname");
var searchbtn = document.querySelector(".citysearch");
// var icon= document.querySelector("");
 function getWeather () {
     fetch(weatherapi)
     .then(function (response) {
         return response.json();
     })
     .then(function (apidata){
         console.log(apidata);
         var utcdets =data.current.dt;
         var tzoffset= data.timezone_offset;
     })
     .catch(function(err){
         
     })
 }