import mongoose from "mongoose";

export async function db() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to db`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
