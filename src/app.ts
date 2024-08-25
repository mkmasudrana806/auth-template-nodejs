import { NextFunction, Request, Response } from "express";
import express from "express";
import cors from "cors";
import { ApiRoutes } from "./app/routes";

const app = express();

// parsers (middleware)
app.use(express.json());
app.use(cors({ origin: "http://localhost:5000" }));

// api routes (middleware)
app.use("/api", ApiRoutes);

// base api route
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running...");
});

// not found route
app.use("*", (req: Request, res: Response) => {
  res.status(404).send("Route not found!");
});

// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  
  res.status(500).json(err);
   
});
export default app;
