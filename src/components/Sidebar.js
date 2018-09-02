import React, { Component } from 'react';
import '../App.css';


let initialVenues = [];

class Sidebar extends Component {
    
    state = {
        query: '',
        results: [],
        error: false
    }
    
    componentDidMount() {
        const { venues } = this.props.venues;
        venues.map(venue => {
            initialVenues.push(venue)
        })

       this.setState({results: initialVenues}, () => {
        });
    }

    search = (event) => {
    let error = '', 
        results = [],
        query = event.target.value,
        icon = '',
        clientId = 'ZSPTQF2ZF05OMT3EYKCTCVOTLZ0SOS5CK55HEORQU0VG55NZ',
        clientSecret = 'DQJT5J4TFN3MBG2FK1SPDUVZL5IPM2RMOWETL3FQWGGXJQLH',
        api = 'https://api.foursquare.com/v2',
        lat = 39.29,
        lon = -76.61;

    const { markers, updateVenues, clearMarkers, resetMarkers } = this.props;

        this.setState({ query })
        
        if (query) {
            fetch(`${api}/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20180323&limit=10&ll=${lat},${lon}&query=${query}`)
                .then(res => res.json())
                .then((data) => {
                    clearMarkers();
                    data.response.venues.map(venue => {
                        console.log(venue)
                        if(venue.categories.length === 0) {
                            venue.categories[0] = {icon: {prefix: "http://foroakcliff.org/wp-content/uploads/2016/05/placeholder-1024x683"}, name: "No Data"};
                        } 
                    })                    

                    this.setState({results: data.response.venues})
                    updateVenues(data.response);

                }).catch(err => {
                    if(err) {
                        console.log("error:", err)
                    }
                })
        } else if(query === '') {
            this.setState({results: initialVenues})
            resetMarkers();
        } else if(query && results.length === 0) {
            error = true;
            console.log(error)
        }
    
    }

    render() {

    const { query, results, error } = this.state
    
    return(
        <div className="sidebar-container">
            <input type="text" placeholder="Search by name" className="sidebar-search" onChange={(event) => this.search(event)}/>
            {!error && results.map(venue => (
            <div className="venue-box" key={venue.id}>
                <h2 className="venue-name">{venue.name}</h2>
                <div className="venue-sub-box">
                    <img className="venue-img" src={venue.categories[0].icon.prefix + ".png"} />
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