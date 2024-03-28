import express from "express";
import router from "./routes/index.js";
import mongoose from "mongoose";
import cors from "cors";
import { errorHandler, errorHandlerNotFound } from "./utils/errorHandlers.js";

const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Xuong").then(() => {
  console.log("Connected to MongoDB!");
});

app.use("/api", router);

// Error handling 404

app.use(errorHandlerNotFound, errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
