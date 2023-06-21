export default function setMarker(html, elem, map, marker) {
    const markerHeight = 50;
    const markerRadius = 10;
    const linearOffset = 25;
    const popupOffsets = {
        'top': [0, 10],
        'top-left': [0, 0],
        'top-right': [0, 0],
        'bottom': [0, -10],
        'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
        'left': [markerRadius, (markerHeight - markerRadius) * -1],
        'right': [-markerRadius, (markerHeight - markerRadius) * -1]
    };
    
    // Add markers to the map.
    console.log(marker.longitude + ', ' + marker.latitude);
    new mapboxgl.Marker(elem)
        .setLngLat([marker.longitude, marker.latitude])
        .setPopup(
            new mapboxgl.Popup({ offset: popupOffsets }) // add popups
                .setHTML(html)
            )
        .addTo(map);
}