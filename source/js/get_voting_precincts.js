import precints from "../data/precints.json" assert {type: 'json'};
import setMarker from "./set_marker.js";

export default function getPrecincts(map) {
    for (const marker of precints) {
        // Create a DOM element for each marker.
        const elem = document.createElement('div');
        elem.className = 'marker precincts';
        const stationunit = marker.stationunit.toLocaleLowerCase().replace(" ", "_");
        elem.style.backgroundImage = `url(source/images/ballot.png)`;

        const html = `<div class="container marker_content">` + 
            `<div class="row">` +
                `<div class="col-3"><img src="source/images/${stationunit}.png" width="45px"/></div>` +
                `<div class="col-9"><p class="fs-3 text-nowrap marker_container_header">${marker.stationunit}</p></div>` +
            `</div>` +
            `<div class="container text-start">` + 
                `<hr style="margin-top: 2px"/>` +
                `<div class="row">` +
                    `<dt class="col-4">Location: </dt>` + 
                    `<dl class="col-8">${marker.location}</dl>` + 
                `</div>` +
                `<div class="row">` +
                    `<dt class="col-4">PNP Personnel: </dt>` + 
                    `<dl class="col-8">${marker.personnel}</dl>` + 
                `</div>` +
                `<div class="row">` +
                    `<dt class="col-4">Contact No: </dt>` + 
                    `<dl class="col-8">${marker.contactno}</dl>` + 
                `</div>` +
                `<div class="row">` +
                    `<dt class="col-4">COMELEC Officer: </dt>` + 
                    `<dl class="col-8">${marker.comelecofficer}</dl>` + 
                `</div>` +
                `<div class="row">` +
                    `<dt class="col-4">Contact No: </dt>` + 
                    `<dl class="col-8">${marker.comeleccontactno}</dl>` + 
                `</div>` +
            `</div>`;

        setMarker(html, elem, map, marker);
    }
}