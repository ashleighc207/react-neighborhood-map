import React, { Component } from 'react';
import '../App.css';




class Sidebar extends Component {
    
    state = {
        query: '',
        results: [],
        venues: [],
        error: false
    }

    componentWillReceiveProps() {
        this.setState({venues: this.props.venues}, () => {
            this.setState({results: this.state.venues})
        })
    }

    render() {

    const { query, results, venues, error } = this.state
    
    return(
        <div className="sidebar-container">
            <input type="text" placeholder="Search by name" className="sidebar-search"/>
            {!error && results.map(venue => (
            <div className="venue-box" key={venue.id}>
                <h2 className="venue-name">{venue.name}</h2>
                <div className="venue-sub-box">
                    <img className="venue-img" src={venue.bestPhoto.prefix + venue.bestPhoto} alt={venue.name}/>
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