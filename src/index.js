// ---------------------- Date and time ----------------------
let now = new Date();
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
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
let temperature;

function convertToFahrenheit(event) {
  event.preventDefault();
  if (mod == true) {
    let temperatureElement = document.querySelector("#temperature");
    temperature = Math.round((temperature * 9) / 5 + 32);
    temperatureElement.textContent = `${temperature}º`;
    activeDisabled();
    mod = false;
  }
}

function convertToCelsius(event) {
  event.preventDefault();
  if (mod == false) {
    let temperatureElement = document.querySelector("#temperature");
    temperature = Math.round(((temperature - 32) * 5) / 9);
    temperatureElement.textContent = `${temperature}º`;
    activeDisabled();
    mod = true;
  }
}

function activeDisabled() {
  let celsiusLink = document.querySelector("#celsiusLink");
  let fahrenheitLink = document.querySelector("#fahrenheitLink");
  if (mod == false) {
    fahrenheitLink.classList.remove("link-selected");
    celsiusLink.classList.toggle("link-selected");
  } else {
    celsiusLink.classList.remove("link-selected");
    fahrenheitLink.classList.toggle("link-selected");
  }
}

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", convertToCelsius);

// ---------------------- Weather information ----------------------

let dailyIcons = [
  // ----------- Day time icons -----------
  {
    name: "clear sky",
    defaultIcon: "http://openweathermap.org/img/wn/01d@2x.png",
    newIcon: "fa-sun",
  },
  {
    name: "few clouds",
    defaultIcon: "http://openweathermap.org/img/wn/02d@2x.png",
    newIcon: "fa-cloud-sun",
  },
  {
    name: "scattered clouds",
    defaultIcon: "http://openweathermap.org/img/wn/03d@2x.png",
    newIcon: "fa-cloud",
  },
  {
    name: "	broken clouds",
    defaultIcon: "http://openweathermap.org/img/wn/04d@2x.png",
    newIcon: "fa-cloud",
  },
  {
    name: "	shower rain",
    defaultIcon: "http://openweathermap.org/img/wn/09d@2x.png",
    newIcon: "fa-cloud-showers-heavy",
  },
  {
    name: "	rain",
    defaultIcon: "http://openweathermap.org/img/wn/10d@2x.png",
    newIcon: "fa-cloud-sun-rain",
  },
  {
    name: "	thunderstorm",
    defaultIcon: "http://openweathermap.org/img/wn/11d@2x.png",
    newIcon: "fa-bolt",
  },
  {
    name: "	snow",
    defaultIcon: "http://openweathermap.org/img/wn/13d@2x.png",
    newIcon: "fa-snowflake",
  },
  {
    name: "	mist",
    defaultIcon: "http://openweathermap.org/img/wn/50d@2x.png",
    newIcon: "fa-smog",
  },
  // ----------- Night time icons -----------
  {
    name: "clear night sky",
    defaultIcon: "http://openweathermap.org/img/wn/01n@2x.png",
    newIcon: "fa-moon",
  },
  {
    name: "cloud moon",
    defaultIcon: "http://openweathermap.org/img/wn/02n@2x.png",
    newIcon: "fa-cloud-moon",
  },
  {
    name: "night scattered clouds",
    defaultIcon: "http://openweathermap.org/img/wn/03n@2x.png",
    newIcon: "fa-cloud",
  },
  {
    name: "night broken clouds",
    defaultIcon: "http://openweathermap.org/img/wn/04n@2x.png",
    newIcon: "fa-cloud",
  },
  {
    name: "night shower rain",
    defaultIcon: "http://openweathermap.org/img/wn/09n@2x.png",
    newIcon: "fa-cloud-showers-heavy",
  },
  {
    name: "night	rain",
    defaultIcon: "http://openweathermap.org/img/wn/10n@2x.png",
    newIcon: "fa-cloud-sun-rain",
  },
  {
    name: "night	thunderstorm",
    defaultIcon: "http://openweathermap.org/img/wn/11n@2x.png",
    newIcon: "fa-bolt",
  },
  {
    name: "night	snow",
    defaultIcon: "http://openweathermap.org/img/wn/13n@2x.png",
    newIcon: "fa-snowflake",
  },
  {
    name: "night	mist",
    defaultIcon: "http://openweathermap.org/img/wn/50n@2x.png",
    newIcon: "fa-smog",
  },
];

function displayWeather(response) {
  console.log(response);
  let h1City = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector(".say-status");
  let maxMinTemp = document.querySelector(".degrees");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");

  temperature = Math.round(response.data.main.temp);
  temperatureElement.textContent = `${temperature}º `;
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

// ---------------------- Location ----------------------

function retrievePosition(position, bool) {
  let apiKey = "d5e31ad7d52798f2506ac257f4a8818a";
  let url = "";
  if (bool) {
    let lat = position.coord.lat;
    let lon = position.coord.lon;
    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  } else {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  }
  axios.get(url).then(displayWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

let currentLocation = document.querySelector("#current-city");
currentLocation.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(retrievePosition);
});

// https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}
