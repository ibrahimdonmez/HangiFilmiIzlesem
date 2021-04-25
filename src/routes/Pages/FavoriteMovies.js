import React from 'react'
import { browserHistory } from 'react-router';
import * as Http from 'utils/http.helper'

class FavoriteMovies extends React.Component {

  constructor() {
    super();

    this.state = {
      hasError: false,
      errorMessage: ""
    }
  }

  componentDidMount() {
    // HTTP Call
    
  }


  render() {
    return (
      <div className="container" style={{ marginTop: "-10%" }}>
      </div>
    )
  }

}


export default FavoriteMovies;
