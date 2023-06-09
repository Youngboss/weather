var submitSearchBtn = function(){
    var searchText = $("#weatherSearchText").val()
    submitSearch(searchText)
}

var searchHistoryBtn = function(thisHistory){
    var searchText = $(thisHistory).text()
    submitSearch(searchText)
}

var submitSearch = function(searchText){

    searchText = searchText.trim().toUpperCase() //chage all text to uppercase and removes spaces
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

                addHistory(searchText);
                showHistory();

                let cityId = weatherData.id 
                var Url = "https://api.openweathermap.org/data/2.5/forecast?id="+cityId+"&appid="+apiKey+"&units=imperial"
                $.get(Url,null,function(forecastData){
                    // console.log(forecastData);
                    let i = 0
                    for (k=0; k < forecastData.list.length; k++){
                        let forecast = forecastData.list[k]
                        if (forecast.dt_txt.includes("12:00:00")){
                            console.log(forecast)
                            i++
                            $("#forecast" +i).find(".forecastDate").text(forecast.dt_txt.replace(" 12:00:00", ""))
                            $("#forecast" +i).find(".forecastTemp").text(forecast.main.temp)
                            $("#forecast" +i).find(".forecastSpeed").text(forecast.wind.speed)
                            $("#forecast" +i).find(".forecastHumidity").text(forecast.main.humidity)
                        }
                    }
                })


            })
        }


    } )

}

var addHistory = function(searchItem){
   
    var history = new Array()
    var oldHistory = JSON.parse( localStorage.getItem("searchHistory"))
    console.log(oldHistory)
    if (oldHistory instanceof Array) history = oldHistory

        if (history.includes(searchItem)){
            for (i = 0; i < history.length; i++){
                if (history[i]== searchItem){
                    history.splice(i,1)
                }

                
            }
        }

         history.unshift(searchItem)
         console.log(history)
         localStorage.setItem("searchHistory",JSON.stringify(history))
        // const p = document.createElement("p")
        // p.innerHTML = (weatherData.name)
        // $("#searchHistory").prepend(p);
}


var showHistory = function(){
    $("#searchHistory").text("")
    var history = JSON.parse(localStorage.getItem("searchHistory"))
    if (history === null) history = new Array()
    console.log(history)

    let l = history.length
    if ( l > 0){
        for(i=0; i<l; i++){  
          let p = document.createElement("button")
          p.classList.add("historyItem")
            p.innerHTML = (history[i])
            $("#searchHistory").append(p);

        }
        $(".historyItem").on("click", function (){searchHistoryBtn(this)})
    }        

}

var clearHistory = function(){
    localStorage.removeItem("searchHistory")
    $("#searchHistory").text("")
}

$(document).ready(function(){
    showHistory()
    let searchForm= document.getElementById("weatherSearch")
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
        submitSearchBtn()
        
    })
    $("#ccHistory").on("click", clearHistory)
})

alert("I havent finished but I am working on it ill push the updates as I go along I just need 2 more days super busy but the most important part works :)")
