import React, { Component } from 'react';
import '../App.css';
import * as placesAPI from '../data/placesAPI.js';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

let error, results, query, clientId, clientSecret, api, lat, lon, map;

clientId = 'ZSPTQF2ZF05OMT3EYKCTCVOTLZ0SOS5CK55HEORQU0VG55NZ';
clientSecret = 'DQJT5J4TFN3MBG2FK1SPDUVZL5IPM2RMOWETL3FQWGGXJQLH';
api = 'https://api.foursquare.com/v2';
lat = 39.29;
lon = -76.61;

let point;

class Sidebar extends Component {
    
    state = {
        query: '',
        results: [],
        error: false
    }
    
    search = (event) => {
        error = '', results = [];
        query = event.target.value;
        
        this.setState({ query })
        
        if (query){
        fetch(`${api}/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20180323&limit=1&ll=${lat},${lon}&query=${query}`)
        .then(res => res.json())
        .then((data) => {
            this.setState({results: data.response.venues})
        })
        }
        
    }
    
    
    
    render() {
    const { query, results, error } = this.state
    const { venues } = this.props;
    
    return(
        <div className="sidebar-container">
            <input type="text" placeholder="Search by name" className="sidebar-search" onChange={(event) => this.search(event)}/>
            {!error && results.map(venue => (
            <div className="venue-box" key={venue.id}>
                <h2 className="venue-name">{venue.name}</h2>
                <div className="venue-sub-box">
                    <img className="venue-img" src={venue.categories[0].icon.prefix+".png"} />
                    <ul className="venue-list">
                        <li className="venue-text">{venue.categories[0].name}</li>
                        <li className="venue-text">{venue.location.formattedAddress[0]}</li>
                        <li className="venue-text">{venue.location.formattedAddress[1]}</li>
                    </ul>
                </div>
            </div>
            )
            )}
        </div>
    ) 
  }
}

export default Sidebar;