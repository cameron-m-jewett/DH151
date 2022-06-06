// Global variables
let map;
let lat = 47.60357;
let lon = -122.32945;
let zl = 12;

// path to csv data
let path = "data/SeattleXLClean.csv";

// global variables
let markers = L.featureGroup();

// initialize
$( document ).ready(function() {
    createMap(lat,lon,zl);
    readCSV(path);
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}


// function to read csv data
function readCSV(data){
	Papa.parse(path, {
		header: true,
		download: true,
		complete: function(data) {
			console.log(data);
			
			// map the data
			mapCSV(data);

		}
	});
}


function mapCSV(data){
	
	// circle options
	let circleOptions = {
		radius: 5,
		weight: 1,
		color: 'white',
		fillColor: 'red',
		fillOpacity: 1
	}

	// loop through each entry
	data.data.forEach(function(item,index){
		// create marker
		let marker = L.circleMarker([item.INTPTLAT,item.INTPTLON], circleOptions)
        .on('mouseover',function(){
			this.bindPopup(`${item.CENSUSTRACT} <br> ${item.MEDHOUSEVAL}`).openPopup()
		})

		// add marker to featuregroup		
		markers.addLayer(marker)

        // add entry to sidebar
		$('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${item.CENSUSTRACT}</div>`)
	})

	// add featuregroup to map
	markers.addTo(map)

	// fit markers to map
	map.fitBounds(markers.getBounds())
}

function flyToIndex(index){
	// zoom to level 17 first
	map.setZoom(17);
	// pan to the marker
	map.panTo(markers.getLayers()[index]._latlng);
}

