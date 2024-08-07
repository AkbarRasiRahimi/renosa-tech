import mongoose from "mongoose";

const resetTokenSchema = new mongoose.Schema({
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
    expires: 1800, // 30 minutes
  },
});

export const ResetToken = mongoose.models.ResetToken || mongoose.model("ResetToken", resetTokenSchema);
