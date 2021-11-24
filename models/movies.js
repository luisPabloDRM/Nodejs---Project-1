const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: String
    },
    year: {
        type: Number
    },
    genre: {
        type: String
    },

}, {
    timestamps: true
});

const movie = mongoose.model('Movies', movieSchema);

module.exports = movie;
