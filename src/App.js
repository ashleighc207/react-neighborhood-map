import React, { Component } from 'react';
import Map from './components/Map.js';
import Sidebar from './components/Sidebar.js';
import './App.css';
import pizzaImport from './data/pizza.json';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';


let marker, 
    popup, 
    latLng, 
    markerArr, 
    map, 
    venues,
    venueId,
    selectedMarker = [],
    clientId = 'ZSPTQF2ZF05OMT3EYKCTCVOTLZ0SOS5CK55HEORQU0VG55NZ',
    clientSecret = 'DQJT5J4TFN3MBG2FK1SPDUVZL5IPM2RMOWETL3FQWGGXJQLH',
    api = 'https://api.foursquare.com/v2';
    markerArr = [];

mapboxgl.accessToken ='pk.eyJ1IjoiYXNobGVpZ2hjMjA3IiwiYSI6ImNqa3dod254cjByOGUzcHBkbmpmendyN2EifQ.RzeAqtiFyTg92mZO5Y2XoA';

let venueDev = [{name: "place", categories: [{name: "test"}], id: "1726362738", location: {lat: 39.29, lng: -76.61, formattedAddress: ["123 w maple", "baltimore md"]}, bestPhoto: {prefix: "https://www.kiabrisa.com.br/wp-content/uploads/revslider/home5/placeholder-1200x500-", width: "100", height: "100", suffix: ".png"}}, {name: "sushi", categories: [{name: "test"}], id: "345803495", location: {lat: 39.28, lng: -76.60, formattedAddress: ["125 w cherry", "baltimore md"]}, bestPhoto: {prefix: "https://www.kiabrisa.com.br/wp-content/uploads/revslider/home5/placeholder-1200x500-", width: "100", height: "100", suffix: ".png"}}];

class App extends Component {
  state = {
    pizzaPlaces: pizzaImport,
    venues: venueDev,
    markers: [],
    error: false
  }

  componentDidMount() {
    // this.getVenueDetails()
    this.initializeMap()
    this.initializeMarkers(venueDev)

  }

  initializeMap = () => {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9', 
        center: [-76.61, 39.29], 
        zoom: 13 
    });
    return map;
  }

  initializeMarkers = (venues) => {
    const allMarkers = venues.map(venue => {
      popup = new mapboxgl.Popup({ offset: 25 })
      venueId = venue.name;
      latLng = [venue.location.lng, venue.location.lat];
      this.createMarker(latLng, popup, venueId)
      popup.setHTML(
        `<p class="popup-text">${venue.name}</p> 
        <p class="popup-text">${venue.location.formattedAddress[0]}</p> 
        <p class="popup-text">${venue.location.formattedAddress[1]}</p>`
        );
      return popup;
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

  // getVenueDetails = () => {
  //   this.state.pizzaPlaces.venues.map(venue => {
  //     let venueId = venue.id;
  //     let venueArr = [];
  //      fetch(`${api}/venues/${venueId}?client_id=${clientId}&client_secret=${clientSecret}&v=20180323`)
  //       .then(res => res.json())
  //       .then((data) => {
  //         if(data.meta.code === 200){
  //           if(!data.response.venue.bestPhoto) {
  //             data.response.venue.bestPhoto = {prefix: "https://www.kiabrisa.com.br/wp-content/uploads/revslider/home5/placeholder-1200x500-", suffix: ".png", width: 100, height: 100}
  //           }
  //         this.setState({venues: [...this.state.venues, data.response.venue]}, () => {
  //           this.initializeMarkers(this.state.venues)
  //           return;
  //         })
  //       } else {
  //         this.setState({error: true})
  //       }
  //       }).catch(err => {
  //         if(err){
  //           console.log("error:", err);
  //           this.setState({error: true})
  //         }
  //       })
  //   return venueArr;
  //   })
  // }
  
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
    
  // updateMarkers = (markers) => {
  //   this.setState({ markers })
  // }

  // clearMarkers = () => {
  //   this.state.markers.map(marker => {
  //     marker.remove();
  //     return marker;
  //   })
  // }
  
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
