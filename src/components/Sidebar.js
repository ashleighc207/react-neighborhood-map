import React, { Component } from 'react';
import '../App.css';

class Sidebar extends Component {
    render() {
    return(
        <div className="sidebar-container">
            <input type="text" placeholder="Search by zipcode" className="sidebar-search"/>
            <div className="input-box">
                <input type="radio" name="Breed" className="sidebar-radio"/>
                <label htmlFor="Breed" value="Breed" className="label">Breed</label>
            </div>
        </div>
    ) 
  }
}

export default Sidebar;