import mongoose from "mongoose";

const uri: string  = process.env.MONGODB_URI || "";

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export async function dbConnect() {
  try {
    const conn = await mongoose.connect(uri, {});

    return conn;
  } catch (error: any) {
    throw new Error(error);
  }
}
