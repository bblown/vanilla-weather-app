function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes} `;

}
function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
    let forecastHtml = `<div class="row">`;
    let days = ["Thu","Fri","Sat"];
    days.forEach(function(day) {
    forecastHtml = forecastHtml +`                     
                        <div class="col-2">
                            <div class="weather-forecast-date">
                                ${day}
                            </div>
                            <img src="http://openweathermap.org/img/wn/02d@2x.png" alt="" width="36" />
                            <div class="weather-forecast-temperature">
                                <span class="weather-forecast-temperature-max">18° </span>
                                <span class="weather-forecast-temperature-min">12° </span>
                            </div>
                        </div>
                `;
    });
    forecastHtml = forecastHtml + `</div>`;
    forecastElement.innerHTML = forecastHtml;
            
}

function displayTemperature(response) {
    console.log(response.data)
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

}
function search(city) {
let apiKey = "6cc4cc2b1a264461f62f57395b11f08c";
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
displayForecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", displayfahrenheitTemperature);

let celsiustLink = document.querySelector("#celsiusLink");
celsiustLink.addEventListener("click", displaycelsiusTemperature);

search("New York");
displayForecast();