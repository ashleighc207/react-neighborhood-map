import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import '../App.css';

mapboxgl.accessToken ='pk.eyJ1IjoiYXNobGVpZ2hjMjA3IiwiYSI6ImNqa3dod254cjByOGUzcHBkbmpmendyN2EifQ.RzeAqtiFyTg92mZO5Y2XoA';

class Map extends Component {
    componentDidMount() {
        this.map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
        center: [-76.61, 39.29], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
    }
    
    componentWillUnmount() {
      this.map.remove();
    }

    render() {
      const style = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '100%'
      };

    return <div style={style} ref={el => this.mapContainer = el} />;
  }
}

export default Map;