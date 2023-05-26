//Element to update 
let current_ip = document.getElementById("current_ip");
let current_town = document.getElementById('current_town');
let current_timezone = document.getElementById('current_timezone');
let current_isp = document.getElementById('current_isp');

//form elements
let entered_ip = document.getElementById('ip_address');
let search_btn = document.getElementById('search_btn');

//Check if geoLocation is online
function geoLocation(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is off');
    }
}

showPosition = (position) => {
    const userLocation = [
        position.coords.latitude,
        position.coords.longitude
    ];
    console.log(userLocation);
}

geoLocation();

const headers_option = {
    header: {
        'Access-Control-Allow-Origin': "*",
    }
};

const map = L.map('map', {
    'layers': [
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
    ]
});

const baseMaps = {
    "Street view": L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
    "Satelite view": L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnVuZWUiLCJhIjoiY2twMmMwaHp6MHlnZzJ1bnY3ajkyb2ZxdiJ9.MFhCgoXigWv6Kk_lUVLvIg")
};

L.control.layers(baseMaps, null, {position: 'bottomright'}).addTo(map);

var mapIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [36, 45],
});

updateMarker = (update_marker) => {
    map.setView(update_marker, 13);
    L.marker(update_marker, {icon: mapIcon}).addTo(map);
}

flyToPlace = (c, p) => {
    map.flyTo(c, 14, { duration: 1});
    setTimeout(() => {
        L.popup()
        .setLatLng(c)
        .setContent(p)
        .openOn(map)
    }, 3000);
}

getDetails = () => {

    let getData = sessionStorage.getItem('test');
    let displayData = entered_ip.value = getData;

    if(displayData != undefined){
        var ip_url = `https://ipinfo.io/${displayData}/json?token=c8eec88786f8d1`;

    } else {
        var ip_url = 'https://ipinfo.io/json?token=c8eec88786f8d1';

    }

    fetch(ip_url, headers_option)
    .then((respones) => respones.json())
    .then((data) => {
        current_ip.innerHTML = data.ip;
        current_town.innerHTML = data.city + " " + data.region,
        current_timezone.innerHTML = data.timezone;
        current_isp.innerHTML = data.org;

        var lat = data.loc.split(",")[0];
        var lng = data.loc.split(",")[1];

        const dataLocation = [lat, lng];

        updateMarker(dataLocation);
        flyToPlace(dataLocation, data.org);
    })
    .catch((error) => console.log("Error " + error));
}

getDetails();

search_btn.addEventListener('click', (e) => {
    e.preventDefault();

    let input = entered_ip.value.trim();
    let pattern  = /[A-z]/gi;
    let result = input.match(pattern);

    if(input != "" && input != null && !result) {
        sessionStorage.setItem('test', input);
        getDetails();
    } else {
        alert('Please input valid ip address');
    }
});


