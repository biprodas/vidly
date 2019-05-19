import React from 'react';
import Joi from 'joi-browser';
import Form from './form/form';

import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(0).max(100).label("Number In stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate")
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if(movieId==="new") return;

    const movie = getMovie(movieId);
    if(!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }
  
  mapToViewModel(movie){
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="card col-md-6 border border-white shadow">
          <div className="card-body">
            <h4 className="card-title text-center text-muted font-weight-bold">Movie Form</h4>
            <form onSubmit={this.handleSubmit} className="p-4">
              {this.renderInput("title", "Title")}
              {this.renderSelect("genreId", "Gnere", this.state.genres)}
              {this.renderInput("numberInStock", "Number in Stock", "number")}
              {this.renderInput("dailyRentalRate", "Rate")}
              <div className="text-center">
                {this.renderButton("Save")}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}


export default MovieForm;