const cityInput = document.querySelector('[data-city]')
const c = (el) => document.querySelector(el)
const baseURL = `https://api.openweathermap.org/data/2.5/weather?`

function start() {
  const cityInputValue = cityInput.value
  const url = `${baseURL}q=${cityInputValue}&appid=0bd258d5806127b89d0fc52485b79de5&units=metric`

  if (cityInputValue != '') {
    fetchingApi(url)
    cityInput.value = ''
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

  const url = `${baseURL}lat=${lat}&lon=${lon}&appid=0bd258d5806127b89d0fc52485b79de5&units=metric`

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
  c('.weather-data').style.display = 'block'

  c('[data-location]').innerHTML = `<i class="fas fa-location-arrow"></i> ${data.name}, ${data.sys.country} `
  c('[data-weather]').textContent = data.main.temp + '°C'
  c('[data-humidity]').innerHTML = `<i class="fas fa-tint"></i> ${data.main.humidity}% Humidity`
  c('[data-feels-like]').innerHTML = `<i class="fas fa-temperature-high"></i> ${data.main.feels_like}°C Feels Like `
  c('.icons').innerHTML = `<img src="icons/${data.weather[0].icon}.png"></img>`
}
