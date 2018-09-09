import React, { Component } from 'react';
import '../App.css';


class Map extends Component {

    render() {
    return <div ref={el => this.mapContainer = el} role="application"/>;
  }
}

export default Map;