const express = require('express');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');
const Application = require('../models/Application');
const Internship = require('../models/Internship');
const User = require('../models/User');

const router = express.Router();

// Student applies to internship
router.post('/apply/:internshipId', authMiddleware, authorizeRoles('student'), async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.internshipId);
    if (!internship) return res.status(404).json({ message: 'Internship not found' });

    // Check if already applied
    const existingApp = await Application.findOne({ student: req.user._id, internship: internship._id });
    if (existingApp) return res.status(400).json({ message: 'Already applied' });

    const application = new Application({
      student: req.user._id,
      internship: internship._id
    });
    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error applying to internship' });
  }
});

// Get applications for current user (student sees own, mentor and placement_cell see relevant)
router.get('/', authMiddleware, async (req, res) => {
  try {
    let applications;
    if (req.user.role === 'student') {
      applications = await Application.find({ student: req.user._id })
        .populate('internship')
        .sort({ appliedAt: -1 });
    } else if (req.user.role === 'mentor') {
      // For mentor, show applications of students assigned to them (assuming mentor-student relation)
      // For simplicity, show all applications (or you can enhance to filter)
      applications = await Application.find()
        .populate('student', 'name email')
        .populate('internship')
        .sort({ appliedAt: -1 });
    } else if (req.user.role === 'placement_cell') {
      // Show all applications for internships posted by this placement cell user
      const internships = await Internship.find({ postedBy: req.user._id }).select('_id');
      const internshipIds = internships.map(i => i._id);
      applications = await Application.find({ internship: { $in: internshipIds } })
        .populate('student', 'name email')
        .populate('internship')
        .sort({ appliedAt: -1 });
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Mentor or placement_cell updates application status and mentor notes
router.put('/:id', authMiddleware, authorizeRoles('mentor', 'placement_cell'), async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });

    const { status, mentorNotes } = req.body;
    if (status && ['applied', 'approved', 'rejected'].includes(status)) {
      application.status = status;
    }
    if (mentorNotes !== undefined) {
      application.mentorNotes = mentorNotes;
    }
    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Error updating application' });
  }
});

module.exports = router;