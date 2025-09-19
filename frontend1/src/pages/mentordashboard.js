import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from '../contexts/AuthContext';

export default function MentorDashboard() {
  const { user } = useAuth();
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMentees() {
      try {
        setLoading(true);
        const res = await api.get('/mentor/mentees');
        setMentees(res.data);
      } catch (err) {
        setError('Failed to load mentees');
      } finally {
        setLoading(false);
      }
    }
    fetchMentees();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name} (Mentor)</h1>
      {loading && <p>Loading mentees...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div>
          {mentees.length === 0 ? (
            <p>No mentees assigned yet.</p>
          ) : (
            <ul className="space-y-3">
              {mentees.map((mentee) => (
                <li key={mentee._id} className="border p-3 rounded shadow">
                  <p className="font-semibold">{mentee.name}</p>
                  <p>Email: {mentee.email}</p>
                  <p>Course: {mentee.course || 'N/A'}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}