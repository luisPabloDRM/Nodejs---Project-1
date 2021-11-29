const express = require("express");
const Movie = require("../models/Movies");
const Cinema = require("../models/Cinema")

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.setHeader('node', 'me-mata');
    return res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
});
// Método post para crear una nueva Película.
router.post('/create', async (req, res, next) => {
  try {


    const newMovie = new Movie({
      title: req.body.title,
      director: req.body.director,
      year: req.body.year,
      genre: req.body.genre,
    });

    const createdMovie = await newMovie.save();

    console.log('Peli creada--->', createdMovie);

    return res.status(200).json(createdMovie);

  } catch (error) {
    next(error);
  }
});

// Método PUT para  modificar una película.

router.put('/add-movie', async (req, res, next)=>{
  try{
    const { movieId} = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
    
      { new: true }
  );

  return res.status(200).json(updatedMovie);

} catch (error) {
  return next(error);
}
});


// DELETE Method
router.delete('/delete/:id', async (req, res, next) => {
  try{
    const{ id } =req.params;

    const deleted = await Movie.findByIdAndDelete(id);

    if(deleted) {
      return res.status(200).json({message: 'Movie deleted succesfully!', data: deleted });
    } else {
      return res.status(404).json(`Can't find movie`);
    }
  } catch (error) {
    return next (error);
  }
})


// Encontrar pelicula por el ID



router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);

    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json("No se encuentra la pelicula que buscas");
    }
  } catch (error) {
    return next(error);
  }
});
// filtrar por title

router.get('/:title', async (req, res) => {
  try {
    const {
      title
    } = req.params;
    const movie = await Movie.find({
      title: title
    });
    console.log('movie--->', movie);

    return res.status(200).json(movie);
  } catch (error) {
    return next(error);
  }
});


//filtrar peliculas por genero

router.get('/genre/:genre', async (req, res) => {
  try {
    const {genre} = req.params;
    const movie = await Movie.find({
      genre: genre
    });
    console.log('movie--->', movie);

    return res.status(200).json(movie);
  } catch (error) {
    return next(error);
  }
});

//filtrar peliculas por año
router.get("/search", async (req, res, next) => {
  try {
  

    const {year} = req.params;
    const movies = await Movies.find({
       year: { $gt: year },
     });
    console.log(movies);

    return res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
});




module.exports = router;