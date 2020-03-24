// Grab reference to submit button
var submitBtn = $("#citySearchSubmit")

// Get today's date using moment.js
var todayDate = moment().format("dddd, D MMMM YYYY")

// Create global searchItem so it can be used in different functions
var searchItem = ""

// Grab a reference to empty div with id #cityHistory
var cityHistory = $("#cityHistory")

// Create an empty array to be populated with recent searches
var recentSearchesArr = []

// Create an empty object to be populated with recent searches
var recentSearchesObj = {}

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
        add2RecentSearch();
        // add2LocalStorage();
    })
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
         var forecastDiv = $("#forecast")
        for (var i=0; i<5; i++) {
            var nextDays = forecastResult.list[(8*i)+3]
            var dayDate = nextDays.dt_txt
            // var dayWeather = nextDays.weather[0].main
            // var dayTemp = nextDays.main.temp
            // var dayHumidity = nextDays.main.humidity
            var newDivDate = $("<div>")
            // var newDivWeather = $("<div>")
            // var newDivTemp = $("<div>")
            // var newDivHumidity = $("<div>")
            newDivDate.addClass("text-2xl")
            // newDivWeather.addClass("text-2xl")
            // newDivTemp.addClass("text-2xl")
            // newDivHumidity.addClass("text-2xl")
            // newDivDate.text(dayDate)
            newDivDate.textContent = dayDate
            console.log(dayDate)
            console.log(newDivDate)

            // var dayEl = $("#day-1")
            // dayEl.append(newDivDate)
            // forecastDiv.append(dayEl)
            
            // newDivWeather.html(dayWeather)
            // newDivTemp.html(dayTemp)
            // newDivHumidity.html(dayHumidity)
            var tempId = "day-" + (i+1);
            var targetDiv = document.getElementById(tempId)
            console.log(typeof targetDiv) //returns an object?
            targetDiv.append(newDivDate)
            // // targetDiv.append(newDivWeather)
            // // targetDiv.append(newDivTemp)
            // // targetDiv.append(newDivHumidity)
            forecastDiv.append(targetDiv)
        }
    })
}

// This function adds the most recently searched city to the left recent search bar
function add2RecentSearch() {
    var newBtn = $("<button>")
    recentSearchesArr.push(searchItem)
    // recentSearchesObj.assign({}, recentSearchesArr)
    newBtn.text(searchItem)
    newBtn.addClass("btn py-2 px-2 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline text-white recent-search")
    newBtn.attr("id", searchItem)
    newBtn.on("click", function(){
        (console.log("clicked"))
    })
    cityHistory.prepend(newBtn)
}

// function add2LocalStorage() {
//     localStorage.setItem("cities", JSON.stringify(recentSearchesObj))
// }


function renderSearches() {
    var cityButton = document.getElementById(searchItem)
    console.log(cityButton)
//     var savedSearch = localStorage.getItem()
//     if (savedSearches) {
//         console.log($(savedSearches))
//         // $(this).val(savedSearches)
//     }
//     add2RecentSearch()
}

// renderSearches();

// Weather url
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

// Weather API key: 3a82cc89d61bd71079c6ba07c2e6fc75
// Weather API key: 04be52fea59c58e48125f0ac059699be