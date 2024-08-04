let date = document.querySelector(".date");
        let searchbtn = document.querySelector("#searchbtn");
        let searchbar = document.querySelector("#searchbar");
        let weather = document.querySelector(".weather");
        let notfound = document.querySelector(".notfound");
        let wrapper = document.querySelector("#wrapper");

        function getWeatherImage(condition) {
            condition = condition.toLowerCase();
            if (condition.includes("cloud")) {
                return { weatherImage: "cloud.png", backgroundImage: "cloudbg.webp" };
            } else if (condition.includes("clear")) {
                return { weatherImage: "clear.png", backgroundImage: "clr.webp" };
            } else if (condition.includes("sunny")) {
                return { weatherImage: "clear.png", backgroundImage: "clearbg.webp" };    
            } else if (condition.includes("snow")) {
                return { weatherImage: "snow.png", backgroundImage: "snowbg.webp" };
            } else if (condition.includes("rain")) {
                return { weatherImage: "rain.png", backgroundImage: "rainbg.webp" };
            } else if (condition.includes("mist")) {
                return { weatherImage: "mist.png", backgroundImage: "defoultbg.webp" };
            } else {
                return { weatherImage: "default.png", backgroundImage: "defoultbg.webp" }; // Fallback image if condition doesn't match any predefined ones
            }
        }

        searchbtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent form submission
            const APIkey = "07e4da4d517346b9acb92437242607";
            let city = searchbar.value.trim();
    
            if(city === '') {
                return;
            }
    
            fetch(`http://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${city}&aqi=no`)
                .then(response => response.json())
                .then(json => {
                    if (json.error) {
                        weather.classList.add('hidden');
                        notfound.classList.remove('hidden');
                    } else {
                        const image = document.querySelector("#image");
                        const temp = document.querySelector(".actualtemp");
                        const humidity = document.querySelector(".actualhumidity");
                        const wind = document.querySelector(".actualwind");
                        const description = document.querySelector(".weatherof");
                        const cityName = document.querySelector(".city");

                        cityName.innerHTML = json.location.name;
                        temp.innerHTML = json.current.temp_c;
                        humidity.innerHTML = json.current.humidity;
                        wind.innerHTML = json.current.wind_kph;
                        description.innerHTML = json.current.condition.text;

                        const weatherData = getWeatherImage(json.current.condition.text);
                        image.src = weatherData.weatherImage;
                        wrapper.style.backgroundImage = `url(${weatherData.backgroundImage})`;

                        weather.classList.remove('hidden');
                        notfound.classList.add('hidden');
                    }
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    weather.classList.add('hidden');
                    notfound.classList.remove('hidden');
                });
        });

        function getFormattedDate() {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const year = today.getFullYear();
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const month = monthNames[today.getMonth()]; // Get the month name
        
            return `${month} ${day} ${year}`;
        }
        date.innerHTML = getFormattedDate();