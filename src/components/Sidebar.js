import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import '../App.css';

let venueDev = [{name: "place", categories: [{name: "test"}], id: "91283409284", location: {lat: 39.29, lng: -76.61, formattedAddress: ["123 w maple", "baltimore md"]}, bestPhoto: {prefix: "https://www.kiabrisa.com.br/wp-content/uploads/revslider/home5/placeholder-1200x500-", width: "100", height: "100", suffix: ".png"}}, {name: "sushi", categories: [{name: "test"}], id: "34534524", location: {lat: 39.28, lng: -76.60, formattedAddress: ["125 w cherry", "baltimore md"]}, bestPhoto: {prefix: "https://www.kiabrisa.com.br/wp-content/uploads/revslider/home5/placeholder-1200x500-", width: "100", height: "100", suffix: ".png"}}];


class Sidebar extends Component {
    
    state = {
        query: '',
        results: venueDev,
        venues: this.props.venues,
        error: false
    }

    componentWillReceiveProps() {
        this.setState({venues: this.props.venues}, () => {
            this.setState({results: this.state.venues})
            this.setState({ error: this.props.error })
        })
    }
    
    newSearch = (query) => {
        this.setState({ query})
    }


    render() {

    const { query, results, venues, error } = this.state
    
    let showingVenues;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingVenues = results.filter((venue) => match.test(venue.name))
    } else {
      showingVenues = results
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