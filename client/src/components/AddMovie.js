import React, { useState } from 'react';
import './Home.css';

const AddMovie = () => {
  const [movie, setMovie] = useState({
    name: '',
    image: '',
    release_date: '',
    description: '',
    genres: [], 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleGenreChange = (e) => {
    const { value } = e.target;
    const updatedGenres = movie.genres.includes(value)
      ? movie.genres.filter((genre) => genre !== value)
      : [...movie.genres, value];
    setMovie({ ...movie, genres: updatedGenres });
  };

  const handleSave = () => {
    // Implement your save logic here (make a POST request to your API)
    fetch('/Movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Movie saved:', data);
        // Reset the form
        setMovie({
          name: '',
          image: '',
          release_date: '',
          description: '',
        });
      })
      .catch((error) => console.error('Error saving movie:', error));
  };

  return (
    <div className="container">
      <h1>Add a Movie</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Movie Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={movie.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="releaseDate">Release Date:</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={movie.releaseDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={movie.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={movie.image}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Genres:</label>
          <label>
            <input
              type="checkbox"
              name="genre"
              value="Action"
              checked={movie.genres.includes('Action')}
              onChange={handleGenreChange}
            />{' '}
            Action
          </label>
          <label>
            <input
              type="checkbox"
              name="genre"
              value="Comedy"
              checked={movie.genres.includes('Comedy')}
              onChange={handleGenreChange}
            />{' '}
            Comedy
          </label>
          <label>
            <input
              type="checkbox"
              name="genre"
              value="Drama"
              checked={movie.genres.includes('Drama')}
              onChange={handleGenreChange}
            />{' '}
            Drama
          </label>
          <label>
            <input
              type="checkbox"
              name="genre"
              value="Sci-Fi"
              checked={movie.genres.includes('Sci-Fi')}
              onChange={handleGenreChange}
            />{' '}
            Sci-Fi
          </label>
          <label>
            <input
              type="checkbox"
              name="genre"
              value="Horror"
              checked={movie.genres.includes('Horror')}
              onChange={handleGenreChange}
            />{' '}
            Horror
          </label>
        </div>
        <div className="form-group">
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
