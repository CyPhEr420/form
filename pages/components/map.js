import mapboxgl from "!mapbox-gl";
import { useEffect, useState } from "react";



mapboxgl.accessToken = '<apikey>';

const Map = ({ countrycorrds }) => {

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
            center: [77.3525, 12.99153],
            zoom: 3
        });
        if (countrycorrds[0] && countrycorrds[1]) {
            zoomOn(map, countrycorrds);
        }

    }, [countrycorrds]);

    const zoomOn = (map, countrycorrds) => {
        const bounds = new mapboxgl.LngLatBounds();
        bounds.extend([countrycorrds[0], countrycorrds[1]]);
        map.fitBounds(bounds, { padding: 100 });

    }
    return <div id="map"></div>
}

export default Map

