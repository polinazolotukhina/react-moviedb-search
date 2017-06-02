import React, { Component } from 'react';

export default class MoviesSearch extends Component {

  render() {
    const {movieprop} = this.props;

    return (
      <div className="container">
        <div className="row">
            {
              movieprop && movieprop.slice(0,6).map((item ) =>
                <div className=" col-md-4 sm-12" key={item.id}>
                  <div className="movie">
                      <a href={"https://www.google.co.uk/search?q=" + item.title }>
                        {
                          item.backdrop_path ? (
                            <img className="moveImg"
                            onClick={this.showInfoOnClick}
                            src={"http://image.tmdb.org/t/p/w342" + item.backdrop_path} />
                          ) : (
                            <img className="moveImg" src="https://www.omao.noaa.gov/sites/all/themes/noaa_omao/images/video-placeholder-640.jpg" />
                          )
                        }
                      </a>
                      <div className="info">
                          <a href={"https://www.google.co.uk/search?q=" + item.title }>
                              <h4 className="movieName">{item.title }</h4>
                          </a>
                          <p>Release date : {item.release_date}</p>
                          <p>👍🏻{item.vote_average}</p>
                      </div>
                  </div>
                </div>
              )
            }
        </div>
      </div>
    )
  }
}
