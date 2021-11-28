const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cinemaSchema = new Schema(
    {
    name: { type: String, required: true },
    location: { type: String },
    
    movies: { type: mongoose.Types.ObjectId, ref: 'Movies' },
    
    }, 
    {
    timestamps: true}
);

const Cinema = mongoose.model('Cinemas', cinemaSchema);

module.exports = Cinema;