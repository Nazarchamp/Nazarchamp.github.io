const username = "movielover@gmail.com";
const password = "password";

const locationInput = document.getElementById("location-search-input");
const searchButton = document.getElementById("search");

if (!localStorage.getItem("isLoggingIn") && !localStorage.getItem("remember")) {
    window.location.href = "login.html";
}

if (localStorage.getItem("password") !== password && localStorage.getItem("username") !== username && !localStorage.getItem("isLoggingIn")) {
    window.location.href = "login.html";
}

localStorage.removeItem("isLoggingIn");

locationInput.disabled = true;

fetch("https://api.ipify.org", {method: "GET"})
    .then(res => res.body.getReader().read())
    .then(data => fetch(`http://www.geoplugin.net/json.gp?ip=${new TextDecoder("utf-8").decode(data.value)}`))
    .then(res => res.json())
    .then(data => {
        locationInput.value = `${data.geoplugin_city}, ${data.geoplugin_region}, ${data.geoplugin_countryName}`;
        locationInput.disabled = false;
        getISO(data.geoplugin_countryName).then(country => {
            setMovies(country);
        });
        document.querySelectorAll(".outputH").forEach(el => {
            el.style.display = "block";
        });
    });

function setMovies(country) {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbToken}&region=${country}&page=1`)
        .then(res => res.json())
        .then(data => {
            const movies = data.results;
            const movieList = document.getElementById("now-playing");
            movieList.innerHTML = "";
            if(!movies.length){
                setMovies("CA");
                return;
            }
            movies.forEach(movie => {
                const movieElement = document.createElement("div");
                movieElement.classList.add("movie");
                if (!movie.poster_path)
                    return;
                movieElement.innerHTML = `
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                    <p class="description">${movie.title}</p>
            `;
                movieList.appendChild(movieElement);
            });
        });

    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbToken}&region=${country}&page=1`)
        .then(res => res.json())
        .then(data => {
            const movies = data.results;
            const movieList = document.getElementById("coming-soon");
            movieList.innerHTML = "";
            movies.forEach(movie => {
                const movieElement = document.createElement("div");
                movieElement.classList.add("movie");
                if (!movie.poster_path)
                    return;
                movieElement.innerHTML = `
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                    <p class="description">${movie.title}</p>
            `;
                movieList.appendChild(movieElement);
            });
        });
}

async function getISO(countryName){
    const res = await fetch(`https://api.themoviedb.org/3/configuration/countries?api_key=b1b6cfc3f5f95a81ee6ca812b838fd3b`);
    const data = await res.json();
    for (let i = 0; i < data.length; i++) {
        if (data[i].native_name === countryName) {
            return data[i].iso_3166_1;
        }
    }
    return "CA";
}

searchButton.addEventListener('click', () => {
    const locationArr = locationInput.value.split(",");
    getISO(locationArr[locationArr.length-1].trim()).then(country => {
        setMovies(country);
    });
});
