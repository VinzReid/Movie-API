const Movie = require("../models/Movie.js");
const { errorHandler } = require("../auth.js");

const addMovie = async (req, res) => {
  const { title, director, year, description, genre } = req.body;

  const movie = new Movie({
    title,
    director,
    year,
    description,
    genre,
  });

  try {
    await movie.validate();
    const existingMovie = await Movie.findOne({
      title,
      director,
      year,
      description,
      genre,
    });
    if (existingMovie) {
      return res.status(409).send({ error: "Movie is already exist" });
    }
    const savedMovie = await movie.save();
    res.status(201).send(savedMovie);
  } catch (err) {
    errorHandler(err, req, res);
  }
};
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).send({ movies: movies });
  } catch (err) {
    errorHandler(err, req, res);
  }
};
const getMovie = async (req, res) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(400).send({ error: "Invalid movieId" });
    }
    res.status(200).send(movie);
  } catch (err) {
    errorHandler(err, req, res);
  }
};
const updateMovie = async (req, res) => {
  const { movieId } = req.params;
  const { title, director, year, description, genre } = req.body;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(400).send({ error: "Invalid movieId" });

    // Update only the fields that are present in the request body
    if (title) movie.title = title;
    if (director) movie.director = director;
    if (year) movie.year = year;
    if (description) movie.description = description;
    if (genre) movie.genre = genre;

    const savedMovie = await movie.save();
    res.status(200).send({
      message: "Movie updated successfully",
      updatedMovie: savedMovie,
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};
const deleteMovie = async (req, res) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(400).send({ error: "Invalid movieId" });
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    res.status(200).send({ message: "Movie deleted successfully" });
  } catch (err) {
    errorHandler(err, req, res);
  }
};
const addMovieComment = async (req, res) => {
  const { movieId } = req.params;
  const { comment } = req.body;
  const { id } = req.user;
  try {
    const movie = await Movie.findById(movieId);
    movie.comments.push({ userId: id, comment });
    const savedMovie = await movie.save();
    res.status(200).send({
      message: "Comment added successfully",
      updatedMovie: savedMovie,
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};
const getMovieComments = async (req, res) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findById(movieId);
    res.status(200).send({ comments: movie.comments });
  } catch (err) {
    errorHandler(err, req, res);
  }
};
module.exports = {
  addMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  addMovieComment,
  getMovieComments,
};
