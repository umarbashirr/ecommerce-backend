import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares for parsing JSON and urlencoded request bodies
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Middleware for cookie parsing

// Routes
import healthCheckRouter from "./routes/healthCheck.routes";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import categoryRouter from "./routes/category.routes";
import brandRouter from "./routes/brand.routes";
import productRouter from "./routes/product.routes";
import wishlistRouter from "./routes/wishlist.routes";

app.use("/api/v1/health", healthCheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/wishlist", wishlistRouter);

export { app };
