import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import HotmartRoute from "./Routes/HotmartRoute";
import FacebookRoute from "./Routes/FacebookRoute"

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use("/hotmart", HotmartRoute);

app.use("/facebook", FacebookRoute);

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
}); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;