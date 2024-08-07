// model/user-model.js
import RootLayout from "@/app/layout";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  emailVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  displayName: {
    type: String,
    required: false,
  },
  photoURL: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: true,
    default: false,
  },
  password: {
    type: String,
  },
  roles : {
    type: Array,
    default: ["user"],
  }
});


export const User = mongoose.models.User || mongoose.model("User", userSchema);
