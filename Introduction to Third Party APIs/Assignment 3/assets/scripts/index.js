const modalOpen = document.getElementById("try-btn");

const modal = document.getElementById("map-modal");

const mapElement = document.getElementById("map");

const loadingAnimation = document.getElementById("loading-animation");

const userIconElement = document.getElementById("user-icon");

mapboxgl.accessToken = '';

mapElement.style.display = "none";
let map = {};

let firstMapLoad = true;

modalOpen.addEventListener("click", () => {

    modal.showModal();
    if (firstMapLoad) {
        userIconElement.style.display = "none";
    }
    navigator.geolocation.watchPosition(moveMap, geoError);
});

const delay = ms => new Promise(res => setTimeout(res, ms));

const moveMap = async (pos) => {
    if (firstMapLoad) {
        mapElement.style.display = "block";
        userIconElement.style.display = "none";
        loadingAnimation.style.display = "none";

        map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // style URL
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 15, // starting zoom
            interactive: false
        });
        firstMapLoad = false;
    }
    const userLocation = [pos.coords.longitude, pos.coords.latitude];
    map.flyTo({
        center: userLocation,
        zoom: 15
    });

    await delay(5000);
    userIconElement.style.display = "block";
}

const geoError = (err) => {
    loadingAnimation.style.display = "block";
    Array.from(document.querySelectorAll(".lds-ring div")).forEach(div => {
        div.style.animationPlayState = 'paused';
    });
    userIconElement.style.display = "none";
    mapElement.style.display = "none";
}