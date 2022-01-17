const cityInput = document.querySelector('[data-city]')

function start() {
  const cityInputValue = cityInput.value
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue}&appid=0bd258d5806127b89d0fc52485b79de5&units=metric`

  if (cityInputValue != '') {
    fetchingApi(url)
  } else {
    alert('Preencha os campos!')
    return
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  }
}

function showPosition(position) {
  let lat = position.coords.latitude
  let lon = position.coords.longitude

  console.log(lat, lon)

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0bd258d5806127b89d0fc52485b79de5&units=metric`

  fetchingApi(url)
}

async function fetchingApi(url) {
  try {
    let res = await fetch(url)
    let data = await res.json()

    dataFill(data)
  } catch (e) {
    console.log(e)
  }
}

function formSubmit(event) {
  event.preventDefault(event)
}

cityInput.addEventListener('keypress', e => {
  if (e.code === 'Enter') {
    start()
  }
})

function dataFill(data) {
  const divWeatherData = (document.querySelector(
    '.weather-data'
  ).style.display = 'block')
  const city = document.querySelector('[data-location]')
  const weather = document.querySelector('[data-weather]')
  const humidity = document.querySelector('[data-humidity]')
  const feelsLike = document.querySelector('[data-feels-like]')
  const locationIcon = document.querySelector('.icons')

  locationIcon.innerHTML = `<img src="icons/${data.weather[0].icon}.png"></img>`
  weather.textContent = data.main.temp + '°C'
  city.innerHTML = `<i class="fas fa-location-arrow"></i> ${data.name}, ${data.sys.country} `
  humidity.innerHTML = `<i class="fas fa-tint"></i> ${data.main.humidity}% Humidity`
  feelsLike.innerHTML = `<i class="fas fa-temperature-high"></i> ${data.main.feels_like}°C Feels Like `
}
