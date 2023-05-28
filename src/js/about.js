// jshint esversion: 6
import "./general";

export function initMap() {
	// Coordinates and zoom source = https://www.google.com/maps/place/Higher+Ground+Espresso+Bar+Catering/@44.0855393,-125.6380251,7z/data=!3m1!4b1!4m6!3m5!1s0x54c11d71e6cbffff:0x5cccb5f69af9e9cc!8m2!3d44.115921!4d-122.999097!16s%2Fg%2F11f5hnyn39
	const zoomLevel = 9;
	const coords = [44.114025, 123.6584332];

	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: zoomLevel,
		center: { lat: coords[0], lng: coords[1] }
	});

	const marker = new google.maps.Marker({
		map,
		draggable: true,
		animation: google.maps.Animation.DROP,
		position: { lat: coords[0], lng: coords[1] }
	});

	marker.addListener("click", () => infowindow.open(map, marker));

	const infowindow = new google.maps.InfoWindow({
		content: `
			<h3>Event Details</h3>
			<strong>Where to meet:</strong><br /><p>We'll be meeting at a local coffee shop called, Higher Ground Espresso Bar Catering.</p>
			<strong>What to bring:</strong><br /><p>Bring a computer, money for beverages and snacks, yourself, and any friends you think might be interested, all are welcome!</p>
		`
	});

	infowindow.open(map, marker);
}

window.initMap = initMap;

window.addEventListener("load", () => {
	const $script = document.createElement("script");

	$script.src = `https://maps.googleapis.com/maps/api/js?key=${GMAP_KEY}&callback=initMap`;

	document.querySelector("body").appendChild($script);
});