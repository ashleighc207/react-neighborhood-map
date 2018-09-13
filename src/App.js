import React, { Component } from 'react';
import Map from './components/Map.js';
import Sidebar from './components/Sidebar.js';
import './App.css';
import pizzaImport from './data/pizza.json';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';


let marker, 
    popup, 
    latLng,  
    map, 
    venueId,
    selectedMarker = [];

let markerArr = [];

mapboxgl.accessToken ='pk.eyJ1IjoiYXNobGVpZ2hjMjA3IiwiYSI6ImNqa3dod254cjByOGUzcHBkbmpmendyN2EifQ.RzeAqtiFyTg92mZO5Y2XoA';

class App extends Component {
  state = {
    pizzaPlaces: pizzaImport,
    venues: pizzaImport,
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
        center: [-76.62, 39.28], 
        zoom: 13 
    });
    return map;
  }

  initializeMarkers = (venues) => {
    const allMarkers = venues.map(venue => {
      popup = new mapboxgl.Popup({ offset: 25 })
      venueId = venue.name.replace(/\s+/g, '');
      latLng = [venue.location.lng, venue.location.lat];
      this.createMarker(latLng, popup, venueId)
      popup.setHTML(
        `<p class="popup-text">${venue.name}</p> 
        <p class="popup-text">${venue.location.formattedAddress[0]}</p> 
        <p class="popup-text">${venue.location.formattedAddress[1]}</p>`
        );
      return allMarkers;
    })
      this.setState({markers: markerArr})
  }

  createMarker = (latLng, popup, venueId) => {
    marker = new mapboxgl.Marker({color: '#40798C'})
    .setLngLat(latLng)
    .setPopup(popup)
    .addTo(map)
    marker.getElement().classList.add(`${venueId}`)
    marker.getElement().data = venueId;
    marker.getElement().addEventListener('click', this.animateMarker)
    markerArr.push(marker)
    return marker;
  }
  
  animateMarker = (event) => {
      if(selectedMarker[0] !== event.currentTarget) {
        selectedMarker.push(event.currentTarget)
        selectedMarker[0].classList.remove("animateMarker")
        selectedMarker[0].classList.remove("changeColor")
        selectedMarker.splice(0, 1, event.currentTarget)
        event.currentTarget.classList.toggle("animateMarker")
        event.currentTarget.classList.toggle("changeColor")
      } else {
        event.currentTarget.classList.toggle("animateMarker")
        event.currentTarget.classList.toggle("changeColor")
      }
    }
    
  
  render() {
    return (
      <div className="app" id="map">
        <Sidebar 
        venues={this.state.venues}
        error={this.state.error}
        initializeMarkers={this.initializeMarkers}
        updateMarkers={this.updateMarkers}
        clearMarkers={this.clearMarkers}
        markers={this.state.markers}
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
