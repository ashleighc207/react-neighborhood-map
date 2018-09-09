import React, { Component } from 'react';
import '../App.css';


class Map extends Component {
    
    render() {
    return <div ref={el => this.mapContainer = el} />;
  }
}

export default Map;