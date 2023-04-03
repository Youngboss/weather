

var submitSearch = function(){

    var searchText = $("#weatherSearchText").val()
    var apiKey = "1bad5235f9903fde5bad71da0f4e98a9"
    var Url = "https://api.openweathermap.org/geo/1.0/direct?q="+searchText+",USA&limit=1&appid="+apiKey
    $.get(Url,null,function(geoData){
        console.log(geoData)
        var cityLon = 0
        var cityLat = 0 
       
        
        if (typeof geoData[0] != 'undefined') {
            cityLon = geoData[0].lon || 0
            cityLat = geoData[0].lat || 0
        }
        
        if (cityLat !=0 && cityLon !=0) {
            var Url = "https://api.openweathermap.org/data/2.5/weather?lat="+cityLat+"&lon="+cityLon+"&appid="+apiKey+"&units=imperial"
                $.get(Url,null,function(weatherData){
                console.log(weatherData)
                $("#weatherDetails").show()
                $("#cityName").text(weatherData.name)
                $("#cityTemp").text(weatherData.main.temp)
                $("#cityWind").text(weatherData.wind.speed)
                $("#cityHumid").text(weatherData.main.humidity)
                
                console.log(weatherData.name)
               
            })
        }


    } )

}



$(document).ready(function(){
    let searchForm= document.getElementById("weatherSearch")
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
        submitSearch()
    })
})

alert("I havent finished but I am working on it ill push the updates as I go along I just need 2 more days super busy but the most important part works :)")
