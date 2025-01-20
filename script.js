const apiKey = "8d94849da962424f8b870209252001"; // Replace with your WeatherAPI key
const apiUrl = "https://api.weatherapi.com/v1/current.json";

document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value;

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    fetch(`${apiUrl}?key=${apiKey}&q=${city}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found.");
            }
            return response.json();
        })
        .then(data => {
            const weatherDetails = `
                <p><strong>City:</strong> ${data.location.name}, ${data.location.country}</p>
                <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
                <p><strong>Weather:</strong> ${data.current.condition.text}</p>
                <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
                <p><img src="${data.current.condition.icon}" alt="Weather icon" /></p>
            `;
            document.getElementById("weather-details").innerHTML = weatherDetails;
        })
        .catch(error => {
            document.getElementById("weather-details").innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
});
