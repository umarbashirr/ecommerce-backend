import { app } from "./app";
import { connectDB } from "./db";
import { config } from "dotenv";

// Load environment variables
config({
  path: "../.env",
});

const port = process.env.PORT || 5000; // Default port to listen

// Connect to MongoDB
connectDB()
  .then(() =>
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
  )
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
