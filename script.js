// Grab reference to submit button
var submitBtn = $("#citySearchSubmit")

// Get today's date using moment.js
var todayDate = moment().format("dddd, D MMMM YYYY")

// Create global searchItem so it can be used in different functions
var searchItem = ""

// Grab a reference to empty div with id #cityHistory
var cityHistory = $("#cityHistory")

// Create an empty array ?
var recentSearches = []

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
        add2RecentSearch();
        add2LocalStorage(searchResult);
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

// This function adds the most recently searched city to the left recent search bar
function add2RecentSearch() {
    var newBtn = $("<button>")
    recentSearches.push(searchItem)
    newBtn.text(searchItem)
    newBtn.addClass("btn py-2 px-2 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline text-white recent-search")
    newBtn.attr("id", searchItem)
    newBtn.on("click", function(){
        (console.log("clicked"))
    })
    cityHistory.prepend(newBtn)
}

function add2LocalStorage(cityName) {
    var citySearched = localStorage.setItem(recentSearches.length, cityName)
}


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