import React, { Component } from 'react';
import Map from './components/Map.js';
import Sidebar from './components/Sidebar.js';
import './App.css';
import pizzaImport from './data/pizza.json';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

mapboxgl.accessToken ='pk.eyJ1IjoiYXNobGVpZ2hjMjA3IiwiYSI6ImNqa3dod254cjByOGUzcHBkbmpmendyN2EifQ.RzeAqtiFyTg92mZO5Y2XoA';

let marker, popup, latLng, markerArr, map, venues,
    clientId = 'ZSPTQF2ZF05OMT3EYKCTCVOTLZ0SOS5CK55HEORQU0VG55NZ',
    clientSecret = 'DQJT5J4TFN3MBG2FK1SPDUVZL5IPM2RMOWETL3FQWGGXJQLH',
    api = 'https://api.foursquare.com/v2';
markerArr = [];

class App extends Component {
  state = {
    pizzaPlaces: pizzaImport,
    venues: [],
    markers: []
  }

  componentDidMount() {
    // this.getVenueDetails()
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

  initializeMarkers = (venues) => {
    venues.map(venue => {
      popup = new mapboxgl.Popup({ offset: 25 })
      latLng = [venue.location.lng, venue.location.lat];
      this.createMarker(latLng, popup)
      popup.setHTML(
        `<p class="popup-text">${venue.name}</p> 
        <p class="popup-text">${venue.location.formattedAddress[0]}</p> 
        <p class="popup-text">${venue.location.formattedAddress[1]}</p>`
        );
      return popup;
    })
  }


  createMarker = (latLng, popup) => {
    marker = new mapboxgl.Marker({color: '#40798C'})
    .setLngLat(latLng)
    .setPopup(popup)
    .addTo(map)
    this.updateMarkerArr(marker)
  }

  updateMarkers = (markers) => {
    this.setState({ markers })
  }

  updateMarkerArr = (marker) => {
    markerArr.push(marker)
    this.setState({markers: markerArr}, () => {
      });
  }

  clearMarkers = () => {
    this.state.markers.map(marker => {
      marker.remove();
      return marker;
    })
  }

  getVenueDetails = () => {
    this.state.pizzaPlaces.venues.map(venue => {
      let venueId = venue.id;
      let venueArr = [];
       fetch(`${api}/venues/${venueId}?client_id=${clientId}&client_secret=${clientSecret}&v=20180323`)
        .then(res => res.json())
        .then((data) => {
          this.setState({venues: [...this.state.venues, data.response.venue]}, () => {
            this.initializeMarkers(this.state.venues)
            return;
          })
        })   
    return venueArr;
    })
  }


  
  render() {
    return (
      <div className="app" id="map">
        <Sidebar 
        venues={this.state.venues}
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
