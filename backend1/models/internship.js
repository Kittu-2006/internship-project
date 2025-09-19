const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  department: String,
  stipend: Number,
  deadline: Date,
  conversion: { type: Boolean, default: false },
  skills: [{ type: String }],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Internship', InternshipSchema);
