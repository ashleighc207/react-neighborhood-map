import React, { Component } from 'react';
import '../App.css';


class Map extends Component {

    componentDidMount() {

    const { initializeMarkers, initializeMap } = this.props;
    initializeMap() 
    initializeMarkers()

    }
    
    render() {
    return <div ref={el => this.mapContainer = el} />;
  }
}

export default Map;