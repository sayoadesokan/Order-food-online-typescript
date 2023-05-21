import express from 'express';
import Database from './services/Database';
import expressApp from './services/expressApp';

const startServer = async () => {
  try {
    const app = express();

    await Database();

    await expressApp(app);

    app.listen(8800, () => {
      console.log(`Listening on port http://localhost:8800`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
