import { useState } from "react";

function NewMovieForm({ onAddMovie }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/Movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        image: image,
        price: price,
      }),
    })
      .then((r) => r.json())
      .then((newMovie) => onAddMovie(newMovie));
  }

  return (
    <div className="new-Movie-form">
      <h2>New Movie</h2>
      <br/>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Movie name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br/>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br/>
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <br/>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default NewMovieForm;
