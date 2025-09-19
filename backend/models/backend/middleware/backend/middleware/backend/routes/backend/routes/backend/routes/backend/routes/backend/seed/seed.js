require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('../config/db');
const User = require('../models/User');
const Internship = require('../models/Internship');
const Application = require('../models/Application');

const seedData = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany({});
  await Internship.deleteMany({});
  await Application.deleteMany({});

  // Create users
  const password = await bcrypt.hash('password123', 10);

  const student = new User({
    name: 'Student User',
    email: 'student@example.com',
    password,
    role: 'student',
    skills: ['JavaScript', 'React'],
    certifications: ['AWS Certified'],
    workExperience: ['Intern at ABC Corp']
  });
  const mentor = new User({
    name: 'Mentor User',
    email: 'mentor@example.com',
    password,
    role: 'mentor'
  });
  const placementCell = new User({
    name: 'Placement Cell',
    email: 'placement@example.com',
    password,
    role: 'placement_cell'
  });

  await student.save();
  await mentor.save();
  await placementCell.save();

  // Create internships
  const internship1 = new Internship({
    title: 'Frontend Developer Intern',
    description: 'Work on React-based frontend projects.',
    requiredSkills: ['JavaScript', 'React'],
    stipend: '1000 USD/month',
    applicationDeadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    postedBy: placementCell._id
  });

  const internship2 = new Internship({
    title: 'Backend Developer Intern',
    description: 'Work on Node.js backend APIs.',
    requiredSkills: ['Node.js', 'Express', 'MongoDB'],
    stipend: '1200 USD/month',
    applicationDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    postedBy: placementCell._id
  });

  await internship1.save();
  await internship2.save();

  // Create application
  const application = new Application({
    student: student._id,
    internship: internship1._id,
    status: 'applied'
  });

  await application.save();

  console.log('Seed data created successfully');
  mongoose.connection.close();
};

seedData().catch(err => {
  console.error('Seed failed:', err);
  mongoose.connection.close();
});