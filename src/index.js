//city search and current time
let now = new Date();
let h5 = document.querySelector(".current-date");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h5.innerHTML = `${day} ${hours}:${minutes}`;

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${city.value}`;
  let apiKey = "e99fa97d19094e3b2c84913629391595";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", showCity);

function changeFarenheit(event) {
  event.preventDefault();
  let farenheit = document.querySelector(".temperature");
  farenheit.innerHTML = `66`;
}

let toFarenheit = document.querySelector("#farenheit-link");
toFarenheit.addEventListener("click", changeFarenheit);

function changeCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector(".temperature");
  celsius.innerHTML = `19`;
}
let toCelsius = document.querySelector("#celsius-link");
toCelsius.addEventListener("click", changeCelsius);

//searched city temperature display
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
}

//current location button:display and the city and current temperature

function displayTemperature(response) {
  let celsius = document.querySelector(".temperature");
  celsius.innerHTML = `19`;
  let div = document.querySelector("#temperature");
  div.innerHTML = `${Math.round(response.data.main.temp)}`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${response.data.name},${response.data.sys.country}`;
}
function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "e99fa97d19094e3b2c84913629391595";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

navigator.geolocation.getCurrentPosition(retrievePosition);
