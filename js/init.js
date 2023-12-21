// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':9}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

let CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

CartoDB_Positron.addTo(map)



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

// add layer control box
L.control.layers(null,layers).addTo(map)

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
        breakfast.addLayer(L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(`<h2>${data["What was your favorite artist you've seen live?"]}</h2> 
        <h3>${data['What venue did you see them at?']}</h3>${data['Please put the Spotify embed URL of your favorite song of theirs!']}`))
        createButtons(data.lat,data.lng,data["place name"], data['address'])
    }
    else if(ata["category"] == "meal"){
        circleOptions.fillColor = "green"
        meal.addLayer(L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(`<h2>${data["place name"]}</h2> 
        <h3>${data['address']} 
        <br> ${data['dishes ordered']}
        <br> $${data['price']}
        <br> $${data['rate']}/5
        <br> $${data['overall review in words']}/5
        </h3>`))
        createButtons(data.lat,data.lng,data["place name"], data['address'])
    }
    else{
        circleOptions.fillColor = "red"
        noConcert.addLayer(L.circleMarker([0,0],circleOptions).bindPopup('<h2> Have never been to a live conert </h2>'))
        createButtons(0,0, "Have never been to a live concert", "")
    }
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
    concert.addTo(map)
    noConcert.addTo(map)
    let allLayers = L.featureGroup([concert,noConcert]);
    map.fitBounds(allLayers.getBounds());
}


loadData(dataURL)