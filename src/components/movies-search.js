import React, { Component } from 'react';

export default class MoviesSearch extends Component {
  render() {
    const {movieprops} = this.props
    return (
      <ul className="list-unstyled">
        {
          movieprops && movieprops.map((item ) =>
          <li key={item.id}>
            <h4>name:{item.title }</h4>
            <p>release date: {item.release_date}</p>
            <p>vote: {item.vote_average}</p>
          </li>
        )
        }
      </ul>
    )
  }
}
