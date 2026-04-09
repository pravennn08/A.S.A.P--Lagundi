import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/connectDB.js";
import { initSocket } from "./socket/socket.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { notFound } from "./middlewares/notFoundMiddleware.js";
import { logger } from "./middlewares/loggerMiddleware.js";
import { authRouter } from "./routes/authRouter.js";
import { reportRouter } from "./routes/reportRouter.js";
import { scheduleRouter } from "./routes/scheduleRouter.js";
import { userRouter } from "./routes/userRouter.js";
import http from "http";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
initSocket(server);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger);
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "server", "uploads")),
);

app.use("/api/auth", authRouter);
app.use("/api/report", reportRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api", userRouter);

app.use(errorHandler);
app.use(notFound);

connectDB().then(() => {
  server.listen(PORT, () =>
    console.log(`Server is running on port:${PORT}`.green.bold),
  );
});
