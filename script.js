// script.js
const apiKey = "38e5aafd323563bb1de45abd15db33ef"; // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById("cityInput");
const weatherDiv = document.getElementById("weatherResult");

// Function to fetch weather
function getWeather() {
    const city = cityInput.value.trim();

    if (!city) {
        showError("Please enter a city name.");
        return;
    }

    // Show loading message
    weatherDiv.innerHTML = "Fetching weather...";
    weatherDiv.classList.remove("error");
    weatherDiv.classList.add("visible");


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found. Please try again.");
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            updateBackground(data.weather[0].id);
        })
        .catch(error => {
            showError(error.message);
        });
}

// Function to display weather data
function displayWeather(data) {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const wind = data.wind.speed;
    const humidity = data.main.humidity;

    // Capitalize first letter of description
    const weatherDesc = desc.charAt(0).toUpperCase() + desc.slice(1);

    weatherDiv.innerHTML = `
        <div class="weather-header">
            <h2>${data.name}</h2>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weatherDesc}">
        </div>
        <p style="font-size: 3rem; margin: 0; font-weight: 600;">${temp}°C</p>
        <p style="font-size: 1.2rem; margin-top: 5px;">${weatherDesc}</p>
        <div class="weather-details">
            <div>
                <p><strong>Wind Speed</strong></p>
                <p>${wind} m/s</p>
            </div>
            <div>
                <p><strong>Humidity</strong></p>
                <p>${humidity}%</p>
            </div>
        </div>
    `;
    weatherDiv.classList.remove("error");
    weatherDiv.classList.add("visible");
}

// Function to show error messages
function showError(message) {
    weatherDiv.innerHTML = message;
    weatherDiv.classList.add("error", "visible");
    // Reset background to default on error
    document.body.style.background = 'linear-gradient(to top, #3a7bd5, #3a6073)';
}

// Function to update background based on weather condition ID
// In script.js, replace the existing updateBackground function with this one

function updateBackground(weatherId) {
    let gradient = '';
    // Weather condition codes from OpenWeatherMap
    if (weatherId >= 200 && weatherId < 300) { // Thunderstorm
        gradient = 'linear-gradient(to top, #36454f, #708090)';
    } else if (weatherId >= 300 && weatherId < 600) { // Drizzle/Rain
        gradient = 'linear-gradient(to top, #6a85b6, #bac8e0)';
    } else if (weatherId >= 600 && weatherId < 700) { // Snow
        gradient = 'linear-gradient(to top, #e0eafc, #cfdef3)';
    } else if (weatherId >= 700 && weatherId < 800) { // Atmosphere (mist, fog)
        gradient = 'linear-gradient(to top, #bdc3c7, #e2e8f0)';
    } else if (weatherId === 800) { // Clear
        gradient = 'linear-gradient(to top, #89f7fe, #66a6ff)';
    } else if (weatherId > 800) { // Clouds
        gradient = 'linear-gradient(to top, #a1c4fd, #c2e9fb)';
    }
    document.body.style.background = gradient;
}

// Event listener for Enter key
cityInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});


// --- Indian Clock (no changes needed) ---
function updateClock() {
    const indianTime = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });
    document.getElementById("indianClock").textContent = "Indian Time: " + indianTime;
}
setInterval(updateClock, 1000);
updateClock(); // initial call