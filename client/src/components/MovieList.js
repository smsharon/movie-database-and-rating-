import MovieCard from "./MovieCard";

function MovieList({ Movies, handleUpdateMovie, handleDeleteMovie }) {
  return (
    <ul className="cards">
      {Movies.map((Movie) => {
        return <MovieCard key={Movie.id} Movie={Movie} handleUpdateMovie={handleUpdateMovie} handleDeleteMovie={handleDeleteMovie} />;
      })}
    </ul>
  );
}

export default MovieList;
