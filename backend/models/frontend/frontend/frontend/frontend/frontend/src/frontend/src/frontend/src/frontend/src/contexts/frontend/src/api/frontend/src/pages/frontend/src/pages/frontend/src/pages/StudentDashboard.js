import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  const { logout } = useAuth();
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const internshipsRes = await api.get('/internships');
      setInternships(internshipsRes.data);

      const applicationsRes = await api.get('/applications');
      setApplications(applicationsRes.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Available Internships</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-4">
            {internships.map(i => (
              <li key={i._id} className="p-4 border rounded">
                <Link to={`/internships/${i._id}`} className="text-lg font-semibold text-blue-600 hover:underline">
                  {i.title}
                </Link>
                <p>Stipend: {i.stipend}</p>
                <p>Deadline: {new Date(i.applicationDeadline).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Applications</h2>
        {loading ? (
          <p>Loading...</p>
        ) : applications.length === 0 ? (
          <p>You have not applied to any internships yet.</p>
        ) : (
          <ul className="space-y-4">
            {applications.map(app => (
              <li key={app._id} className="p-4 border rounded">
                <p><strong>{app.internship.title}</strong></p>
                <p>Status: <span className={
                  app.status === 'approved' ? 'text-green-600' :
                  app.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                }>{app.status}</span></p>
                {app.mentorNotes && <p>Mentor Notes: {app.mentorNotes}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}