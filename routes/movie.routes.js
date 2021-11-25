const express = require("express");
const Movie = require("../models/Movies");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Encontrar pelicula por el ID



router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);

    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json("No se encuentra la pelicula que buscas");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});
// filtrar por title

router.get('/title', async (req, res) => {
  try {
    const {title} = req.params;
    const movieByTitle = await Movie.find({
      title: title
    });

    if (Movie) {
      return res.status(200).json(Movie);
    } else {
      return res.status(404).json(`No se encuentra la película que buscas`);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});


module.exports = router;