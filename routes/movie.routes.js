const express = require("express");
const Movie = require("../models/movies");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json(error);
  }
});

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


module.exports = router;