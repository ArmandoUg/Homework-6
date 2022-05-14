var key4api = `302b573884b541013a8536ccbbae8a5d`;
var weatherapi = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${key4api}`;
var geocode = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname},${statecode},&limit=${limit}&appid=${key4api}`;
var lon;
var lat;
var limit;
var statecode;

var results = document.querySelector(".citymain");
var searchbtn = document.querySelector(".citysearch");
var cityname = document.querySelector(".searchname");
var stemp= document.querySelector(".temp")
var shumidity= document.querySelector(".humidty");
var wind = document.querySelector(".wind");

// var icon= document.querySelector("");
 function getWeather () {
     fetch(weatherapi)
     .then(function (response) {
         return response.json();
     })
     .then(function (apidata){
         console.log(apidata);
         var utcdets = apidata.current.dt;
        //  var tzoffset= apidata.timezone_offset;
         var date = new Date(utcdets * 1000);
         var presentdate = new Date(utcdets * 1000).toLocaleDateString("en-US")
         var hours = date.getHours();
         var minutes = "0" + date.getMinutes();
         var formattedtime= hours + `:` + minutes;
         console.log(formattedtime);
         console.log(presentdate);

         var humid = apidata.current.humidity;

         var temp = apidata.current.temp;
         var ktoc = ((temp-273.15)*1.8)+32;
         
         var weatherdetails = apidata.current.weather[0].icon;
         var icon = `http://openweathermap.org/img/wn/${weatherdetails}@3x.png`;

         var windsped = Math.round(apidata.current.wind_speed * 10) / 10;
         console.log(ktoc);

         showmainforecast(presentdate, ktoc, humid, windsped, icon)

         for (var i = 1; i < 5; i++) {
             var weekutc = apidata.daily[i].dt;
             var weekr= new Date(weekutc *1000);
             var weekdatedata= weekr.toLocaleDateString();
         }
     })
     .catch(function(err){
         console.log(err);
     })
 }
 getWeather()