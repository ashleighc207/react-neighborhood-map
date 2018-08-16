import React, { Component } from 'react';
import Map from './components/Map.js';
import Sidebar from './components/Sidebar.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app" id="map">
        <Sidebar />
        <Map />
      </div>
    );
  }
}

export default App;
