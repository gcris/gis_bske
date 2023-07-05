import stations from "../data/stations.json" assert {type: 'json'};

export default function getStations() {
    const parentElem = $('.dropDownStation ul');
    let html = new String("");
    html = `<li><a class="dropdown-item dropdown-header" href="#" value="all">All Stations/Units</a></li>` +
        `<li><hr class="dropdown-divider"></li>`;

    for (const station of stations) {
        const stationunit = station.stationunit.toLocaleLowerCase().replace(" ", "_");

        html += `<li><a class="dropdown-item" href="#" value="${stationunit}">${station.stationunit}</a></li>`;
    }

    parentElem.html(html);
}