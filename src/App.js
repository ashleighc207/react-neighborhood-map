import React, { Component } from 'react';
import Map from './components/Map.js';
import Sidebar from './components/Sidebar.js';
import './App.css';
import dataImport from './data/data.json';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

mapboxgl.accessToken ='pk.eyJ1IjoiYXNobGVpZ2hjMjA3IiwiYSI6ImNqa3dod254cjByOGUzcHBkbmpmendyN2EifQ.RzeAqtiFyTg92mZO5Y2XoA';

let marker, popup, latLng, markerArr, map;

markerArr = [];

class App extends Component {
  state = {
    data: dataImport,
    markers: []
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
  }

  initializeMarkers = () => {
    this.state.data.venues.forEach(venue => {
      popup = new mapboxgl.Popup({ offset: 25 })
      latLng = [venue.location.lng, venue.location.lat];
      this.createMarker(latLng, popup)
      popup.setHTML(
        `<p class="popup-text">${venue.name}</p> 
        <p class="popup-text">${venue.location.formattedAddress[0]}</p> 
        <p class="popup-text">${venue.location.formattedAddress[1]}</p>`
        );
      console.log(popup)
    })
  }

  updateVenues = (data) => {
    this.setState({ data })
    this.initializeMarkers()
  }

  createMarker = (latLnd, popup) => {
    marker = new mapboxgl.Marker({color: '#40798C'})
    .setLngLat(latLng)
    .setPopup(popup)
    .addTo(map)
    this.updateMarkerArr(marker)
    console.log(marker)
  }

  updateMarkerArr = (marker) => {
    markerArr.push(marker)
    this.setState({markers: markerArr}, () => {
      });
  }

  resetMarkers = () => {
    this.setState({data: dataImport}, () => {
      this.initializeMarkers();
    });
  }

  clearMarkers = () => {
    this.state.markers.map(marker => {
      marker.remove();
      return marker;
    })
  }

  showInfo = () => {
    
  }


  
  render() {
    return (
      <div className="app" id="map">
        <Sidebar 
        venues={this.state.data}
        markers={this.state.markers}
        createMarker={this.createMarker}
        updateMarkers={this.updateMarkers}
        updateVenues={this.updateVenues}
        clearMarkers={this.clearMarkers}
        resetMarkers={this.resetMarkers}
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
