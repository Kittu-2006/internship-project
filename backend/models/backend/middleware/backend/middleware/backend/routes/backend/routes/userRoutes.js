const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const User = require('../models/User');

const router = express.Router();

// Get current user profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = req.user.toObject();
    delete user.password;
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Update profile (skills, certifications, workExperience)
router.put('/me', authMiddleware, async (req, res) => {
  const { skills, certifications, workExperience } = req.body;
  try {
    const user = req.user;
    if (skills) user.skills = skills;
    if (certifications) user.certifications = certifications;
    if (workExperience) user.workExperience = workExperience;
    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Upload resume (PDF)
router.post('/me/resume', authMiddleware, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const user = req.user;
    user.resumeUrl = `/uploads/resumes/${req.file.filename}`;
    await user.save();
    res.json({ message: 'Resume uploaded successfully', resumeUrl: user.resumeUrl });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading resume' });
  }
});

module.exports = router;