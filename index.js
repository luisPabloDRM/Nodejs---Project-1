const express = require('express');
const passport = require('passport'); 
const indexRouter = require('./routes/index.routes');
const movieRouter = require('./routes/movie.routes');
const authRoutes = require ('./routes/auth.routes');
const cinemaRoutes = require ('./routes/cinema.routes');
require('./auth/register.strategy');


const { connectToDb } = require('./config/db');
connectToDb();

const PORT = 3000;
const server = express();

server.use(passport.initialize());

server.use(express.json());

server.use(express.urlencoded({extended: false }));

server.use('/', indexRouter);
server.use('/movie', movieRouter);
server.use('/auth', authRoutes);
server.use('/cinema', cinemaRoutes);

server.use((error, req, res, next)=>{

    const status = error.status || 500;
    const message = error.message || 'Unexpected error! ';

    return res.status(status).json(message);
});

const serverCallback = () => {
    console.log(`Servidor arrancado en http://localhost:${PORT}`);
}

server.listen(PORT, serverCallback);