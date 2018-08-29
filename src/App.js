import React, { Component } from 'react';
import Map from './components/Map.js';
import Sidebar from './components/Sidebar.js';
import './App.css';
import * as placesAPI from './data/placesAPI.js';
import data from './data/data.json';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';


class App extends Component {
  state = {
    data: data,
    markers: []
  }
  
  render() {
    return (
      <div className="app" id="map">
        <Sidebar 
        venues={this.state.data}
        markers={this.state.markers}
        />
        
        <Map 
        data={this.state.data}
        markers={this.state.markers}
        />
      </div>
    );
  }
}

export default App;
