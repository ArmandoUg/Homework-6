var key4api = `302b573884b541013a8536ccbbae8a5d`;


var weatherapi = `https://api.openweathermap.org/data/2.5/onecall?`;
var lon;
var lat;
var statecode;

var results = document.querySelector(".citymain");
var searchbtn = document.querySelector(".citysearch");
var cityname = document.querySelector(".searchname");
var Namecity = document.getElementById("mysearch");
var iconspot = document.getElementById("ricon");
var adddate = document.querySelector(".insdate");
var weekdate = document.querySelector(".weekdate")
var stemp = document.querySelector(".temp");
// var weekreport= document.querySelector(".5day");
var shumidity = document.getElementById("humidity");
var wind = document.querySelector(".wind");
var myuv = document.querySelector(".uv");
var weekdtemp = document.querySelector(".weektemp");
var weekh = document.querySelector(".weekhumidity");
var weekw = document.querySelector(".weekwind");
var pastdis = document.getElementById("pastgoeshere");
var pastbtnn = document.getElementById(`historybtn`);
// var encodecity= encodeURI(searchtxt);


// var icon= document.querySelector("");
function geodets(Namecity) {
    var geocode = `https://api.openweathermap.org/geo/1.0/direct?q=${Namecity}&limit=5&appid=${key4api}`;
    fetch(geocode)
        .then(function (response) {
            return response.json();
        })
        .then(function (geoapidata) {
            console.log(geoapidata)
            lon = geoapidata[0].lon;
            console.log(lon);
            lat = geoapidata[0].lat;
            console.log(lat);
            cityname.textContent = Namecity;
            pullWeather(lat, lon);
        })
        .catch(function (err) {
            console.log(err);
        })
}

function pullWeather(lat, lon) {
    fetch(weatherapi + `lat=${lat}&lon=${lon}&exclude=hourly&appid=${key4api}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (apidata) {
            console.log(apidata);
            var utcdets = apidata.current.dt;
            var date = new Date(utcdets * 1000);
            var presentdate = new Date(utcdets * 1000).toLocaleDateString("en-US")
            var hours = date.getHours();
            var minutes = "0" + date.getMinutes();
            var formattedtime = hours + `:` + minutes;

            if (hours > 6) {
                document.getElementById("fcard").style.backgroundImage = "url('./images/Clear Sky.jpg')";
                document.getElementById('fcard').style.color = `black`;
            };
            if (hours > 19 || hours < 5) {
                document.getElementById("fcard").style.backgroundImage = "url('./images/Night sky.jpg')";
                document.getElementById('fcard').style.color = `white`;
            };

            //  console.log(formattedtime);
            console.log(presentdate);
            console.log(formattedtime);

            var humid = apidata.current.humidity;
            console.log(humid);

            var temp = apidata.current.temp;
            var ktof = ((temp - 273.15) * 1.8) + 32;

            var weatherdetails = apidata.current.weather[0].icon;
            var icon = `http://openweathermap.org/img/wn/${weatherdetails}@2x.png`;

            var windsped = Math.round(apidata.current.wind_speed * 10) / 10;
            console.log(ktof);

            var uv = apidata.current.uvi;



            showmainforecast(presentdate, ktof, humid, windsped, icon, uv)
            $(`.5day`).html(``);
            for (var i = 0; i < 5; i++) {
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
function showmainforecast(presentdate, ktof, humid, windsped, icon, uv) {
    adddate.textContent = presentdate;
    document.getElementById("ricon").style.display = "block";
    iconspot.src = icon;
    stemp.textContent = Math.ceil(ktof) + `??F`;
    wind.textContent = "Wind Speed:" + ` ` + windsped + `mph`;
    shumidity.textContent = "Humidty:" + `    ` + humid;
    myuv.textContent = "UV Index:" + ` ` + uv;
    if (uv > 10.9) {
        document.getElementById(`uvc`).style.color = `purple`;
    }
    if (uv < 11) {
        document.getElementById(`uvc`).style.color = `red`;
    }
    if (uv < 7.9) {
        document.getElementById(`uvc`).style.color = `orange`;
    }
    if (uv < 5.9) {
        document.getElementById(`uvc`).style.color = `yellow`;
    }
    if (uv < 2.9) {
        document.getElementById(`uvc`).style.color = `green`;
    }
}

function showweekforecast(weekdatedata, weekicon, weekktof, weekwindsped, weekhumid) {
    // weekdate.textContent= weekdatedata;
    $(".5day").append(
        $(/*html*/`
        <div class="daily">
        <p>${weekdatedata}</p>
        <img src="${weekicon}" alt= "weather forcast icon">
        <p>${Math.ceil(weekktof)} ??F</p>
        <p>Wind Speed: ${weekwindsped}mph </p>
        <p>Humidity: ${weekhumid}</p>`)
    );
}
function lookup(city) {
    if (city === "") {
        return;
    }

    var historydata = JSON.parse(localStorage.getItem('Namecity')) || [];
    if (historydata.indexOf(city) == -1) {
        historydata.push(city);
        localStorage.setItem(`Namecity`, JSON.stringify(historydata));
    }
    geodets(city);
    console.log(city);
}
showpast()
function showpast() {
    var past = JSON.parse(localStorage.getItem(`Namecity`));

    if (past) {
        for (var i = 0; i < past.length; i++) {
            var pastbtn = document.createElement(`button`);
            pastdis.append(pastbtn);
            pastbtn.setAttribute(`id`, `${past[i]
                } historybtn`);
            pastbtn.setAttribute(`data-id`, `${past[i]
                }`);
            pastbtn.setAttribute(`class`, `historybtn btn-primary btn-lg`);
            pastbtn.textContent = `${past[i]
                }`;

            pastbtn.addEventListener("click", function (event) {
                // event.preventDefault();
                pastsearch = event.target.getAttribute(`data-id`);
                console.log('event is listening');
                lookup(pastsearch);
            })
        }
    } else {
        console.log(`No past searches found`);
    }
}
searchbtn.addEventListener("click", function (event) {
    if (Namecity === "") {
        return;
    }
    event.preventDefault();
    var search = document.getElementById("search").value.toUpperCase();
    lookup(search);
    showpast();
})


// geodets();
// pullWeather();
