import cookieParser from "cookie-parser";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import morgan from "morgan";

const app = express();

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

// 1. Configuración de los middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// 2. Middleware de nivel de aplicación
app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.get("/error", (req, res) => {
    throw new Error("Error");
  });


// 3. Middleware de errores
app.use((
  err: Error, 
  req: Request, 
  res: Response, 
  next:NextFunction
) => {
  console.log("Error middleware");
  res.status(500).send("Something broke!");
})
