let weather = {
    "apiKey": "15c27482b749486577a4b8e7beb535c2",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
        .then((response) => {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const{name} = data;
        const {icon, main, description} = data.weather[0];
        const {temp, pressure, humidity, feels_like} = data.main;
        const {speed} = data.wind;
        const {visibility} = data;
        const {country} = data.sys;
        document.querySelector(".city").innerText = "Weather in " + name + ", " + country ;
        document.querySelector(".icon").src="https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".feels-like").innerText = "Feels Like : " + feels_like + " °C";
        document.querySelector(".humidity").innerText = "Humidity : " + humidity + " %";
        document.querySelector(".pressure").innerText = "Pressure : " + pressure + " mb";
        document.querySelector(".visibility").innerText = "Visibility : " + visibility/1000 + " km";
        document.querySelector(".wind").innerText = "Wind Speed : " + speed + " km/hr";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + main + "')"
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Visakhapatnam");