import React, { Component } from "react";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import yelp from "../../api/yelp";
import "./Sidebar.css";

const clientId = "ZSPTQF2ZF05OMT3EYKCTCVOTLZ0SOS5CK55HEORQU0VG55NZ";
const clientSecret = "DQJT5J4TFN3MBG2FK1SPDUVZL5IPM2RMOWETL3FQWGGXJQLH";

class Sidebar extends Component {
  state = {
    query: "",
    results: [],
    venues: [],
    markers: [],
    error: false
  };

  componentDidMount() {
    this.setState({ venues: this.props.venues }, () => {
      this.getVenueDetails();
    });
  }

  // Listen for change in search bar query
  newSearch = query => {
    this.setState({ query });
  };

  loadVenueData = async id => {
    try {
      let resp = await yelp.get(
        `/venues/${id}?client_id=${clientId}&client_secret=${clientSecret}&v=20180323`
      );
      if (resp.status === 200) {
        if (!resp.data.response.venue.bestPhoto) {
          resp.data.response.venue.bestPhoto = {
            prefix:
              "https://www.kiabrisa.com.br/wp-content/uploads/revslider/home5/placeholder-1200x500-",
            suffix: ".png",
            width: 100,
            height: 100
          };
        }
        // Set the venues state to each venue as the details come in and initialize the corresponding markers
        this.setState(
          {
            venues: [...this.state.venues, resp.data.response.venue],
            results: [...this.state.results, resp.data.response.venue]
          },
          () => {
            this.props.initializeMarkers([resp.data.response.venue]);
            return;
          }
        );
      } else {
        this.setState({ error: true });
      }
    } catch (err) {
      console.warn(`Get Venue Data Error: ${err}`);
      this.setState({ error: true });
    }
  };

  // API call to Foursquare
  getVenueDetails = async () => {
    this.state.venues.map(venue => {
      this.loadVenueData(venue.id);
      return venue;
    });
  };

  render() {
    const { query, results, markers, error } = this.state;

    let showVenues, showMarkers;

    // Filter venue list based on query input
    if (query) {
      const venueMatch = new RegExp(escapeRegExp(query), "i");
      showVenues = results.filter(venue => venueMatch.test(venue.name));

      // Filter markers based on query input
      const markerMatch = new RegExp(escapeRegExp(query), "i");
      showMarkers = markers.filter(marker => {
        if (!markerMatch.test(marker._element.data)) {
          marker._element.classList.add("display-none");
        } else {
          marker._element.classList.remove("display-none");
        }
        return showMarkers;
      });
    } else {
      showVenues = results;
      showMarkers = markers;
      this.state.markers.forEach(marker => {
        marker._element.classList.remove("display-none");
      });
    }

    showVenues.sort(sortBy("name"));

    return (
      <aside className="sidebar-container">
        <input
          type="text"
          id="search"
          placeholder="Search by name"
          className="sidebar-search"
          aria-label="search"
          value={query}
          onChange={event => this.newSearch(event.target.value)}
        />
        {!error &&
          showVenues.map(venue => (
            <section className="venue-box" key={venue.id}>
              <h2 className="venue-name" tabIndex="0">
                {venue.name}
              </h2>
              <section className="venue-sub-box">
                <img
                  className="venue-img"
                  alt={venue.name}
                  src={
                    venue.bestPhoto.prefix +
                    venue.bestPhoto.width +
                    "x" +
                    venue.bestPhoto.height +
                    venue.bestPhoto.suffix
                  }
                />
                <ul className="venue-list">
                  <li className="venue-text">{venue.categories[0].name}</li>
                  <li className="venue-text">
                    {venue.location.formattedAddress[0]}
                  </li>
                  <li className="venue-text">
                    {venue.location.formattedAddress[1]}
                  </li>
                </ul>
              </section>
            </section>
          ))}
        {error && (
          <p className="error-text">
            Oh no! There was an error getting the requested data from
            FourSquare. Please try again or report this error via the{" "}
            <a href="https://github.com/ashleighc207/react-neighborhood-map/issues">
              Github&nbsp;Repo.
            </a>
          </p>
        )}
      </aside>
    );
  }
}

export default Sidebar;
