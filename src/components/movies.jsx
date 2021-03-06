import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import SearchBox from './common/searchBox';
import { paginate } from '../utils/paginate';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 5,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()]
    this.setState({ movies: getMovies(), genres})
  }
  

  handleDelete = movie => {
    //console.log("Delete clicked", movie);
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    //console.log("Like clicked", movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }

  handlePageChange = page => {
    //console.log('Current page', page)
    this.setState({ currentPage: page });
  }

  handleGenreSelect = genre => {
    //console.log(genre);
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  }

  handleSearch = query => {
    //console.log(query);
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    //console.log(sortColumn);
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const { 
      movies: allMovies, 
      selectedGenre,
      currentPage, 
      pageSize, 
      sortColumn,
      searchQuery
    } = this.state;

    let filtered = allMovies;
    if(searchQuery){
      filtered = allMovies.filter(movie => 
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
        movie.genre.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    else {
      filtered = selectedGenre && selectedGenre._id 
      ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
      : allMovies;
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return {
      totalCount: filtered.length,
      data: movies
    }
  }

  render() {
    const { length: count } = this.state.movies;
    const { 
      genres, 
      selectedGenre,
      currentPage, 
      pageSize, 
      sortColumn,
      searchQuery
    } = this.state;
    
    if(count===0) return <p>There is no movie in the database.</p>;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-md-3">
          <ListGroup 
            items={genres} 
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <div className="row">
            <p className="col-8">Showing {totalCount} movies in the database.</p>
            <div className="col-4 text-right">
              <Link 
                to="/movies/new" 
                className="btn brn-sm btn-info font-weight-bold">
                <i className="fa fa-plus"></i> New Movie
              </Link>
            </div>
          </div>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable 
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination 
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    )
  }
}


export default Movies;