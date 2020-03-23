// Grab reference to submit button
var submitBtn = $("#citySearchSubmit")

submitBtn.click(function(event){
    // Grab result of search bar
    var searchResult = $("#citySearch").val()
    event.preventDefault();
    var starterURL = "api.openweathermap.org/data/2.5/weather?q="
    var apiKey = "&appid=3a82cc89d61bd71079c6ba07c2e6fc75"
    var queryURL = starterURL + searchResult + apiKey

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(cityResult){
        console.log(cityResult)
        // var temperature = $("#temperature")
        // temperature.text(cityResult.main.temp)
    })
})

// Weather url
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

// Weather API key: 3a82cc89d61bd71079c6ba07c2e6fc75