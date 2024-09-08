import dotenv from "dotenv";
dotenv.config();
import express from "express";
import errorHandlerMiddleware from "./middleware/errorHandler.middleware.js";
import userRouter from "./routes/user.route.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import corsMiddleware from "./middleware/cors.middleware.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);
const app = express();
app.use(corsMiddleware);
const PORT = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../uploads")));

app.use("/user", userRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log("app is running in Port ", PORT);
});
