import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.js';

function formatDate(timestamp) {
  if (!timestamp?.toDate) return '—';
  return timestamp.toDate().toLocaleDateString();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');
}

export default function AdminRequestsTab() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'requests'), (snapshot) => {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRequests(items);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateDoc(doc(db, 'requests', id), { status });
  };

  return (
    <div>
      <h1>Property requests</h1>

      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Budget</th>
              <th>Area</th>
              <th>Details</th>
              <th>Submitted</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r.id}>
                <td data-label="Name">{r.name}</td>
                <td data-label="Contact">
                  <a href={isEmail(r.contact) ? `mailto:${r.contact}` : `tel:${r.contact}`}>
                    {r.contact}
                  </a>
                </td>
                <td data-label="Budget">{r.budget}</td>
                <td data-label="Area">{r.area}</td>
                <td className="admin-table-details" data-label="Details">{r.details}</td>
                <td data-label="Submitted">{formatDate(r.createdAt)}</td>
                <td data-label="Status">
                  <select
                    className="admin-status-select"
                    value={r.status || 'new'}
                    onChange={(e) => handleStatusChange(r.id, e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}