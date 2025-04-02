const api = {
    key: "e0f3a089e4993c4bab031bb60e48b848",
    base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode === 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(response => response.json())
        .then(displayResults)
        .catch(() => alert("City not found!"));
}

function displayResults(weather) {
    if (!weather || weather.cod !== 200) {
        alert("Invalid city! Please try again.");
        return;
    }

    document.querySelector('.location .city').innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    document.querySelector('.location .date').innerText = dateBuilder(now);

    document.querySelector('.current .temp').innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    document.querySelector('.current .weather').innerText = weather.weather[0].main;
    document.querySelector('.current .hi-low').innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
