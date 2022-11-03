function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }

  let dayIndex = date.getDay();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let monthIndex = date.getMonth();
  let calendar = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = week[dayIndex];
  let month = calendar[monthIndex];
  let todayDate = date.getDate();

  return `${day} ${month} ${todayDate}, ${hours}:${min}`;
}

let currentTime = new Date();
let dayData = document.querySelector("#today");
dayData.innerHTML = formatDate(currentTime);

// Search City & Temperature Input

function displayTemperature(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  // document.querySelector("#city").innerHTML = response.data.name;
  // document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  // document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  // document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  // document.querySelector("#temperature").innerHTML =response.data.weather[0].description;
}

function search(event) {
  event.preventDefault();

  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

function searchCity(city) {
  let apiKey = "3a56f1f74a86f746bo9c87aa352t8f0a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", search);

//Current Location

function showCurrentPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "3a56f1f74a86f746bo9c87aa352t8f0a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

function showFahrenheitTemp(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  //remove the active class of the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

// Convert units

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

let currentLocationButton = document.querySelector("#currentLocation-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Amsterdam");

// Bonus challenge3 - wk4

//function convertToFahrenheit(event) {
//event.preventDefault();
//let temp = document.querySelector("#temperature");
//temp.innerHTML = "64";
// }

//function convertToCelsius(event) {
//event.preventDefault();
//let temp = document.querySelector("#temperature");
//temp.innerHTML = "18";
// }

// let fahrenLink = document.querySelector("#fahrenheit");
// fahrenLink.addEventListener("click", convertToFahrenheit);

// let CelLink = document.querySelector("#celsius");
// CelLink.addEventListener("click", convertToCelsius);
