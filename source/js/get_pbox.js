import pbox from "../data/pbox.json" assert {type: 'json'};
import setMarker from "./set_marker.js";

export default function getPbox(map) {
    for (const marker of pbox) {
        // Create a DOM element for each marker.
        const elem = document.createElement('div');
        elem.className = 'marker pbox';
        const stationunit = marker.stationunit.toLocaleLowerCase().replace(/ /g, "_");
        elem.style.backgroundImage = `url(source/images/${stationunit}.png)`;

        const html = `<div class="container">` + 
            `<div class="row">` +
            `<div class="col-3"><img src="source/images/${stationunit}.png" width="45px"/></div>` +
            `<div class="col-9"><p class="fs-3 text-nowrap marker_container_header">${marker.stationunit}</p></div>` +
            `</div>` +
            `</div>` +
            `<div class="container">` + 
                `<div class="row">` +
                `<div class="col"><hr style="margin-top: 2px"/><p class="mb-0">${marker.address}</p></div>` +
                `</div>` +
            `</div>`;

        setMarker(html, elem, map, marker);
    }
}