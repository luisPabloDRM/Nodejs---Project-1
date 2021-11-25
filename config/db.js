const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/project01';
const CONFIG_DB = { useNewUrlParser: true, useUnifiedTopology: true };

const connectToDb = async () => {
    try {
      const response = await mongoose.connect(DB_URL, CONFIG_DB);
      const { host, port, name } = response.connection;
      console.log(`Conectado a ${name} en ${host}:${port}`);
    } catch(error) {
      console.log("Error conectando a la DB", error)
    }
};

module.exports = {
    DB_URL,
    CONFIG_DB,
    connectToDb,
  };
  