import mongoose from "mongoose";

/**
 * Connects to the MongoDB database using the provided MONGO_URI environment variable.
 * @returns {Promise<void>} A promise that resolves when the connection is successful.
 * @throws {Error} If there is an error connecting to the database.
 */
/**
 * Connects to the MongoDB database.
 * @returns {Promise<void>} A promise that resolves when the connection is established.
 */

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export { connectDB };
