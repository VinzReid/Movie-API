const express = require("express");
const movieController = require("../controllers/movie.js");
const auth = require("../auth.js");

const { verify, verifyAdmin } = auth;

//[SECTION] Routing Component
const router = express.Router();

//[SECTION] Routes
router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);
router.get("/getMovies", movieController.getMovies);
router.get("/getMovie/:movieId", movieController.getMovie);
router.put(
  "/updateMovie/:movieId",
  verify,
  verifyAdmin,
  movieController.updateMovie
);
router.delete(
  "/deleteMovie/:movieId",
  verify,
  verifyAdmin,
  movieController.deleteMovie
);
router.post("/addComment/:movieId", verify, movieController.addMovieComment);
router.get("/getComments/:movieId", verify, movieController.getMovieComments);

module.exports = router;
