// Grab reference to submit button
var submitBtn = $("#citySearchSubmit")

// submitBtn.click(function(event){
//     var queryURL = "api.openweathermap.org/data/2.5/weather?q=seattle&appid=304be52fea59c58e48125f0ac059699be"

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(cityResult){
//         console.log(cityResult)
//         // var temperature = $("#temperature")
//         // temperature.text(cityResult.main.temp)
//     })
// })

submitBtn.click(function(event){
    // Grab result of search bar
    var searchResult = $("#citySearch").val()
    event.preventDefault();
    var starterURL = "https://api.openweathermap.org/data/2.5/weather?q="
    var apiKey = "&appid=3a82cc89d61bd71079c6ba07c2e6fc75"
    var queryURL = starterURL + searchResult + apiKey

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(cityResult){
        console.log(cityResult)
        var temperature = $("#temperature")
        temperature.text(cityResult.main.temp)
    })
})

// Weather url
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

// Weather API key: 3a82cc89d61bd71079c6ba07c2e6fc75
// Weather API key: 04be52fea59c58e48125f0ac059699be