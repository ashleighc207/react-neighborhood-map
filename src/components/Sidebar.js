import React, { Component } from 'react';
import '../App.css';

class Sidebar extends Component {
    
    state = {
        query: '',
        results: [],
        venues: this.props.venues,
        error: false
    }

    componentWillReceiveProps() {
        this.setState({venues: this.props.venues}, () => {
            this.setState({results: this.state.venues})
            this.setState({ error: this.props.error })
        })
    }

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