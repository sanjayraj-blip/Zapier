import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import cors from "cors";
import express from "express";
import { prismaClient } from "./db/index.js";
import { userRoutes } from "./routes/user.js";
import { zapRoutes } from "./routes/zap.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/zap", zapRoutes);

prismaClient.user
  .count()
  .then(() => {
    console.log("Prisma connection successful");
  })
  .catch((err: any) => {
    console.error("Prisma connection failed:", err);
    process.exit(1);
  });

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log("✓ Press Ctrl+C to stop");
});

server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
