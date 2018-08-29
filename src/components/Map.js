import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import '../App.css';

mapboxgl.accessToken ='pk.eyJ1IjoiYXNobGVpZ2hjMjA3IiwiYSI6ImNqa3dod254cjByOGUzcHBkbmpmendyN2EifQ.RzeAqtiFyTg92mZO5Y2XoA';

var point, map;


class Map extends Component {
    
    componentDidMount() {
        
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9', 
        center: [-76.61, 39.29], 
        zoom: 11 
    });
    
     const { data, markers } = this.props;
    
    data.venues.forEach(function(marker) {
        
    // create a HTML element for each feature
      var mark = document.createElement('div');
      mark.className = 'marker';
    
      // make a marker for each feature and add to the map
     point = new mapboxgl.Marker(mark)
      .setLngLat([marker.location.lng, marker.location.lat])
      .addTo(map);
    });
    return point;
    }
    
    
    render() {
    return <div ref={el => this.mapContainer = el} />;
  }
}

export default Map;