// Function to fetch the data
async function fetchData(url){
    try{
        const response = await fetch(url);
        var data = await response.json();
        showData(data);
    }
    catch (error){
        console.log('error')
        document.getElementsByClassName('container')[0].style.display = 'none';
        document.getElementsByClassName('weather')[0].style.display = 'none';
        
        let txt = document.createElement('p');
        txt.classList.add('heading');
        txt.innerText = 'No results found';
        document.body.append(txt);
    }
}


// Function to display the current as well as forecast data
function showData(data){

    // Current data
    let temp = (data['currentConditions']['temp']);
    let feelsLike = (data['currentConditions']['feelslike']);
    let humidity = (data['currentConditions']['humidity']);
    let wind_speed = (data['currentConditions']['windspeed']);
    let visibility = (data['currentConditions']['visibility']);
    let pressure = (data['currentConditions']['pressure']);
    let icon = (data['currentConditions']['icon']);
    let text = (data['currentConditions']['conditions']);
    let address = data['address'];

    let currentConditions = document.getElementsByClassName('current-weather')[0];

    currentConditions.innerHTML = `
    <div class='card'>
        <p class="temp">${temp}</p><p class="deg">&deg;F</p>
        <p class="location">${address}</p>
        <p class="feels-like">Feels like <b>${feelsLike}</b>&deg;F</p>
        <p class="humidity">Humidity: ${humidity}</p>
        <p class="wind-speed">Wind speed: ${wind_speed}km/hr</p>
        <p class="visibility">Visibility: ${visibility}</p>
        <p class="pressure">Pressure: ${pressure}</p>
        <img class="icon" src='icons/${icon}.png' alt="">
        <p class="text">${text}</p>
    </div>
    `; 

    // Next 5 days' data
    let next = document.getElementsByClassName('five-day-weather')[0];
    next.innerHTML = '';

    for(let i=0; i<5; i++){
        let temp = (data['days'][i]['temp']);
        let feelsLike = (data['days'][i]['feelslike']);
        let humidity = (data['days'][i]['humidity']);
        let wind_speed = (data['days'][i]['windspeed']);
        let visibility = (data['currentConditions']['visibility']);
        let pressure = (data['days'][i]['pressure']);
        let icon = (data['days'][i]['icon']);
        let text = (data['days'][i]['conditions']);
        let date = data['days'][i]['datetime'];

        next.innerHTML += `
        <div class='card'>
            <p class="temp">${temp}</p><p class="deg">&deg;F</p>
            <p class="date">${date}</p>
            <p class="feels-like">Feels like <b>${feelsLike}</b>&deg;F</p>
            <p class="humidity">Humidity: ${humidity}</p>
            <p class="wind-speed">Wind speed: ${wind_speed}km/hr</p>
            <p class="visibility">Visibility: ${visibility}</p>
            <p class="pressure">Pressure: ${pressure}</p>
            <img class="icon" src='icons/${icon}.png' alt="">
            <p class="text">${text}</p>
        </div>
        `; 
    }

}


// Search function
function search(){
    let txt = document.getElementById('input').value.toLowerCase();
    fetchData(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${txt}?unitGroup=us&key=38K47NKK367CSG2JWLL6F62S2&contentType=json`);
}

// Handle the click of submit button
let search_btn = document.getElementById('search-btn');
search_btn.onclick = search;

// Run search function when enter key is pressed
let input = document.getElementById('input');
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        document.getElementById("search-btn").click();
    }
});


// Fetch data
fetchData('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/delhi?unitGroup=us&key=38K47NKK367CSG2JWLL6F62S2&contentType=json');