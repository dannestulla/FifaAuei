import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import HotmartRoute from "./Routes/HotmartRoute";
import birds from './Routes/birds';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use("/hotmart", HotmartRoute);

app.use("/birds", birds);

/* app.use((error: any, res: Response, next: NextFunction) => {
  try {
    res.status(404).send("Resource not found");
  } catch (error) {
    next(error);
  }
});


app.use((error: any, res: Response, next: NextFunction) => {
  try {
    const status = error.status || 500;
    const message =
      error.message ||
      "There was an error while processing your request, please try again";
    return res.status(status).send({
      status,
      message,
    });
  } catch (error) {
    next(error);
  }
}); */


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;