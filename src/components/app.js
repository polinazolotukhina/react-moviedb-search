import React, { Component } from 'react';
import axios from 'axios';
import MoviesSearch from '../components/movies-search';
import Movies from '../components/movies';

const API_KEY = '79eb5f868743610d9bddd40d274eb15d';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: [],
          kids: [],
          populars: [],
          rated: [],
          drama:[],
          header: 'Popular'
        }
    }
componentDidMount(){
  //KIDS
  const kidparams = {
    api_key: API_KEY,
    certification_country:'US',
    'certification.lte':'G',
    sort_by: 'popularity.desc'
  }
  this.getMovies('kids', kidparams);

  //POPULAR
  const dramaparams = {
    api_key: API_KEY,
    with_genres: 18,
    sort_by:'vote_average.desc',
    'vote_count.gte':10
  }
  this.getMovies('drama', dramaparams )


  const popularparams = {
    api_key: API_KEY,
    sort_by: 'popularity.descs'
  }
  this.getMovies('items',  popularparams)

  //RATED
  const ratedparams = {
    api_key: API_KEY,
    certification_country:'US',
    certification:'R',
    sort_by:'vote_average.desc'
  }
  this.getMovies('rated', ratedparams)
}



 getMovies(key, params, header) {
   this.setState({ header:header })
   var self = this;
   axios.get('http://api.themoviedb.org/3/discover/movie', {
     params: params
   })
   .then(function (response) {
       self.setState({[key]: response.data.results});
   })
   .catch(function (error) {
     console.log(error);
   });
 }

  // To Search the movie:
  handleSearchType =(e)=>{
    var self = this;
    axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: API_KEY,
          query: e.target.value
        }
      })
      .then(function (response) {
          self.setState({
            items: response.data.results,
            header: 'Search result'
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  searchCinema=()=>{
      const dateObj = new Date();
      const  month = dateObj.getUTCMonth() + 1; //months from 1-12
      const  day = dateObj.getUTCDate();
      const  year = dateObj.getUTCFullYear();
      const newdate = year + "-" + month + "-" + day;
      const cinemaparams = {
        api_key: API_KEY,
        'primary_release_date.lte':newdate,
        'primary_release_date.gte': newdate
      }
      this.getMovies('items', cinemaparams, 'In Cinema Now' )
  }

  searchBest=(e)=>{
      const bestparams = {
        api_key: API_KEY,
        'primary_release_year': e.target.attributes.getNamedItem('data-filter').value,
        'sort_by': 'vote_average.desc'
      }
      this.getMovies('items', bestparams, 'Best of the year'  )
  }
  searchPop=()=>{
      const poparams = {
        api_key: API_KEY,
        sort_by: 'popularity.descs'
      }
      this.getMovies('items', poparams, 'Popular'   )
  }



  render() {
    console.log(this.state);
    return (
      <div>
      <div className="menu">
        <div className="container">
            <nav className="navbar navbar-default">
                  <div classNameName="collapse navbar-collapse">
                      <ul className="nav navbar-nav">
                        <li><input type="text" className="form-control"  placeholder="Search..." onChange={this.handleSearchType} /></li>
                        <li onClick={this.searchPop}> Popular</li >
                        <li  onClick={this.searchCinema}> In Cinema Now</li >
                        <li data-filter="2017" onClick={this.searchBest}> Best of 2017 </li >
                        <li data-filter="2016" onClick={this.searchBest}> Best of 2016</li >
                        <li data-filter="2015" onClick={this.searchBest}> Best of 2015</li >
                      </ul>
                  </div>
            </nav>
        </div>
          <div className="search">
            <div className="container">
              <h2>{this.state.header}</h2>
              <Movies movieprop={this.state.items}/>
            </div>
          </div>
          <div className="drama">
            <div className="container">
                <h2>Drama</h2>
                <Movies movieprop={this.state.drama}/>
            </div>
          </div>
          <div className="kids">
            <div className="container">
              <h2>Kids</h2>
              <Movies movieprop={this.state.kids}/>
            </div>
          </div>
          <div className="rated">
            <div className="container">
              <h2>Rated</h2>
              <Movies movieprop={this.state.rated}/>
            </div>
          </div>
      </div>
      </div>
    )
  }
}
