const apiKey = "85d9ab218966137887b856ef5ddcaa8d"; 
document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});


async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found!");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weatherResult").innerHTML = `<p>❌ ${error.message}</p>`;
    }
}


function displayWeather(data) {
    document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById("weatherDesc").textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}


document.addEventListener("DOMContentLoaded", () => {
    getWeather("Singapore");
});
