import React, { Component } from 'react';
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

class Sidebar extends Component {
    
    state = {
        query: '',
        results: [],
        venues: [],
        error: false
    }

    componentDidMount() {
        this.setState({venues: this.props.venues})
        this.getVenueDetails()
    }

    getVenueDetails = () => {
    this.state.venues.map(venue => {
      let venueId = venue.id;
      let venueArr = [];
       fetch(`${api}/venues/${venueId}?client_id=${clientId}&client_secret=${clientSecret}&v=20180323`)
        .then(res => res.json())
        .then((data) => {
          if(data.meta.code === 200){
          this.setState({venues: [...this.state.venues, data.response.venue], results: [...this.state.results, data.response.venue]}, () => {
            this.initializeMarkers(this.state.venues)
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
   initializeMarkers = (venues) => {
    const allMarkers = venues.map(venue => {
      popup = new mapboxgl.Popup({ offset: 25 })
      latLng = [venue.location.lng, venue.location.lat];
      this.createMarker(latLng, popup)
      popup.setHTML(
        `<p class="popup-text">${venue.name}</p> 
        <p class="popup-text">${venue.location.formattedAddress[0]}</p> 
        <p class="popup-text">${venue.location.formattedAddress[1]}</p>`
        );
      return popup;
    })
  }

  createMarker = (latLng, popup) => {
    marker = new mapboxgl.Marker({color: '#40798C'})
    .setLngLat(latLng)
    .setPopup(popup)
    .addTo(map)
    // marker.getElement().addEventListener('click', markerAnimation())
    this.updateMarkerArr(marker)
  }

  updateMarkers = (markers) => {
    this.setState({ markers })
  }

  updateMarkerArr = (marker) => {
    markerArr.push(marker)
    this.setState({markers: markerArr}, () => {
      return;
      });
  }

  clearMarkers = () => {
    this.state.markers.map(marker => {
      marker.remove();
      return marker;
    })
  }


//     search = (event) => {
//     let error = '', results = [];
//     let query = event.target.value;
    
//     this.setState({ query })
    
//     if (query){
//         this.props.filter(query).then((venues) => {
//             if (venues.length > 0){
//                  // this.updateBooks(books);
//             } else {
//                 this.setState({error: true})
//             }
//         })
//     } else {
//         this.setState({results: [], error: false})
//     }
// }


    render() {

    const { query, results, venues, error } = this.state
    
    return(
        <aside className="sidebar-container">
            <label htmlFor="search"/>
            <input type="text" id="search" placeholder="Search by name" className="sidebar-search"/>
            {!error && results.map(venue => (
            <section className="venue-box" key={venue.id}>
                <h2 className="venue-name">{venue.name}</h2>
                <section className="venue-sub-box">
                    <img className="venue-img"  src={venue.bestPhoto.prefix + venue.bestPhoto.width + "x" +venue.bestPhoto.height + venue.bestPhoto.suffix} alt={venue.name}/>
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