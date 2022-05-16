var key4api = `302b573884b541013a8536ccbbae8a5d`;
var weatherapi = `https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly&appid=${key4api}`;
var geocode = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname},${statecode},&limit=${limit}&appid=${key4api}`;
var lon;
var lat;
var limit;
var statecode;

var results = document.querySelector(".citymain");
var searchbtn = document.querySelector(".citysearch");
var cityname = document.querySelector(".searchname");
var searchtxt= document.querySelector(".mysearch");
var iconspot = document.getElementById("ricon");
var adddate = document.querySelector(".insdate");
var weekdate= document.querySelector(".weekdate")
var stemp = document.querySelector(".temp");
// var weekreport= document.querySelector(".5day");
var shumidity = document.getElementById("humidity");
var wind = document.querySelector(".wind");
var weekdtemp =document.querySelector(".weektemp");
var weekh= document.querySelector(".weekhumidity");
var weekw = document.querySelector(".weekwind");

// var icon= document.querySelector("");
function getWeather() {
    fetch(weatherapi)
        .then(function (response) {
            return response.json();
        })
        .then(function (apidata) {
            console.log(apidata);
            var utcdets = apidata.current.dt;
            //  var tzoffset= apidata.timezone_offset;
            var date = new Date(utcdets * 1000);
            var presentdate = new Date(utcdets * 1000).toLocaleDateString("en-US")
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var formattedtime = hours + `:` + minutes;
            //  console.log(formattedtime);
            console.log(presentdate);

            var humid = apidata.current.humidity;
            console.log(humid);

            var temp = apidata.current.temp;
            var ktof = ((temp - 273.15) * 1.8) + 32;

            var weatherdetails = apidata.current.weather[0].icon;
            var icon = `http://openweathermap.org/img/wn/${weatherdetails}@2x.png`;

            var windsped = Math.round(apidata.current.wind_speed * 10) / 10;
            console.log(ktof);

            showmainforecast(presentdate, ktof, humid, windsped, icon)

            for (var i= 0; i < 5; i++) {
                var weekutc = apidata.daily[i].dt;
                var weekr = new Date(weekutc * 1000);
                var weekdatedata = weekr.toLocaleDateString();
                console.log(weekdatedata);

                var weekpreicon = apidata.daily[i].weather[0].icon;
                var weekicon = `http://openweathermap.org/img/wn/${weekpreicon}@2x.png`;
                console.log(weekicon);

                var weektemp = apidata.daily[i].temp.day;
                var weekktof = ((weektemp - 273.15) * 1.8) + 32;
                console.log(weekktof);

                var weekwindsped = Math.round(apidata.daily[i].wind_speed * 10) / 10;
                console.log(weekwindsped);

                var weekhumid = Math.round(apidata.daily[i].humidity * 10) / 10;
                console.log(weekhumid);

                showweekforecast(weekdatedata, weekicon, weekktof, weekwindsped, weekhumid)
            }
        })
        .catch(function (err) {
            console.log(err);
        })
}
function showmainforecast(presentdate, ktof, humid, windsped, icon) {
    adddate.textContent = presentdate;
    iconspot.src = icon;
    stemp.textContent = Math.ceil(ktof) + `°F`;
    wind.textContent = windsped;
    shumidity.textContent = humid;
}

function showweekforecast(weekdatedata, weekicon, weekktof, weekwindsped, weekhumid) {
    // weekdate.textContent= weekdatedata;
    $(".5day").append(
        $(`
        <div class="daily">
        <p>${weekdatedata}</p
        <img src="${weekicon}" alt= "weather forcast icon">
        <p>${Math.ceil(weekktof)} °F</p>
        <p>Wind Speed:<div>${weekwindsped}</div>
        <p>Humidity:<div>${weekhumid}</div>`)
    );
}
function lookup(city) {
    if (city === ""){
        return;
    }
    if (localStorage.getItem("Namecity")=== null){
        localStorage.setItem("Namecity",`[]`);
    }
    var historydata= JSON.parse(localStorage.getItem('Namecity'));
    if (historydata.indexOf(city) === -1){
        historydata.push(city);
        localStorage.setItem(`Namecity`,JSON.stringify(historydata));

        var cityparams= `./WeatherReport.html?q=`+city;
        location.assign(cityparams);
    }
}
searchbtn.addEventListener("click", function(event){
    if(searchtxt===""){
        return;
    }
    event.preventDefault();
    var search = document.getElementById("search").value.trim();
    lookup(search);
})
getWeather()