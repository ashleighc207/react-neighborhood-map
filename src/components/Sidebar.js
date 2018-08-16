import React, { Component } from 'react';
import '../App.css';

class Sidebar extends Component {
    render() {
    return(
        <div className="sidebar-container">
            <input type="text" placeholder="search" className="sidebar-search"/>
        </div>
    ) 
  }
}

export default Sidebar;