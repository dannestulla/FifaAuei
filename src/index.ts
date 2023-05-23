import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import FifaRoutes from "./Routes/FifaRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server 2');
});

app.use("/sales", SalesRoute);

app.use("/ads", SalesRoute);

app.get('/daySales', (req, res) => {
  FifaRoutes()
  res.send("")
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;