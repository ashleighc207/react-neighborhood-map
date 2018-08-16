import React, { Component } from 'react';
import Map from './components/Map.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" id="map">
        <Map />
      </div>
    );
  }
}

export default App;
