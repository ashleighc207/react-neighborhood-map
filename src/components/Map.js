import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import '../App.css';

mapboxgl.accessToken ='pk.eyJ1IjoiYXNobGVpZ2hjMjA3IiwiYSI6ImNqa3dod254cjByOGUzcHBkbmpmendyN2EifQ.RzeAqtiFyTg92mZO5Y2XoA';

class Map extends Component {
    componentDidMount() {
        this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9', 
        center: [-76.61, 39.29], 
        zoom: 11 
    });
    }
    
    componentWillUnmount() {
      this.map.remove();
    }

    render() {
    return <div ref={el => this.mapContainer = el} />;
  }
}

export default Map;