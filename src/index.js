// ---------------------- Current week day and hour ----------------------
let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = weekDays[now.getDay()];
let changeToday = document.querySelector(".day-hour");

function updateDate() {
  changeToday.textContent = `${today} ${hour}:${minutes}`;
}

setInterval(updateDate, 1000); //Runs the "func" function every second

// ---------------------- Search Engine ----------------------

let searchForm = document.querySelector("form");
let historico = "";
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let city = cityInput["value"];
  historico = city;
  let apiKey = "d5e31ad7d52798f2506ac257f4a8818a";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  axios.get(url).then((obj) => {
    retrievePosition(obj.data, true);
  });
}
searchForm.addEventListener("submit", searchCity);

// ---------------------- Temperature ----------------------

var mod = true;

function convertToFahrenheit(event) {
  event.preventDefault();
  if (mod == true) {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(
      (temperatureElement.textContent * 9) / 5 + 32
    );
    console.log(temperatureElement);
    mod = false;
  }
}

function convertToCelsius(event) {
  event.preventDefault();
  if (mod == false) {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.textContent = Math.round(
      ((temperatureElement.innerHTML - 32) * 5) / 9
    );
    console.log(temperatureElement);
    mod = true;
  }
}

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", convertToCelsius);

// ---------------------- Location ----------------------

function displayWeather(response) {
  console.log(response);
  let h1City = document.querySelector("#city");
  let tempH1 = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  let description = document.querySelector(".say-status");
  let maxMinTemp = document.querySelector(".degrees");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  tempH1.textContent = `${temperature}º `;
  h1City.textContent = `${response.data.name}, ${response.data.sys.country}`;
  description.textContent = response.data.weather[0].main;
  maxMinTemp.textContent = `${Math.round(
    response.data.main.temp_min
  )}º | ${Math.round(response.data.main.temp_max)}º`;
  humidity.textContent = `Humidity: ${response.data.main.humidity}%`;
  wind.textContent = `Wind speed: ${Number(
    Math.round(response.data.wind.speed * 3.6)
  )} km/h`;
}

function retrievePosition(position, bool) {
  let apiKey = "d5e31ad7d52798f2506ac257f4a8818a";
  let url = "";
  if (bool) {
    console.log("I am in if statement");
    let lat = position.coord.lat;
    let lon = position.coord.lon;
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  } else {
    console.log("I am in else statement");
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  }
  axios.get(url).then(displayWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

let currentLocation = document.querySelector("#current-city");
currentLocation.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(retrievePosition);
});
