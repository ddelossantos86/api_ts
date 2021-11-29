import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const urlLocal = process.env.CONEX_local;

const dbLocal = async () => {
  try {
    await mongoose.connection.openUri(`${urlLocal}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Mongo DB puerto 27017: \x1b[32m%s\x1b[0m', 'online');
  } catch (error) {
    console.log(error + 'Error al iniciar la base de datos:\x1b[41m%s\x1b[0m', 'OffLine');
  }
};
export = {
  dbLocal,
};
