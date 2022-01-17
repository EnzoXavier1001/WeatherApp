function start() {
  const cityInput = document.querySelector('[data-city]').value
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=0bd258d5806127b89d0fc52485b79de5&units=metric`

  if (cityInput != '') {
    pegarApi(url)
  } else {
    alert('Preencha os campos!')
    return
  }
}

function pegarApi(url) {
  fetch(url)
    .then(res => res.json())
    .then(json => preencherDados(json))
}

// document.addEventListener('keypress', e => {
//   e.preventDefault()
//   if (e.code === 'Enter') {
//     start()
//   }
// })

function preencherDados(dados) {
  const divWeatherData = (document.querySelector(
    '.weather-data'
  ).style.display = 'block')
  const city = document.querySelector('[data-location]')
  const weather = document.querySelector('[data-weather]')
  const humidity = document.querySelector('[data-humidity]')
  const feelsLike = document.querySelector('[data-feels-like]')
  const imgCloud = document.querySelector('[data-image]')
  const locationIcon = document.querySelector('.icons')

  console.log(dados)
  locationIcon.innerHTML = `<img src="icons/${dados.weather[0].icon}.png"></img>`

  weather.textContent = dados.main.temp + '°C'
  city.innerHTML = `<i class="fas fa-location-arrow"></i> ${dados.name}, ${dados.sys.country} `
  humidity.innerHTML = `<i class="fas fa-tint"></i> ${dados.main.humidity}% Humidity`
  feelsLike.innerHTML = `<i class="fas fa-temperature-high"></i> ${dados.main.feels_like}°C Feels Like `
}
