import React, { useState } from 'react';
import ManagerProfilePage from './ManagerProfilePage';
import { 
  Search, 
  Plus, 
  ChevronDown, 
  Edit3, 
  User, 
  X,
  Building2,
  Users,
  Shield
} from 'lucide-react';

export default function ManagersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'profile'

  const managersList = [
    {
      id: 'KRM-001',
      name: 'Ahmed Youssef',
      governorate: 'Cairo',
      status: 'Active',
      representatives: 12,
      stadiums: 48,
      players: '1,240',
      lastLogin: '2h ago',
      avatar: '/assets/players/player_ahmed.png'
    },
    {
      id: 'KRM-002',
      name: 'Nour El Din',
      governorate: 'Alexandria',
      status: 'Active',
      representatives: 8,
      stadiums: 32,
      players: '890',
      lastLogin: '1d ago',
      avatar: '/assets/players/player_layla.png'
    },
    {
      id: 'KRM-003',
      name: 'Khaled Mahmoud',
      governorate: 'Giza',
      status: 'Active',
      representatives: 15,
      stadiums: 24,
      players: '750',
      lastLogin: '3h ago',
      avatar: '/assets/players/player_omar.png'
    }
  ];

  if (viewMode === 'profile' && selectedManager) {
    return (
      <ManagerProfilePage 
        manager={selectedManager}
        onBack={() => setViewMode('list')}
      />
    );
  }

  const filteredManagers = managersList.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.governorate.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGov = selectedGovernorate === 'All' || m.governorate === selectedGovernorate;
    const matchesStatus = selectedStatus === 'All' || m.status === selectedStatus;
    return matchesSearch && matchesGov && matchesStatus;
  });

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Title Header & Action */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.01em' }}>
            Representatives Managers
          </h1>
          <p style={{ fontSize: '0.925rem', color: '#6b7280', marginTop: '0.25rem' }}>
            Manage governorate managers and monitor regional KORA operations.
          </p>
        </div>

        <button 
          className="btn-primary" 
          style={{ background: '#4ade80', color: '#052e16', borderRadius: '30px', padding: '0.65rem 1.5rem', fontWeight: 800 }}
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} /> Add Manager
        </button>
      </div>

      {/* Top 7 Summary Stat Cards (Horizontal Row) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        {/* Card 1 */}
        <div className="summary-card" style={{ padding: '1rem' }}>
          <div className="summary-label" style={{ fontSize: '0.65rem' }}>TOTAL MANAGERS</div>
          <div className="summary-value" style={{ fontSize: '1.6rem', marginTop: '0.25rem' }}>
            5 <span style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: 600 }}>/ 27</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="summary-card" style={{ padding: '1rem' }}>
          <div className="summary-label" style={{ fontSize: '0.65rem' }}>ACTIVE</div>
          <div className="summary-value" style={{ fontSize: '1.6rem', color: '#15A036', marginTop: '0.25rem' }}>5</div>
        </div>

        {/* Card 3 */}
        <div className="summary-card" style={{ padding: '1rem' }}>
          <div className="summary-label" style={{ fontSize: '0.65rem' }}>SUSPENDED</div>
          <div className="summary-value" style={{ fontSize: '1.6rem', color: '#dc2626', marginTop: '0.25rem' }}>0</div>
        </div>

        {/* Card 4 */}
        <div className="summary-card" style={{ padding: '1rem' }}>
          <div className="summary-label" style={{ fontSize: '0.65rem' }}>VACANT</div>
          <div className="summary-value" style={{ fontSize: '1.6rem', marginTop: '0.25rem' }}>22</div>
        </div>

        {/* Card 5 */}
        <div className="summary-card" style={{ padding: '1rem' }}>
          <div className="summary-label" style={{ fontSize: '0.65rem' }}>TOTAL REPS</div>
          <div className="summary-value" style={{ fontSize: '1.6rem', marginTop: '0.25rem' }}>64</div>
        </div>

        {/* Card 6 */}
        <div className="summary-card" style={{ padding: '1rem' }}>
          <div className="summary-label" style={{ fontSize: '0.65rem' }}>TOTAL STADIUMS</div>
          <div className="summary-value" style={{ fontSize: '1.6rem', marginTop: '0.25rem' }}>128</div>
        </div>

        {/* Card 7 */}
        <div className="summary-card" style={{ padding: '1rem' }}>
          <div className="summary-label" style={{ fontSize: '0.65rem' }}>TOTAL PLAYERS</div>
          <div className="summary-value" style={{ fontSize: '1.6rem', marginTop: '0.25rem' }}>3.4k</div>
        </div>
      </div>

      {/* Filter & Search Control Bar */}
      <div className="table-card-container" style={{ padding: '0.85rem 1.25rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div className="search-input-wrap" style={{ flex: 1, maxWidth: '340px' }}>
            <Search size={15} />
            <input 
              type="text"
              className="search-input"
              placeholder="Search by Name, Phone, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: '#f8fafc' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <select 
              className="btn-secondary-light" 
              style={{ paddingRight: '2rem', appearance: 'none', background: '#fafafa', borderRadius: '20px', fontSize: '0.8rem' }}
              value={selectedGovernorate}
              onChange={(e) => setSelectedGovernorate(e.target.value)}
            >
              <option value="All">All Governorates ∨</option>
              <option value="Cairo">Cairo</option>
              <option value="Alexandria">Alexandria</option>
              <option value="Giza">Giza</option>
            </select>

            <select 
              className="btn-secondary-light" 
              style={{ paddingRight: '2rem', appearance: 'none', background: '#fafafa', borderRadius: '20px', fontSize: '0.8rem' }}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Statuses ∨</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section Sub-heading */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '1.25rem' }}>
        Assigned Managers
      </h2>

      {/* Assigned Manager Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredManagers.map(mgr => (
          <div key={mgr.id} className="table-card-container" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Left Manager Profile info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #e5e7eb', flexShrink: 0 }}>
                <img src={mgr.avatar} alt={mgr.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginBottom: '0.15rem' }}>{mgr.name}</h3>
                <div style={{ fontSize: '0.825rem', color: '#6b7280', marginBottom: '0.35rem' }}>
                  ID: {mgr.id} • {mgr.governorate}
                </div>
                <span className="summary-pill pill-green" style={{ fontSize: '0.7rem', padding: '0.15rem 0.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#15A036' }}></span> Active
                </span>
              </div>
            </div>

            {/* Metrics Columns */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>REPRESENTATIVES</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginTop: '0.1rem' }}>{mgr.representatives}</div>
              </div>

              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>STADIUMS</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginTop: '0.1rem' }}>{mgr.stadiums}</div>
              </div>

              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>PLAYERS</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginTop: '0.1rem' }}>{mgr.players}</div>
              </div>

              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>LAST LOGIN</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', marginTop: '0.1rem' }}>{mgr.lastLogin}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button 
                className="btn-secondary-light" 
                style={{ borderRadius: '20px', padding: '0.45rem 1.25rem', fontSize: '0.825rem' }}
                onClick={() => alert('Edit manager workflow launched')}
              >
                Edit
              </button>

              <button 
                className="btn-primary" 
                style={{ background: '#4ade80', color: '#052e16', borderRadius: '20px', padding: '0.45rem 1.35rem', fontSize: '0.825rem', fontWeight: 800 }}
                onClick={() => {
                  setSelectedManager(mgr);
                  setViewMode('profile');
                }}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Manager Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Add New Governorate Manager</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Success: Appointed new Governorate Manager.');
              setShowAddModal(false);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>Full Name</label>
                <input type="text" className="search-input" style={{ width: '100%', paddingLeft: '1rem' }} placeholder="e.g. Omar Hassan" required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>Assigned Governorate</label>
                <select className="search-input" style={{ width: '100%', paddingLeft: '1rem' }}>
                  <option value="Cairo">Cairo</option>
                  <option value="Alexandria">Alexandria</option>
                  <option value="Giza">Giza</option>
                  <option value="Dakahlia">Dakahlia</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>Email Address</label>
                <input type="email" className="search-input" style={{ width: '100%', paddingLeft: '1rem' }} placeholder="manager@kora.pro" required />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.75rem' }}>
                <button type="button" className="btn-secondary-light" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ background: '#4ade80', color: '#052e16', fontWeight: 800 }}>Save Manager</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
