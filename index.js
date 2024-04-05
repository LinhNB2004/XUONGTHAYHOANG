import express from "express";
import router from "./routes/index.js";
import mongoose from "mongoose";
import cors from "cors";
import { errorHandler, errorHandlerNotFound } from "./utils/errorHandlers.js";
import { PORT } from "./utils/env.js";
import connect from "./utils/connect.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

connect();
// Error handling 404

app.use(errorHandlerNotFound, errorHandler);

app.listen(PORT || 8000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
