import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  title: String,
  department: String,
  stipend: Number,
  deadline: Date,
  conversion: Boolean,
  skills: [String],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Internship", internshipSchema);
