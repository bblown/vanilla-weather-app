function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes} `;

}
function formatDay(timestamp) {
    let date = new Date(timestamp*1000);
    let day =date.getDay();
    let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHtml = `<div class="row">`;
 
    forecast.forEach(function(forecastDay,index) {
        if (index<6) {
    forecastHtml = forecastHtml +`                     
                        <div class="col-2">
                            <div class="weather-forecast-date">
                                ${formatDay(forecastDay.dt)}
                            </div>
                            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="36" />
                            <div class="weather-forecast-temperature">
                                <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}° </span>
                                <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}° </span>
                            </div>
                        </div>
                `;
        }
    });
    forecastHtml = forecastHtml + `</div>`;
    forecastElement.innerHTML = forecastHtml;
            
}
function getForecast(coordinates) {
    let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
    let apiUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
     axios.get(apiUrl).then(displayForecast);
 
}

function displayTemperature(response) {
     
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML =Math.round(celsiusTemperature);
    cityElement.innerHTML = (response.data.name);
    descriptionElement.innerHTML = (response.data.weather[0].description);
    humidityElement.innerHTML = (response.data.main.humidity);
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt *1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    getForecast(response.data.coord);
}
function search(city) {
let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}
function displayfahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    //remove link
    celsiustLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = celsiusTemperature*1.8+32; 
    temperatureElement.innerHTML =Math.round(fahrenheitTemperature);
}
function displaycelsiusTemperature(event) {
    event.preventDefault();
    celsiustLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML =Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
 

let form = document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", displayfahrenheitTemperature);

let celsiustLink = document.querySelector("#celsiusLink");
celsiustLink.addEventListener("click", displaycelsiusTemperature);

search("New York");
//displayForecast();