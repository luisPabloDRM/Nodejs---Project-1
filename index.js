const express = require('express');


const { connectToDb } = require('./config/db');
connectToDb();

const PORT = 3000;
const server = express();
const indexRouter = require('./routes/index.routes');
const movieRouter = require('./routes/movie.routes');
const titleRouter = require('./routes/movie.routes');


server.use('title', titleRouter);
server.use('/movie', movieRouter);
server.use('/', indexRouter);
const serverCallback = () => {
    console.log(`Servidor arrancado en http://localhost:${PORT}`);
}

server.listen(PORT, serverCallback);