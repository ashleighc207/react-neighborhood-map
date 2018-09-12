import React, { Component } from 'react';
import Map from './components/Map.js';
import Sidebar from './components/Sidebar.js';
import './App.css';
import pizzaImport from './data/pizza.json';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';


let map;

mapboxgl.accessToken ='pk.eyJ1IjoiYXNobGVpZ2hjMjA3IiwiYSI6ImNqa3dod254cjByOGUzcHBkbmpmendyN2EifQ.RzeAqtiFyTg92mZO5Y2XoA';


class App extends Component {
  state = {
    pizzaPlaces: pizzaImport,
    venues:  pizzaImport,
    markers: [],
    error: false
  }

  componentDidMount() {
    this.initializeMap()
  }

  initializeMap = () => {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9', 
        center: [-76.61, 39.29], 
        zoom: 11 
    });
  }

  // filter = (query) => {
  //   this.state.venues.filter(venue => {
  //     venue.name === query;
  //   })
  //   let viewLocations = this.state.venues;
  //   if (query){
  //     const match = new RegExp(escapeRegExp(query),'i')
  //     veiwLocations = this.state.venues.filter((venue) => match.test(venue.name))
  //   }
  //   else{
  //     viewLocations = this.state.venues;
  //   }
  // }
  
  render() {
    return (
      <div className="app" id="map">
        <Sidebar 
        venues={this.state.venues}
        error={this.state.error}
        filter={this.filter}
        />
        
        <Map 
        initializeMap={this.initializeMap}
        initializeMarkers={this.initializeMarkers}
        />
      </div>
    );
  }
}

export default App;
