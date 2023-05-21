import express from 'express';
import Database from './services/Database';
import expressApp from './services/expressApp';
import { PORT } from './config/Index';

const startServer = async () => {
  try {
    const app = express();

    await Database();

    await expressApp(app);

    app.listen(PORT, () => {
      console.log(`Listening on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
