import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  internship: { type: mongoose.Schema.Types.ObjectId, ref: "Internship" },
  status: { type: String, enum: ["Pending", "Approved", "Rejected", "Completed"], default: "Pending" },
  mentorNotes: String,
});

export default mongoose.model("Application", applicationSchema);
