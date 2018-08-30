import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import '../App.css';

mapboxgl.accessToken ='pk.eyJ1IjoiYXNobGVpZ2hjMjA3IiwiYSI6ImNqa3dod254cjByOGUzcHBkbmpmendyN2EifQ.RzeAqtiFyTg92mZO5Y2XoA';

var map;


class Map extends Component {
    
    componentDidMount() {
      
    const { data, markers, updateMarkers, createMarker, initializeMap } = this.props;

    initializeMap() 
    
    data.venues.forEach(function(marker) {
        
    var mark = document.createElement('div');
    mark.className = 'marker';
    
    createMarker(marker.location.lng, marker.location.lat)
    });

    }
    render() {
    return <div ref={el => this.mapContainer = el} />;
  }
}

export default Map;