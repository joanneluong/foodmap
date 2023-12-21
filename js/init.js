let breakfast = L.featureGroup();
let drink = L.featureGroup();
let dessert = L.featureGroup();
let bakery = L.featureGroup();
let meal = L.featureGroup();

let layers = {
    "breakfast": breakfast,
    "drink": drink,
    "dessert": dessert,
    "bakery": bakery,
    "meal": meal
}


// declare variables
let mapOptions = {'center': [37.0709,-100],'zoom':4}

// use the variables
const map = L.map('the_map', {layers: [meal, breakfast, drink, dessert, bakery]}).setView(mapOptions.center, mapOptions.zoom);


let CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

CartoDB_Positron.addTo(map)


// add layer control box
L.control.layers(null,layers,{collapsed:false, position: 'bottomleft'}).addTo(map)

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

// create a function to add markers
function addMarker(data){
    if(data["category"] == "breakfast"){
        circleOptions.fillColor = "blue"
        breakfast.addLayer(L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(`<h2>${data["place name"]}</h2> 
        <h3>${data['address']} 
        <br> ${data['dishes ordered']}
        <br> $${data['price']}
        <br> ${data['rate']}/5
        <br> ${data['overall review in words']}
        </h3>`))
    }
    else if(data["category"] == "meal"){
        circleOptions.fillColor = "green"
        meal.addLayer(L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(`<h2>${data["place name"]}</h2> 
        <h3>${data['address']} 
        <br> ${data['dishes ordered']}
        <br> $${data['price']}
        <br> ${data['rate']}/5
        <br> ${data['overall review in words']}
        </h3>`))
    }
    else if(data["category"] == "drink"){
        circleOptions.fillColor = "yellow"
        drink.addLayer(L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(`<h2>${data["place name"]}</h2> 
        <h3>${data['address']} 
        <br> ${data['dishes ordered']}
        <br> $${data['price']}
        <br> ${data['rate']}/5
        <br> ${data['overall review in words']}
        </h3>`))
    }
    else if(data["category"] == "dessert"){
        circleOptions.fillColor = "red"
        dessert.addLayer(L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(`<h2>${data["place name"]}</h2> 
        <h3>${data['address']} 
        <br> ${data['dishes ordered']}
        <br> $${data['price']}
        <br> ${data['rate']}/5
        <br> ${data['overall review in words']}
        </h3>`))
    }
    else{
        circleOptions.fillColor = "purple"
        drink.addLayer(L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(`<h2>${data["place name"]}</h2> 
        <h3>${data['address']} 
        <br> ${data['dishes ordered']}
        <br> $${data['price']}
        <br> ${data['rate']}/5
        <br> ${data['overall review in words']}
        </h3>`))
    }

    // createButtons(data.lat,data.lng,data["place name"], data['address'])
}

function createButtons(lat,lng,name, loc){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title +" - " + loc; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        const zoom = 13;
        map.flyTo([lat,lng],zoom); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

const dataURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTh9rD7gjHeIAr7dEFVku9qsY75BlqEZKrxd3ePoNBeCJz88GdAVt5FVaqUc-EYIXDNhB7_Pb-wID_w/pub?output=csv"

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    results.data.forEach(data => {
        addMarker(data)
        //console.log(data)
    })
    // meal.addTo(map)
    // noConcert.addTo(map)
    // let allLayers = L.featureGroup([meal,noConcert]);
    map.fitBounds(allLayers.getBounds());
}


loadData(dataURL)