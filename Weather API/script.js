const apiKey = "67edd94d4be4e47adb543c96a175b316";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

const temperature = document.getElementById("temperature");
const cityName = document.getElementById("cityName");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const weatherCard = document.querySelector(".weather-card");
const body = document.body;

const themeClasses = [
    "clear",
    "clouds",
    "rain",
    "snow",
    "thunderstorm",
    "drizzle",
    "mist",
    "haze",
    "fog",
    "default"
];

function applyTheme(condition) {
    const theme = getThemeClass(condition);

    body.classList.remove(...themeClasses.map(t => `${t}-theme`));
    weatherCard.classList.remove(...themeClasses.map(t => `${t}-card`));

    body.classList.add(`${theme}-theme`);
    weatherCard.classList.add(`${theme}-card`);
}

function getThemeClass(condition) {
    if (!condition) return "default";

    const normalized = condition.toLowerCase();

    if (normalized.includes("clear")) return "clear";
    if (normalized.includes("cloud")) return "clouds";
    if (normalized.includes("rain")) return "rain";
    if (normalized.includes("drizzle")) return "drizzle";
    if (normalized.includes("snow")) return "snow";
    if (normalized.includes("thunder")) return "thunderstorm";
    if (normalized.includes("mist") || normalized.includes("haze") || normalized.includes("fog")) return "mist";

    return "default";
}

async function getWeather(city) {

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.innerHTML = `${data.name}, ${data.sys.country}`;
        temperature.innerHTML = `${Math.round(data.main.temp)}°C`;
        description.innerHTML = data.weather[0].description;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${data.wind.speed} km/h`;

        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        applyTheme(data.weather[0].main);

    } catch (error) {

        cityName.innerHTML = "City Not Found";
        temperature.innerHTML = "--°C";
        description.innerHTML = "";
        humidity.innerHTML = "--";
        wind.innerHTML = "--";
        weatherIcon.src = "";

        alert("City not found. Please enter a valid city name.");

    }

}

searchBtn.addEventListener("click", () => {
    getWeather(cityInput.value.trim());
});

cityInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        getWeather(cityInput.value.trim());
    }
});

// Default City
getWeather("Delhi");