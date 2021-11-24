const express = require('express');
const indexRouter = require('./routes/index.routes');
const characterRouter = require('./routes/movie.routes');

const { connectToDb } = require('./config/db');
connectToDb();

const PORT = 3000;
const server = express();

server.use('/', indexRouter);
server.use('/characters', characterRouter);

const serverCallback = () => {
    console.log(`Servidor arrancado en http://localhost:${PORT}`);
}

server.listen(PORT, serverCallback);