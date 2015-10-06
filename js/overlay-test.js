// cac bien toan cuc
// lbmui
//temp layer control
var tempLayer;

// dang ki khi load

$(document).ready(function(e) {
	// dang ki submit cho button add marker
	$('#add_marker_form').submit(function(e) {
		// no page reload
		e.preventDefault();
		addMarker();
	});
	// dang ki submit cho button add layer
	$('#add_layer_form').submit(function(e) {
		// no page reload
		e.preventDefault();
		// addLayer();
		// temperatureLayer();
		addTempLayer();
	});

	// dang ki khac ...

});

function addMarker() {
	var center = map.getCenter();
	var marker = L.marker(center);

	var myIcon = L.icon({
		iconUrl : './img/marker-to.png'
	});

	marker.setIcon(myIcon);
	marker.addTo(map);
}

function addLayer() {
	// control that shows state info on hover
	var info = L.control({
		position : 'topleft'
	});

	info.onAdd = function(map) {
		this._div = L.DomUtil.create('div', 'info'); // create a div with a
		// class "info"
		this.update(true);
		return this._div;
	};

	// method that we will use to update the control based on feature properties
	// passed
	info.update = function(props) {
		this._div.innerHTML = '<h4>Population Change</h4>'
				+ (props ? '<b>Town: '
						+ props.NAME10
						+ '</b><br />Percent change, 1970-2010<br />(2001-2011 in Qu&eacute;bec): <em><strong> '
						+ props.CHNG_70_10
						+ '</strong></em>%<br /><br />1970 Population: '
						+ props.POP1970 + '<br />1980 Population: '
						+ props.POP1980 + '<br />1990 Population: '
						+ props.POP1990 + '<br />2000 Population: '
						+ props.POP2000 + '<br />2010 Population: '
						+ props.POP2010
						: '<b>Hover over a town</b>');
	};

	info.addTo(map);

}

function addTempLayer() {
	// them temp Layer control
	tempLayer = L.control({
		position : 'topleft'
	});
	// khai bao phuong thuc thuc hien khi add control vao map
	// control.addTo(map)
	tempLayer.onAdd = function(map) {
		this._div = L.DomUtil.create('div', 'temp_info');
		// this.update(true);
		temperatureInfo();
		return this._div;
	}
	// khai bao phuong thuc thuc hien khi update control
	// control.update();
	tempLayer.update = function(data) {
		if (data.name && data.main.temp) {
			var c = data.main.temp - 273.16;
			this._div.innerHTML = '<h4>' + data.name + ','
					+ getCountryName(data.sys.country) + ': '
					+ c.toFixed(1).toString() + '°C</h4>'; // main.temp +
		}
	}
	// them tempLayer vao map
	tempLayer.addTo(map);
}

function temperatureLayer() {
	var osmAttr = '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors';
	var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			{
				attribution : osmAttr
			});
	var clouds = L.OWM.clouds({
		showLegend : false,
		opacity : 0.5
	});
	var city = L.OWM.current({
		intervall : 15,
		lang : 'de'
	});

	// var map = L.map('map', { center: new L.LatLng(51.5, 10), zoom: 10,
	// layers: [osm] });
	var baseMaps = {
		"OSM Standard" : osm
	};
	var overlayMaps = {
		"Clouds" : clouds,
		"Cities" : city
	};
	var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
}

/*
 * json frome api.epenwearthermap.org {"coord":{"lon":139,"lat":35},
 * "sys":{"country":"JP","sunrise":1369769524,"sunset":1369821049},
 * "weather":[{"id":804,"main":"clouds","description":"overcast
 * clouds","icon":"04n"}],
 * "main":{"temp":289.5,"humidity":89,"pressure":1013,"temp_min":287.04,"temp_max":292.04},
 * "wind":{"speed":7.31,"deg":187.002}, "rain":{"3h":0}, "clouds":{"all":92},
 * "dt":1369824698, "id":1851632, "name":"Shuzenji", "cod":200}
 */
function temperatureInfo() {
	var result;
	var latLng = map.getCenter();
	// alert(latLng);
	var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='
			+ latLng.lat + '&lon=' + latLng.lng;
	$.ajax({
		type : "GET",
		url : apiUrl,
		dataType : "json",
		success : function(data) {
			setTempValueDiv(data);
		}
	});
}

function setTempValueDiv(data){
	if (data.name && data.main.temp) {
		var c = data.main.temp - 273.16;
		document.getElementById("temp_value").innerHTML='<h4>' + data.name + ','
			+ getCountryName(data.sys.country) + ': '
			+ c.toFixed(1).toString() + '°C</h4>';
	}
}
