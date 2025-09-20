import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["student", "mentor", "placement_cell"], required: true },
  branch: String,
  year: Number,
  cgpa: Number,
  skills: [String],
});

export default mongoose.model("User", userSchema);
