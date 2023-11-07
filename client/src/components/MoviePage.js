import { useEffect, useState } from "react";
import NewMovieForm from "./NewMovieForm";
import MovieList from "./MovieList";
import Search from "./Search";

function MoviePage() {
  const [Movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // no need to use http://localhost:5555 here
    fetch("/Movies")
      .then((r) => r.json())
      .then((MoviesArray) => {
        setMovies(MoviesArray);
      });
  }, []);

  const handleAddMovie = (newMovie) => {
    const updatedMoviesArray = [...Movies, newMovie];
    setMovies(updatedMoviesArray);
  }

  const handleUpdateMovie = (updatedMovie) => {
    const updatedMoviesArray = Movies.map(Movie => {
      if (Movie.id === updatedMovie.id) return updatedMovie
      else return Movie;  
    });
    setMovies(updatedMoviesArray);
  }

  const handleDeleteMovie = (id) => {
    const updatedMoviesArray = Movies.filter((Movie) => Movie.id !== id);
    setMovies(updatedMoviesArray);
  }

  const displayedMovies = Movies.filter((Movie) => {
    return Movie.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <main>
      <NewMovieForm onAddMovie={handleAddMovie} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <MovieList Movies={displayedMovies} handleUpdateMovie={handleUpdateMovie} handleDeleteMovie={handleDeleteMovie}/>
    </main>
  );
}

export default MoviePage;
