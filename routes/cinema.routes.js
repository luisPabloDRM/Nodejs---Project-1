const express = require("express");
const Cinema = require("../models/Cinema");

const router = express.Router();
// GET METHOD 
router.get("/cinema", async (req, res, next) => {
  try {
    const cinemas = await Cinema.find();
    res.setHeader('node', 'me-mata');
    return res.status(200).json(cinemas);
  } catch (error) {
    return next(error);
  }
});
// Método post para crear una nueva Película.
router.post('/create', async (req, res, next) => {
  try {


    const newCinema = new Cinema({
      name: req.body.name,
      location: req.body.location,
      movies: req.body.movies,
      
    });

    const createdCinema = await newCinema.saveCinema
    console.log('cinema created--->', createdCinema);

    return res.status(200).json(createdCinema);

  } catch (error) {
    next(error);
  }
});

// Método PUT para  modificar una película.

router.put('/add-cinema', async (req, res, next)=>{
  try{
    const { cinemaId} = req.body;

    const updatedCinema = await Cinema.findByIdAndUpdate(
      cinemaId,
    
      { new: true }
  );

  return res.status(200).json(updatedCinema);

} catch (error) {
  return next(error);
}
});


// DELETE Method
router.delete('/delete/:id', async (req, res, next) => {
  try{
    const{ id } =req.params;

    const deleted = await Cinema.findByIdAndDelete(id);

    if(deleted) {
      return res.status(200).json({message: 'Cinema deleted succesfully!', data: deleted });
    } else {
      return res.status(404).json(`Can't find cinema`);
    }
  } catch (error) {
    return next (error);
  }
})




module.exports = router;