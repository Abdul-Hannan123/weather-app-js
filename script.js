const Url = "https://api.openweathermap.org/data/2.5/weather?q="
const apiKey = "0ba259004fb21a5b8d7eb9610087b8b9";
let button = document.querySelector(".search-bar button");
let img = document.querySelector(".container img");

// this is a eventlistener which call checkweather() fucntion 
button.addEventListener("click", () => {
    checkWeather();
});

// create a async function for work with api
async function checkWeather() {
    let cityValue = document.querySelector(".search-bar input").value;
    const weatherApi = `${Url}${cityValue}&units=metric&appid=${apiKey}`;
    let response = await fetch(weatherApi);
    var reuslt = await response.json();

    if (cityValue == "") {
        alert("⚠ Please enter city name");
    }

// if somebody put wrong spelling of city then he see the error
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }

// if spelling of city name is correct then the following condition executes
    else {
        document.querySelector(".temp").innerHTML = Math.round(reuslt.main.temp) + "°C";
        document.querySelector(".city-name").innerHTML = reuslt.name;
        document.querySelector(".humidity h3").innerHTML = reuslt.main.humidity + " %";
        document.querySelector(".wind-speed h3").innerHTML = reuslt.wind.speed + " Km/h";

// these conditions update the picture according to the weather 
        if (reuslt.weather[0].main == "Clear") {
            img.src = "images/clear.png";

        } else if (reuslt.weather[0].main == "Clouds") {
            img.src = "images/clouds.png";

        } else if (
            reuslt.weather[0].main == "Mist" || reuslt.weather[0].main == "Haze" || reuslt.weather[0].main == "Fog" || reuslt.weather[0].main == "Smoke"
        ) {
            img.src = "images/mist.png";

        } else if (reuslt.weather[0].main == "Rain") {
            img.src = "images/rain.png";

        } else if (reuslt.weather[0].main == "Drizzle") {
            img.src = "images/drizzle.png";

        } else if (reuslt.weather[0].main == "Snow") {
            img.src = "images/snow.png";

        } else {
            img.src = "images/clouds.png"; // fallback
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none"
    }
}