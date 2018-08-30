import React, { Component } from 'react';
import Map from './components/Map.js';
import Sidebar from './components/Sidebar.js';
import './App.css';
import data from './data/data.json';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

let newMarker, map;

class App extends Component {
  state = {
    data,
    markers: [],
    newMarker: {}
  }

  updateMarkers = (markers) => {
    this.setState({ markers })
  }

  initializeMap = () => {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9', 
        center: [-76.61, 39.29], 
        zoom: 11 
    });
    this.setState({ data })
  }


  updateVenues = (data) => {
    this.setState({ data })
      data.map(venue => {
        this.createMarker(venue.location.lng, venue.location.lat)
      })
    console.log(data)
  }


  createMarker = (lng, lat) => {
    newMarker = new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo(map)
    this.setState({ newMarker })
  }

  clearMarkers = () => {

  }
  
  render() {
    return (
      <div className="app" id="map">
        <Sidebar 
        venues={this.state.data}
        markers={this.state.markers}
        createMarker={this.createMarker}
        updateMarkers={this.updateMarkers}
        initializeMap={this.initializeMap}
        updateVenues={this.updateVenues}
        />
        
        <Map 
        data={this.state.data}
        markers={this.state.markers}
        createMarker={this.createMarker}
        updateMarkers={this.updateMarkers}
        initializeMap={this.initializeMap}
        updateVenues={this.updateVenues}
        />
      </div>
    );
  }
}

export default App;
