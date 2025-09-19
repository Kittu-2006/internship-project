const express = require('express');
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');
const Internship = require('../models/Internship');

const router = express.Router();

// Get all internships (any role)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const internships = await Internship.find().populate('postedBy', 'name email');
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching internships' });
  }
});

// Get internship by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id).populate('postedBy', 'name email');
    if (!internship) return res.status(404).json({ message: 'Internship not found' });
    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching internship' });
  }
});

// Create internship (placement_cell only)
router.post('/', authMiddleware, authorizeRoles('placement_cell'), async (req, res) => {
  const { title, description, requiredSkills, stipend, applicationDeadline } = req.body;
  try {
    const internship = new Internship({
      title,
      description,
      requiredSkills,
      stipend,
      applicationDeadline,
      postedBy: req.user._id
    });
    await internship.save();
    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ message: 'Error creating internship' });
  }
});

// Update internship (placement_cell only)
router.put('/:id', authMiddleware, authorizeRoles('placement_cell'), async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: 'Internship not found' });
    if (!internship.postedBy.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to update this internship' });
    }
    const { title, description, requiredSkills, stipend, applicationDeadline } = req.body;
    if (title) internship.title = title;
    if (description) internship.description = description;
    if (requiredSkills) internship.requiredSkills = requiredSkills;
    if (stipend) internship.stipend = stipend;
    if (applicationDeadline) internship.applicationDeadline = applicationDeadline;
    await internship.save();
    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: 'Error updating internship' });
  }
});

// Delete internship (placement_cell only)
router.delete('/:id', authMiddleware, authorizeRoles('placement_cell'), async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) return res.status(404).json({ message: 'Internship not found' });
    if (!internship.postedBy.equals(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to delete this internship' });
    }
    await internship.remove();
    res.json({ message: 'Internship deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting internship' });
  }
});

module.exports = router;