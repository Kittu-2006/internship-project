import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

const InternshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/api/internships/${id}`);
        setInternship(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInternship();
  }, [id]);

  const handleApply = async () => {
    try {
      setApplying(true);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      await axios.post(
        `${API}/api/applications`,
        { internshipId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Applied successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="p-6">Loading internship...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!internship) return <div className="p-6">Internship not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2">{internship.title}</h1>
      <p className="text-gray-600 mb-4">{internship.description}</p>

      <div className="mb-4">
        <strong>Skills:</strong>{" "}
        {(internship.skills || []).join(", ") || "Not specified"}
      </div>

      <button
        onClick={handleApply}
        disabled={applying}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        {applying ? "Applying..." : "Apply Now"}
      </button>
    </div>
  );
};

export default InternshipDetail;
