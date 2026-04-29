import cors from "cors";
import express from "express";
import { userRoutes } from "./routes/user.js";
import { zapRoutes } from "./routes/zap.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("api/v1/user", userRoutes);
app.use("api/v1/zap", zapRoutes);

app.listen(3000, () => console.log("server started"));
