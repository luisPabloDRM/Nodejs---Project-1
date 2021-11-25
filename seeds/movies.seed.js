const mongoose = require('mongoose');
const Movie = require('../models/Movies');
const { DB_URL, CONFIG_DB } = require('../config/db');

const moviesArray = [
    {
      title: 'The Matrix',
      director: 'Hermanas Wachowski',
      year: 1999,
      genre: 'Acción',
    },
    {
      title: 'The Matrix Reloaded',
      director: 'Hermanas Wachowski',
      year: 2003,
      genre: 'Acción',
    },
    {
      title: 'Buscando a Nemo',
      director: 'Andrew Stanton',
      year: 2003,
      genre: 'Animación',
    },
    {
      title: 'Buscando a Dory',
      director: 'Andrew Stanton',
      year: 2016,
      genre: 'Animación',
    },
    {
      title: 'Interestelar',
      director: 'Christopher Nolan',
      year: 2014,
      genre: 'Ciencia ficción',
    },
    {
      title: '50 primeras citas',
      director: 'Peter Segal',
      year: 2004,
      genre: 'Comedia romántica',
    },
  ];

  const movieDocument = moviesArray.map(movie=> new Movie(movie))

mongoose.connect(DB_URL, CONFIG_DB)
    .then(async () => {
        console.log('Ejecutando seed de Moviess...');
        
        const allMoviess = await Movie.find();
        console.log(allMoviess)

        if (allMoviess.length) { 
            await Movie.collection.drop();
            console.log('Colección Moviess eliminada con éxito');
        }
    })
    .catch(error => console.log('Error buscando en la DB', error))
    .then(async () => {
       
        await Movie.insertMany(moviesArray);
        console.log('Añadidos nuevos personajes a DB');
    })
    .catch(error => console.log('Error añadiendo peliculas nuevas', error))
    
    .finally(() => mongoose.disconnect());
