// Grab reference to submit button
var submitBtn = $("#citySearchSubmit")

// Grab reference to clear button
var clearBtn = $("#clearBtn")

// Get today's date using moment.js
var todayDate = moment().format("dddd, D MMMM YYYY")

// Create global searchItem so it can be used in different functions
var searchItem = ""

// Grab a reference to empty div with id #cityHistory
var cityHistory = $("#cityHistory")

// Create an empty array to be populated with recent searches
var recentSearchesArr = []

// Global variable apiKey as a string
var apiKey = "3a82cc89d61bd71079c6ba07c2e6fc75"

// This on-click function populates the main weather info given an inputted city
submitBtn.click(function(event){
    // Rewrites global variable searchItem to be the result of the search bar
    searchItem = $("#citySearch").val()
    // Grab result of search bar
    var searchResult = $("#citySearch").val()
    // Prevent reloading
    event.preventDefault();
    // Starter url for api weather request
    var starterWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q="
    // Combines multiple elements to create a single queryURL for weather
    var queryURLWeather = starterWeatherURL + searchResult + "&appid=" + apiKey
        
    // ajax api request
    $.ajax({
        url: queryURLWeather,
        method: "GET"
    }).then(function(cityResult){
        var citySpan = $("#cityName")
        var dateSpan = $("#date")
        var temperatureSpan = $("#temperature")
        var humiditySpan = $("#humidity")
        var windSpeedSpan = $("#wind-speed")
        var uvLatitude = cityResult.coord.lat
        var uvLongitude = cityResult.coord.lon
        citySpan.text(searchResult)
        dateSpan.text(todayDate)
        temperatureSpan.text(cityResult.main.temp)
        humiditySpan.text(cityResult.main.humidity)
        windSpeedSpan.text(cityResult.wind.speed)
        uvIndex(uvLatitude, uvLongitude)
        forecast(searchResult)
        add2RecentSearch(searchResult);
        add2LocalStorage();
    })
})

// This on-click function clears the recent searches bar
clearBtn.click(function(event){
    event.preventDefault()
    localStorage.removeItem("cities")
    cityHistory.empty()
})


// This function populates the uv-index info of the requested city
function uvIndex(lat, lon){
    var starterUVURL = "https://api.openweathermap.org/data/2.5/uvi?appid="
    var queryURLuvIndex = starterUVURL + apiKey + "&lat=" + lat + "&lon=" + lon 
    
    $.ajax({
        url:queryURLuvIndex,
        method: "GET"
    }).then(function(uvResult){
        var uvIndexSpan = $("#uv-index")
        uvIndexSpan.text(uvResult.value)
    })
}

// This function populates the 5-day forecast of the requested city
// call: api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
function forecast(city){
    var starterForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="
    var queryURLForecast = starterForecastURL + city + "&appid=" + apiKey
    
    $.ajax({
        url:queryURLForecast,
        method: "GET"
    }).then(function(forecastResult){
        var dayTracker = 1;
        for (var i=0; i<5; i++) {
            var nextDays = forecastResult.list[(8*i)+3]
            var dayDate = nextDays.dt_txt
            var dayWeather = nextDays.weather[0].main
            var dayTemp = nextDays.main.temp
            var dayHumidity = nextDays.main.humidity
            $(`#day-${dayTracker}-date`).text(dayDate)
            $(`#day-${dayTracker}-weather`).text(dayWeather)
            $(`#day-${dayTracker}-temp`).text(dayTemp)
            $(`#day-${dayTracker}-humidity`).text(dayHumidity)
            dayTracker++;
        }
    })
}


// This function adds the most recently searched city to the left recent search bar
function add2RecentSearch(city) {
    var newBtn = $("<button>")
    recentSearchesArr.push(city)
    newBtn.text(city)
    newBtn.addClass("btn py-2 px-2 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline text-white recent-search")
    newBtn.attr("id", city)
    newBtn.on("click", function(){
        (console.log("clicked"))
    })
    cityHistory.prepend(newBtn)
}

function add2LocalStorage() {
    localStorage.setItem("cities", JSON.stringify(recentSearchesArr))
}

function renderSearches() {
    var storedSearches = JSON.parse(localStorage.getItem("cities"))
    if (storedSearches) {
        for (var j=0; j<storedSearches.length; j++) {
            add2RecentSearch(storedSearches[j])
        }
    }
}

renderSearches();

// Weather API key: 3a82cc89d61bd71079c6ba07c2e6fc75
// Weather API key: 04be52fea59c58e48125f0ac059699be