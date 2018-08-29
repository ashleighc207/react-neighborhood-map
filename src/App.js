import React, { Component } from 'react';
import Map from './components/Map.js';
import Sidebar from './components/Sidebar.js';
import './App.css';
import * as placesAPI from './data/placesAPI.js';
import data from './data/data.json';


class App extends Component {
  state = {
    data: data
  }
  
  render() {
    return (
      <div className="app" id="map">
        <Sidebar />
        <Map data={this.state.data} />
      </div>
    );
  }
}

export default App;
