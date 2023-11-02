import React, { useState, useEffect } from 'react';
import './Home.css';
import RateAndReviewSection from './RateAndReviewSection';

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  

  useEffect(() => {
    // Fetch movies from your API
    fetch('/Movies') 
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));
  
    // Fetch genres from your API
    fetch('/Genres') 
      .then((response) => response.json())
      .then((data) => setGenres(data))
      .catch((error) => console.error('Error fetching genres:', error));
  }, []);

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleSearch = () => {
    // Perform a search based on 'searchQuery'
    const searchResults = movies.filter((movie) =>
      movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    // Update 'movies' with the search results
    setMovies(searchResults);
  };

  const sortedMovies = movies.slice(); // Create a copy of the movies array

  if (sortOption === 'name') {
    sortedMovies.sort((a, b) => a.name.localeCompare(b.name));
    console.log(sortedMovies);
  } else if (sortOption === 'release_date') {
    sortedMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  } else if (sortOption === 'rating') {
    sortedMovies.sort((a, b) => b.rating - a.rating);
  }
  

  return (
    <div className="movies-page">
      <header>
        <nav>
          <ul>
            <li>Home</li>
            <li>Movies</li>
            <li>Add Movies</li>
            <li>User Profile</li>
          </ul>
        </nav>
      </header>

      <h2>Discover Movies</h2>

      <div className="filters">
        <div>
          Filter by:
          <select value={selectedGenre} onChange={handleGenreChange}>
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Sort by:
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">Default</option>
            <option value="name">Title</option>
            <option value="release_date">Release Date</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search for movies"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="thumbnails">
        {sortedMovies.map((movie) => (
          <div
            key={movie.id}
            className="movie-thumbnail"
            onClick={() => setSelectedMovie(movie)}
          >
            <img src={movie.image} alt={movie.name} />
            <h3>{movie.name}</h3>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>

      
      {/* Detailed Movie Page */}
      {selectedMovie && (
        <div className="detailed-movie-page">
          {/* Display detailed movie information */}
          <img src={selectedMovie.image} alt={selectedMovie.name} />
          <h2>{selectedMovie.name}</h2>
          <p>Release Date: {selectedMovie.release_date}</p>
          <p>Description: {selectedMovie.description}</p>
          <p>Genres: {selectedMovie.genres.map(genre => genre.name).join(', ')}</p>
          <p>User Ratings: {selectedMovie.ratings.map(rating => rating.rating + ' (' + rating.user.username + ')').join(', ')}</p>

        </div>
      )}

      {/* Rate and Review Section */}
      {selectedMovie && (
        <RateAndReviewSection movie={selectedMovie} />
      )}
    </div>
  );
};


export default Movie;
