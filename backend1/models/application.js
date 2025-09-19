const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  internship: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Completed'], default: 'Pending' },
  mentorNotes: String,
  feedback: String,
  certificateUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
