import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true, // store ONLY hashed password
      minlength: 6,
      select: false, // 🔒 prevents password from being returned in queries
    },
  },
  { timestamps: true }
);


export default mongoose.model("User", userSchema);

