// backend/seed.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "./models/User.js";
import Internship from "./models/Internship.js";
import Application from "./models/Application.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/internshipdb";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Clear old data
    await User.deleteMany({});
    await Internship.deleteMany({});
    await Application.deleteMany({});
    console.log("🧹 Cleared existing data");

    // Password hashing
    const hashPassword = async (pw) => await bcrypt.hash(pw, 10);

    // Create admin
    const admin = await User.create({
      name: "Admin User",
      email: "admin@campus.test",
      password: await hashPassword("AdminPass123!"),
      role: "placement_cell",
    });

    // Create mentors
    const mentors = await User.insertMany([
      {
        name: "Mentor One",
        email: "mentor1@campus.test",
        password: await hashPassword("Mentor123!"),
        role: "mentor",
      },
      {
        name: "Mentor Two",
        email: "mentor2@campus.test",
        password: await hashPassword("Mentor123!"),
        role: "mentor",
      },
    ]);

    // Create students
    const students = await User.insertMany([
      {
        name: "Alice Student",
        email: "alice@student.test",
        password: await hashPassword("Student123!"),
        role: "student",
        branch: "CSE",
        year: 3,
        cgpa: 8.5,
        skills: ["React", "Node.js"],
      },
      {
        name: "Bob Student",
        email: "bob@student.test",
        password: await hashPassword("Student123!"),
        role: "student",
        branch: "ECE",
        year: 4,
        cgpa: 8.0,
        skills: ["Python", "ML"],
      },
    ]);

    // Create internships
    const internships = await Internship.insertMany([
      {
        title: "Frontend Developer Intern",
        department: "CSE",
        stipend: 8000,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        conversion: true,
        skills: ["React", "JavaScript"],
        postedBy: admin._id,
      },
      {
        title: "AI Research Intern",
        department: "ECE",
        stipend: 10000,
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        conversion: false,
        skills: ["Python", "ML"],
        postedBy: admin._id,
      },
    ]);

    // Create one application per student
    const applications = [];
    for (let i = 0; i < students.length; i++) {
      const internship = internships[i % internships.length];
      const app = await Application.create({
        student: students[i]._id,
        internship: internship._id,
        status: "Pending",
      });
      applications.push(app);
    }

    console.log("🎉 Seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
