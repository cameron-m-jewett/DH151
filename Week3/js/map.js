// let's create some data
let data = [
    {
        'id': 0,
        'title':'LAX',
		'lat': 33.9438347,
		'lon': -118.4088622,
        'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Osaka_Castle_02bs3200.jpg/320px-Osaka_Castle_02bs3200.jpg',
        'description': "5/10. Somehow always make it on time for my flight, but it never feels like I will. The traffic at LAX is legendarily bad. Security is always faster than expected though."

    },
    {
        'id': 1,
        'title':'Seatac Airport',
		'lat': 47.443558,
		'lon': -122.3000149,
        'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Pascual_Guerrero_U-20WC_2011_CMR-NZL.JPG/320px-Pascual_Guerrero_U-20WC_2011_CMR-NZL.JPG',
        'description':"7.5/10. Had to give it extra points because it is my home airport. Security lines can take way too long, but I like the vibes of Seatac a lot. And environmentally it is a pretty sustainable airport."
    },
    {
        'id': 2,
        'title':'Changi Airport',
		'lat': 1.3658211,
		'lon': 103.9921111,
        'image': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Bangkok_skytrain_sunset.jpg/320px-Bangkok_skytrain_sunset.jpg',
        'description':"9.5/10. This is maybe the best airport I have been to. Awesome vibes, there are a ton of food options, the lines never take very long. Great airport."
    },
    {
        'id': 3,
        'title':'Charles De Gaulle',
		'lat': 49.0044129,
		'lon': 2.5769430,
        'image':'https://www.stofficetokyo.ch/sites/default/files/styles/featured_image_840x572_/public/2019-01/icu_dronei_34ab_170430-42_r.jpg?itok=mkG94UWD',
        'description':"5/10. I feel very neutral about this airport."
    },
    {
        'id': 4,
        'title':'Will Rogers World Airport',
		'lat': 35.3940895,
		'lon': -97.5959760,
        'image':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/UCLA_Royce_Hall.jpg/320px-UCLA_Royce_Hall.jpg',
        'description':"?/10. I do not know what to rate this one. I have only been here once, and it was for an emergency landing (one of the passengers on my flight needed medical attention). I was not intending to be in Oklahoma, so that was a downside. Upside is we were able to safely make the landing, so shoutout to Will Rogers Intl."
    },
    {
        'id': 5,
        'title':'Narita Intl. Airport',
		'lat': 35.7737902,
		'lon': 140.3916496,
        'image':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/UCLA_Royce_Hall.jpg/320px-UCLA_Royce_Hall.jpg',
        'description':"8.5/10. I have had lots of layovers here, and it is quite a lovely airport. Lots of food options, great signage. No criticisms here. My brother has lost about 4 jackets in the Narita airport so their lost and found knows him well."
    },
    {
        'id': 6,
        'title':'Keflavik Intl. Airport',
		'lat': 63.9943560,
		'lon': -22.6227771,
        'image':'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/UCLA_Royce_Hall.jpg/320px-UCLA_Royce_Hall.jpg',
        'description':"4/10. Not the biggest fan of this airport. The food is super pricey. I also almost lost my back brace here one time, and though that was entirely my fault, I hold all the ranking power here and will use it with reckless abandon."
    },
]

let map = L.map('map').setView([0,0], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// before looping the data, create an empty FeatureGroup
let myMarkers = L.featureGroup();

 // function to fly to a location by a given id number
 function flyToIndex(index){
	map.flyTo([data[index].lat,data[index].lon],12)
    // open the popup
    myMarkers.getLayers()[index].openPopup()
}

// loop through data
data.forEach(function(item){
	// create marker
	let marker = L.marker([item.lat,item.lon]).bindPopup("<b>" + item.title + "</b>" + "<br>" + item.description + "</br>")
	// add marker to featuregroup
	myMarkers.addLayer(marker)

	// add data to sidebar with onclick event
	$('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${item.id})">${item.title}</div>`)

})

// after loop, add the FeatureGroup to map
myMarkers.addTo(map)

// define layers
let layers = {
	"My Markers": myMarkers
}

// add layer control box
L.control.layers(null,layers).addTo(map)

// make the map zoom to the extent of markers
map.fitBounds(myMarkers.getBounds());


