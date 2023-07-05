import setCookie from "./set_cookie.js";
import getCookie from "./get_cookie.js";
import getPbox from "./get_pbox.js";
import getPrecincts from "./get_voting_precincts.js";
import getTourists from "./get_tourist.js";
import getPacs from "./get_pacs.js";
import getStrategicCP from "./get_strategic_cp.js";
import getStrategicOP from "./get_strategic_op.js";
import getStrategicMB from "./get_strategic_mb.js";
import getStrategicMC from "./get_strategic_mc.js";
import getBorders from "./get_borders.js";

// Retrieve map style from saved cookies
const current_map_style = getCookie("current-map-style");
changeButtonColor(current_map_style);

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
  placeholder: "Search in Ilocos Norte",
  bbox: [ 120.3028012, 17.703739, 120.979263, 18.729502 ],
  mapboxgl: map
});

map.addControl(geocoder);

// add current location of the user 
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
  },
    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,
    // Draw an arrow next to the location dot to indicate which direction the device is heading.
    showUserHeading: true
  })
);

// Markers Handlers
$("form#form_map_style").on("change", "input[name='map_styles']", function() {
  const map_style = $(this).val();
  map.setStyle(`mapbox://styles/mapbox/${map_style}`);

  // Save settings to cookies
  setCookie("current-map-style", map_style, 30);

  changeButtonColor(map_style);
});

// Map style Handlers
$("form#form_marker_controls").on("change", "input[name='marker_controls']", function() {
  const marker_control = $(this).val();
  const is_check = $(this).is(":checked");

  if (marker_control == 'pbox')
    is_check ? ($('.pbox').length < 1 ? getPbox(map) : $('.pbox').show()) : $('.pbox').hide();
  else if (marker_control == 'voting_precincts')
    is_check ? ($('.precincts').length < 1 ? getPrecincts(map) : $('.precincts').show()) : $('.precincts').hide();
  else if (marker_control == 'tourists')
    is_check ? ($('.tourists').length < 1 ? getTourists(map) : $('.tourists').show()) : $('.tourists').hide();
  else if (marker_control == 'pacs')
    is_check ? ($('.pacs').length < 1 ? getPacs(map) : $('.pacs').show()) : $('.pacs').hide();
  else if (marker_control == 'strategic_cps')
    is_check ? ($('.strategic_cps').length < 1 ? getStrategicCP(map) : $('.strategic_cps').show()) : $('.strategic_cps').hide();
  else if (marker_control == 'strategic_ops')
    is_check ? ($('.strategic_ops').length < 1 ? getStrategicOP(map) : $('.strategic_ops').show()) : $('.strategic_ops').hide();
  else if (marker_control == 'strategic_mbs')
    is_check ? ($('.strategic_mbs').length < 1 ? getStrategicMB(map) : $('.strategic_mbs').show()) : $('.strategic_mbs').hide();
  else if (marker_control == 'strategic_mcs')
    is_check ? ($('.strategic_mcs').length < 1 ? getStrategicMC(map) : $('.strategic_mcs').show()) : $('.strategic_mcs').hide();
  else if (marker_control == 'borders')
    is_check ? ($('.borders').length < 1 ? getBorders(map) : $('.borders').show()) : $('.borders').hide();
});

function changeButtonColor(map_style) {
  const is_dark = map_style.includes("satellite") || map_style.includes("dark");

  $(".floating-container button").removeClass(is_dark ? "btn-dark" : "btn-light");
  $(".floating-container button").addClass(is_dark ? "btn-light" : "btn-dark");
}