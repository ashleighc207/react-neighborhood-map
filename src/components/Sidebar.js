import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import '../App.css';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';


let clientId = 'ZSPTQF2ZF05OMT3EYKCTCVOTLZ0SOS5CK55HEORQU0VG55NZ',
clientSecret = 'DQJT5J4TFN3MBG2FK1SPDUVZL5IPM2RMOWETL3FQWGGXJQLH',
api = 'https://api.foursquare.com/v2',
marker, 
popup, 
latLng, 
map,
markerArr;

let venueDev = [{name: "place", categories: [{name: "test"}], id: "1726362738", location: {lat: 39.29, lng: -76.61, formattedAddress: ["123 w maple", "baltimore md"]}, bestPhoto: {prefix: "https://www.kiabrisa.com.br/wp-content/uploads/revslider/home5/placeholder-1200x500-", width: "100", height: "100", suffix: ".png"}}, {name: "sushi", categories: [{name: "test"}], id: "345803495", location: {lat: 39.28, lng: -76.60, formattedAddress: ["125 w cherry", "baltimore md"]}, bestPhoto: {prefix: "https://www.kiabrisa.com.br/wp-content/uploads/revslider/home5/placeholder-1200x500-", width: "100", height: "100", suffix: ".png"}}];


class Sidebar extends Component {
    
    state = {
        query: '',
        results: [],
        venues: [],
        markers: [],
        error: false
    }

    componentDidMount() {
        this.setState({venues: this.props.venues}, () => {
        this.getVenueDetails()
        })
    }

    componentWillReceiveProps() {
        this.setState({markers: this.props.markers})
    }
    
    newSearch = (query) => {
        this.setState({ query})
    }


    getVenueDetails = () => {
    this.state.venues.venues.map(venue => {
      let venueId = venue.id;
      let venueArr = [];
       fetch(`${api}/venues/${venueId}?client_id=${clientId}&client_secret=${clientSecret}&v=20180323`)
        .then(res => res.json())
        .then((data) => {
          if(data.meta.code === 200){
            if(!data.response.venue.bestPhoto) {
              data.response.venue.bestPhoto = {prefix: "https://www.kiabrisa.com.br/wp-content/uploads/revslider/home5/placeholder-1200x500-", suffix: ".png", width: 100, height: 100}
            }
          this.setState({venues: [...this.state.venues, data.response.venue], results: [...this.state.results, data.response.venue]}, () => {
            this.props.initializeMarkers(this.state.venues)
            return;
          })
        } else {
          this.setState({error: true})
        }
        }).catch(err => {
          if(err){
            console.log("error:", err);
            this.setState({error: true})
          }
        })
    return venueArr;
    })
  }

    render() {

    const { query, results, venues, markers, error } = this.state
    
    let showingVenues, showingMarkers;
    if (query) {
      const venueMatch = new RegExp(escapeRegExp(query), 'i')
      showingVenues = results.filter((venue) => venueMatch.test(venue.name))
      console.log(showingMarkers)
      console.log(markers)
      const markerMatch = new RegExp(escapeRegExp(query), 'i')
      showingMarkers = markers.filter((marker) => {
        if(!markerMatch.test(marker._element.data)) {
            marker._element.classList.add('display-none')
            console.log(marker)
        } else {
            marker._element.classList.remove('display-none')
        }
    })

    } else {
      showingVenues = results
      showingMarkers = markers
      this.state.markers.forEach((marker) => {
        marker._element.classList.remove('display-none')
      })
    }
    showingVenues.sort(sortBy('name'))
    
    return(
        <aside className="sidebar-container">
            <label htmlFor="search"/>
            <input 
            type="text" 
            id="search" 
            placeholder="Search by name" 
            className="sidebar-search"
            value={query}
            onChange={(event) => this.newSearch(event.target.value)}
            />
            {!error && showingVenues.map(venue => (
            <section className="venue-box" key={venue.id}>
                <h2 className="venue-name">{venue.name}</h2>
                <section className="venue-sub-box">
                    <img className="venue-img"  alt={venue.name} src={venue.bestPhoto.prefix + venue.bestPhoto.width + "x" + venue.bestPhoto.height + venue.bestPhoto.suffix}/>
                    <ul className="venue-list">
                        <li className="venue-text">{venue.categories[0].name}</li>
                        <li className="venue-text">{venue.location.formattedAddress[0]}</li>
                        <li className="venue-text">{venue.location.formattedAddress[1]}</li>
                    </ul>
                </section>
            </section>
            )
            )}
            {error && 
                    <p className="error-text">Oh no! There was an error getting the requested data from FourSquare. Please try again or report this error via the <a href="https://github.com/ashleighc207/react-neighborhood-map/issues">Github&nbsp;Repo.</a>
                </p>
            }
        </aside>
    ) 
  }
}

export default Sidebar;