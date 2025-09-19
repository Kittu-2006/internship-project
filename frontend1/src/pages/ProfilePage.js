import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    branch: "",
    year: "",
    cgpa: "",
    skills: "",
    coverLetter: ""
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      Object.keys(profile).forEach((key) => formData.append(key, profile[key]));
      if (resumeFile) formData.append("resume", resumeFile);

      await axios.put(`${API}/api/users/me`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Error saving profile.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {message && <p className="mb-4 text-blue-600">{message}</p>}

      <form onSubmit={handleSave} className="space-y-4">
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Full name"
          className="w-full p-2 border rounded"
        />
        <input
          name="branch"
          value={profile.branch}
          onChange={handleChange}
          placeholder="Branch"
          className="w-full p-2 border rounded"
        />
        <input
          name="year"
          value={profile.year}
          onChange={handleChange}
          placeholder="Year"
          className="w-full p-2 border rounded"
        />
        <input
          name="cgpa"
          value={profile.cgpa}
          onChange={handleChange}
          placeholder="CGPA"
          className="w-full p-2 border rounded"
        />
        <input
          name="skills"
          value={profile.skills}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="coverLetter"
          value={profile.coverLetter}
          onChange={handleChange}
          placeholder="Cover Letter"
          className="w-full p-2 border rounded"
        />

        <input type="file" onChange={handleFile} />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
