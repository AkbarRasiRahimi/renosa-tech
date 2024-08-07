import mongoose from "mongoose";

const verificationTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 180, // 3 minutes
  },
});

export const VerificationToken =
  mongoose.models.VerificationToken || mongoose.model("VerificationToken", verificationTokenSchema);
