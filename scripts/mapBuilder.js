/* import data from './dataStorage.js' */
import {getTest} from './dataApi.js'
getTest().then( result => {console.log('getTest', result ); } );

mapboxgl.accessToken = 'pk.eyJ1IjoidmVyeW4xY2UiLCJhIjoiY2pqaGdtdXRmM2h2cDN2bW1mMXFjcDR5ZCJ9.8yOftdKhiv5q1EFPhBP_Mw';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
    center: [39.729996, 43.588348], // starting position [lng, lat]
    zoom: 15, // starting zoom
    pitch: 40

});


map.on('load', function() {
    // Insert the layer beneath any symbol layer.
    var layers = map.getStyle().layers;

    console.log(layers);
     
    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
    labelLayerId = layers[i].id;
    break;
    }
    }
     
    map.addLayer({
    'id': '3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
    'fill-extrusion-color': '#aaa',
     
    // use an 'interpolate' expression to add a smooth transition effect to the
    // buildings as the user zooms in
    'fill-extrusion-height': ["get", "height"]
    ,
    'fill-extrusion-base':  ["get", "min_height"],
    'fill-extrusion-opacity': .6
    }
    }, labelLayerId);
    });
    


    /* map.addLayer({

    }); */
    

export default map;