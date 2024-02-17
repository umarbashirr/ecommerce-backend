import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares for parsing JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares for handling CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Middleware for cookie parsing
app.use(cookieParser());

// Routes
import authRouter from "./routes/auth.routes";
import categoryRouter from "./routes/category.routes";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/categories", categoryRouter);

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    health: "ok",
    message: "Hello from Express! 🎉",
  });
});

export { app };
