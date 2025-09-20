import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

export default function PlacementCellDashboard() {
  const { user } = useAuth();
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPlacements() {
      try {
        setLoading(true);
        const res = await api.get('/placement/placements');
        setPlacements(res.data);
      } catch (err) {
        setError('Failed to load placements');
      } finally {
        setLoading(false);
      }
    }
    fetchPlacements();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name} (Placement Cell)</h1>
      {loading && <p>Loading placement records...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div>
          {placements.length === 0 ? (
            <p>No placement records available.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">Student Name</th>
                  <th className="border border-gray-300 p-2">Company</th>
                  <th className="border border-gray-300 p-2">Position</th>
                  <th className="border border-gray-300 p-2">Date Placed</th>
                </tr>
              </thead>
              <tbody>
                {placements.map((placement) => (
                  <tr key={placement._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{placement.studentName}</td>
                    <td className="border border-gray-300 p-2">{placement.company}</td>
                    <td className="border border-gray-300 p-2">{placement.position}</td>
                    <td className="border border-gray-300 p-2">{new Date(placement.datePlaced).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}