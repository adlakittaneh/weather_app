
const nablusBtn = document.getElementById("id1");
const RamallahBtn = document.getElementById("id2");
const JeninBtn = document.getElementById("id3");
const TulkarmBtn = document.getElementById("id4");
const BethlehemBtn = document.getElementById("id5");
const HebronBtn = document.getElementById("id6");
const apiKey = "8f15e6ecf5f2f63f19a8b53fc2e47437";
const city = "";
const locationBtn=document.getElementById("getLocation");
function getTemp(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);

      document.getElementById("city").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("weatherDegree").innerHTML = `${data.main.temp}<sup>°</sup> C`;
      document.getElementById("description").textContent = data.weather[0].description;
      const allDivs = document.getElementsByClassName("allDiv");
      allDivs[0].lastElementChild.textContent = `${data.main.humidity}%`;
      allDivs[1].lastElementChild.textContent = `${data.wind.speed} km/h`;
      allDivs[2].lastElementChild.innerHTML = `${data.main.feels_like}<sup>°</sup> C`;
      allDivs[3].lastElementChild.textContent = `${data.main.pressure} hPa`;
    })
    .catch(error => 
        console.error("Error:", error)
    );
}
function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
      const forecastBox = document.querySelector(".dayBox");
      forecastBox.innerHTML = "<h2>Five-Day Forecast</h2>";

      const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

      dailyForecasts.forEach(day => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        const icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
        const temp = `${Math.round(day.main.temp)}°C`;

        forecastBox.innerHTML += `
          <div class="day">
            <span>${dayName}</span>
            <img src="${icon}" alt="${day.weather[0].description}">
            <span>${temp}</span>
          </div>
        `;
      });
    })
    .catch(error => console.error("Error fetching forecast:", error));
}
locationBtn.addEventListener("click", ()=>{
    if (navigator.geolocation) {
      
        navigator.geolocation.getCurrentPosition(position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
          window.open(url, "_blank");
          }, error => {
            alert("we couldn't find your location");
             });

} else {
        alert("your browser does not support location");
      }
    });
nablusBtn.addEventListener("click", () => {
  getTemp("Nablus");
  getForecast("Nablus");
});

RamallahBtn.addEventListener("click", () => {
  getTemp("Ramallah");
  getForecast("Ramallah");
});
JeninBtn.addEventListener("click", () => {
  getTemp("Jenin");
  getForecast("Jenin");
});
TulkarmBtn.addEventListener("click", () => {
  getTemp("Tulkarm");
  getForecast("Tulkarm");
});
BethlehemBtn.addEventListener("click", () => {
  getTemp("Bethlehem");
  getForecast("Bethlehem");
});
HebronBtn.addEventListener("click", () => {
  getTemp("Hebron");
  getForecast("Hebron");
});


