import React, { useState } from "react";
import "./SearchMovie.css";
import MovieCard from "../MovieCard/MovieCard.js";
import Loader from "../Loader/Loader.js";

export default function SearchMovie() {
  const [query, setQurey] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLodaing] = useState(false);
  const [message, setMessage] = useState("Let's Go!");

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const searchMovies = async (e, milliseconds = 1000) => {
    e.preventDefault();
    setLodaing(true);
    await sleep(milliseconds);

    const API_KEY = "YOU_API_KEY";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
      setLodaing(false);
      if (data.results.length === 0) {
        setMessage("Oops! No Results Found");
      }
      document.getElementById("form").reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form className="form" id="form" onSubmit={searchMovies}>
        <label htmlFor="query" className="label">
          Movie Name
        </label>
        <input
          type="text"
          className="input"
          name="query"
          placeholder="i.e Jurassic Park"
          onChange={(e) => setQurey(e.target.value)}
        ></input>
        <button type="submit" className="button">
          Search
        </button>
      </form>
      {loading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <div className="card-list">
          {movies
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
      ) : (
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginTop: "10%",
            color: "#fcefbf",
          }}
        >
          {message}
        </h2>
      )}
    </>
  );
}
