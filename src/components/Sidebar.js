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
            this.setState({ error: this.props.error })
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
                
        </aside>
    ) 
  }
}

export default Sidebar;