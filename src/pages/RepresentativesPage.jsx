import React, { useState } from 'react';
import { Search, Plus, ClipboardCheck, MapPin, CheckCircle, Clock } from 'lucide-react';

export default function RepresentativesPage() {
  const [search, setSearch] = useState('');

  const reps = [
    {
      id: 'REP-701',
      name: 'Sarah Al-Hassan',
      fieldZone: 'Riyadh Zone A',
      activeVisits: 4,
      lastInspection: '12 mins ago',
      status: 'On Field Visit',
      image: '/assets/landing/card_representatives.png'
    },
    {
      id: 'REP-702',
      name: 'Marcus Vance',
      fieldZone: 'Dubai Sports City',
      activeVisits: 2,
      lastInspection: '1 hour ago',
      status: 'On Field Visit',
      image: '/assets/landing/card_representatives.png'
    },
    {
      id: 'REP-703',
      name: 'Ahmed Qasim',
      fieldZone: 'Jeddah Coastal Zone',
      activeVisits: 0,
      lastInspection: 'Yesterday',
      status: 'Inspection Completed',
      image: '/assets/landing/card_representatives.png'
    }
  ];

  const filtered = reps.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.fieldZone.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="module-header">
        <div className="module-title-area">
          <h1>Field Operations & Field Representatives</h1>
          <p>Real-time inspection logs, dynamic field task dispatch, and GPS verification.</p>
        </div>

        <div className="module-controls">
          <div className="search-input-wrap">
            <Search size={16} />
            <input 
              type="text"
              className="search-input"
              placeholder="Search field rep or zone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="btn-primary" onClick={() => alert('Assign Field Mission workflow started.')}>
            <Plus size={16} /> Assign Mission
          </button>
        </div>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Field Representative</th>
              <th>Assigned Field Zone</th>
              <th>Active Field Visits</th>
              <th>Last Inspection Log</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(rep => (
              <tr key={rep.id}>
                <td>
                  <div className="player-cell">
                    <img src={rep.image} alt={rep.name} className="player-avatar-img" />
                    <div>
                      <div className="font-bold">{rep.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{rep.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={13} className="text-green" />
                    <span>{rep.fieldZone}</span>
                  </div>
                </td>
                <td><strong>{rep.activeVisits}</strong> Visits Active</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#6b7280' }}>
                    <Clock size={13} />
                    <span>{rep.lastInspection}</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${rep.status.includes('Visit') ? 'badge-info' : 'badge-success'}`}>
                    <CheckCircle size={12} />
                    {rep.status}
                  </span>
                </td>
                <td>
                  <button className="btn-secondary-outline" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                    View Logs
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
