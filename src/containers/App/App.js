import React, { Component } from "react";
import { Map, Sidebar } from "../../components";
import "./App.css";
import { venues } from "../../utils/venues";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";

let marker,
  popup,
  latLng,
  map,
  venueId,
  selectedMarker = [];

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXNobGVpZ2hjMjA3IiwiYSI6ImNqa3dod254cjByOGUzcHBkbmpmendyN2EifQ.RzeAqtiFyTg92mZO5Y2XoA";

class App extends Component {
  state = {
    pizzaPlaces: venues,
    venues: venues,
    markers: [],
    error: false
  };

  componentDidMount() {
    this.initializeMap();
  }

  // Initialize Mapbox Map and handle errors loading the map api
  initializeMap = () => {
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v9",
      center: [-76.62, 39.28],
      zoom: 13
    });

    map.on("error", () => {
      alert(
        "Uh oh! Mapbox was unable to load. Please retry or check your connection."
      );
    });

    return map;
  };

  // Create popups and call createMarker to create the marker with the associated popup
  initializeMarkers = venues => {
    return venues.map(venue => {
      popup = new mapboxgl.Popup({ offset: 25 });
      venueId = venue.name.replace(/\s+/g, "");
      latLng = [venue.location.lng, venue.location.lat];
      popup.setHTML(
        `<div tabindex="0"> <p class="popup-text">${venue.name}</p>
        <p class="popup-text">${venue.location.formattedAddress[0]}</p>
        <p class="popup-text">${venue.location.formattedAddress[1]}</p></div>`
      );
      return this.createMarker(latLng, popup, venueId);
    });
  };

  // Create Mapbox markers and add correct event listeners
  createMarker = (latLng, popup, venueId) => {
    marker = new mapboxgl.Marker({ color: "#40798C" })
      .setLngLat(latLng)
      .setPopup(popup)
      .addTo(map);
    marker.getElement().classList.add(`${venueId}`);
    marker.getElement().data = venueId;
    marker.getElement().addEventListener("focus", () => {
      marker.togglePopup();
    });
    marker.getElement().addEventListener("click", this.animateMarker);
    marker.getElement().setAttribute("tabindex", 0);
  };

  // Animate the markers on click
  animateMarker = event => {
    if (selectedMarker[0] !== event.currentTarget) {
      selectedMarker.push(event.currentTarget);
      selectedMarker[0].classList.remove("animateMarker");
      selectedMarker[0].classList.remove("changeColor");
      selectedMarker.splice(0, 1, event.currentTarget);
      event.currentTarget.classList.toggle("animateMarker");
      event.currentTarget.classList.toggle("changeColor");
      // event.stopPropagation()
    } else {
      event.currentTarget.classList.toggle("animateMarker");
      event.currentTarget.classList.toggle("changeColor");
    }
  };

  openPopup = marker => {
    marker.togglePopup();
  };

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
