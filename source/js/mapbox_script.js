import setCookie from "./set_cookie.js";
import getCookie from "./get_cookie.js";
import getPbox from "./get_pbox.js";
import getPrecincts from "./get_voting_precincts.js";

// Retrieve map style from saved cookies
const current_map_style = getCookie("current-map-style");
console.log(current_map_style);
$(`#${current_map_style}`).prop('checked',true);

const accessToken = 'pk.eyJ1IjoiaW5wcG9tb2JpbGVhcHAiLCJhIjoiY2xpbnd2b2FoMDM4cjNycW9lNDEzaGFlMiJ9.uO-y-8mD4_ROSQdCTiOKBw';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: `mapbox://styles/mapbox/${current_map_style}`, // style URL
  center: [120.6035826868946, 18.19777768180883], // starting position [lng, lat] 
  zoom: 9, // starting zoom
  accessToken: accessToken,
});

// Geocoder for searching
const geocoder = new MapboxGeocoder({
  accessToken: accessToken, // Set the access token
  placeholder: "Ilocos Norte",
  bbox: [ 120.3028012, 17.703739, 120.979263, 18.729502 ],
  mapboxgl: map
});

map.addControl(geocoder);

// Markers Handlers
$("form#form_map_style").on("change", "input[name='map_styles']", function() {
  const map_style = $(this).val();
  map.setStyle(`mapbox://styles/mapbox/${map_style}`);

  // Save settings to cookies
  setCookie("current-map-style", map_style, 30);
  console.log('asdasd');
});

// Map style Handlers
$("form#form_marker_controls").on("change", "input[name='marker_controls']", function() {
  const marker_control = $(this).val();
  const is_check = $(this).is(":checked");

  if (marker_control == 'pbox')
    is_check ? ($('.pbox').length < 1 ? getPbox(map) : $('.pbox').show()) : $('.pbox').hide();
  else if (marker_control == 'voting_precincts')
    is_check ? ($('.precincts').length < 1 ? getPrecincts(map) : $('.precincts').show()) : $('.precincts').hide();
});