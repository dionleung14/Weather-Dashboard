// Grab reference to submit button
var submitBtn = $("#citySearchSubmit")

// Grab reference to clear button
var clearBtn = $("#clearBtn")

// Get today's date using moment.js
var todayDate = moment().format("dddd, D MMMM YYYY")

// Grab a reference to empty div with id #cityHistory
var cityHistory = $("#cityHistory")

// Create an empty array to be populated with recent searches
var recentSearchesArr = []

// Global variable apiKey as a string
var apiKey = "3a82cc89d61bd71079c6ba07c2e6fc75"


// This on-click function populates the main weather info given an inputted city
submitBtn.click(function(event){
    // Prevent reloading
    event.preventDefault();
    // Grab result of search bar
    var searchResult = $("#citySearch").val()
    // Empty search bar
    $("#citySearch").val("")
    // Run function weatherInfo with the searchResult as a parameter
    weatherInfo(searchResult)
    // Add a button to the recent search list with searchResult as a parameter
    add2RecentSearch(searchResult);
    // Adds the search to local storage
    add2LocalStorage();
})

// This on-click function clears the recent searches bar
clearBtn.click(function(event){
    event.preventDefault()
    localStorage.removeItem("cities")
    recentSearchesArr = []
    cityHistory.empty()
})

// This function populates the main weather info and starts other functions that are related to weather
function weatherInfo(city){
    // Unit system check
    var unitSystem = $("#unitSelector").val()
    // Starter url for api weather request
    var starterWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q="
    // Combines multiple elements to create a single queryURL for weather
    var queryURLWeather = starterWeatherURL + city + "&appid=" + apiKey + "&units=" + unitSystem
        
    // ajax api request for main weather info
    $.ajax({
        url: queryURLWeather,
        method: "GET"
    }).then(function(cityResult){ // Returns the ajax request as cityResult object
        console.log(cityResult)
        // Grab a reference to the city span
        var citySpan = $("#cityName")
        // Grab a reference to the date span
        var dateSpan = $("#date")
        // Grab a reference to the temperature span
        var temperatureSpan = $("#temperature")
        // Grab a reference to the weather Icon span
        var weatherIconSpan = $("#weatherIcon")
        // Grab a reference to the humidity span
        var humiditySpan = $("#humidity")
        // Grab a reference to the wind speed span
        var windSpeedSpan = $("#wind-speed")
        // Stores the latitude and longitude to local variables to be used in the uvIndex function (called later)
        var uvLatitude = cityResult.coord.lat
        var uvLongitude = cityResult.coord.lon
        // Populate html with searched/inputted city and today's date
        citySpan.text(city)
        dateSpan.text(todayDate)
        // Populate the weatherIconSpan with the icon of the current weather
        var weatherIcon = cityResult.weather[0].icon
        var weatherIconURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
        var newWeatherImage = $("<img>")
        newWeatherImage.attr("src", weatherIconURL)
        newWeatherImage.attr("alt", "weather-icon")
        if (weatherIconSpan) {
            weatherIconSpan.empty()
        }
        weatherIconSpan.append(newWeatherImage)
        // Populate html with text and info from the cityResult object
        if (unitSystem == "imperial") {
            temperatureSpan.text(cityResult.main.temp + ` F`)
            windSpeedSpan.text(cityResult.wind.speed + ` mph`)
        } else {
            temperatureSpan.text(cityResult.main.temp + ` C`)
            windSpeedSpan.text(cityResult.wind.speed + ` m/s`)
        }
        humiditySpan.text(cityResult.main.humidity + `%`)
        // Run the uvIndex function with local variables
        uvIndex(uvLatitude, uvLongitude)
        // Run the 5-day forecast function with the city parameter
        forecast(city)
    })
}

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
function forecast(city){
    // Unit system check
    var unitSystem = $("#unitSelector").val()
    var starterForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q="
    var queryURLForecast = starterForecastURL + city + "&appid=" + apiKey
    
    $.ajax({
        url:queryURLForecast,
        method: "GET"
    }).then(function(forecastResult){
        var dayTracker = 1;
        for (var i=0; i<5; i++) {
            // The index for forecastResult.list is modified to return a specific hour 
            var nextDays = forecastResult.list[(8*i)]
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
    // Create a new button
    var newBtn = $("<button>")
    // Update the recent searches array with the city searched
    recentSearchesArr.push(city)
    // Put the text of the button as the city searched
    newBtn.text(city)
    // Style the button BAM BAM
    newBtn.addClass("btn py-2 px-2 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline text-white recent-search")
    // Give the button an id matching its text
    newBtn.attr("id", city)
    // Display it on the page in the paragraph placeholder. CSS written to display .recent-search as block and not in-line
    cityHistory.prepend(newBtn)
}

// This on-click function assigned to the document handles event propagation
// If the page is clicked and the cursor is on an element with the class recent-search (only buttons on the left have this class)
// it runs the weatherInfo function using the button's city, also stored as id
$(document).on("click", ".recent-search", function(){
    weatherInfo($(this).attr("id"))
})

// This function uses the array of recentSearches to store to local storage
function add2LocalStorage() {
    localStorage.setItem("cities", JSON.stringify(recentSearchesArr))
}

// This function pulls from localStorage (if there are recent cities) and adds the buttons
function renderSearches() {
    var storedSearches = JSON.parse(localStorage.getItem("cities"))
    if (storedSearches) {
        for (var j=0; j<storedSearches.length; j++) {
            // Build the recent search bar with the localStorage array
            add2RecentSearch(storedSearches[j])
        }
    }
}

// On page load, run renderSearches
renderSearches();

// call: api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
// Weather API key: 3a82cc89d61bd71079c6ba07c2e6fc75
// Weather API key: 04be52fea59c58e48125f0ac059699be