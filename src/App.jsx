import React, { useState } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import EcosystemGrid from './components/EcosystemGrid';
import PlatformGlance from './components/PlatformGlance';
import Footer from './components/Footer';

import PlayersPage from './pages/PlayersPage';
import StadiumsPage from './pages/StadiumsPage';
import ManagersPage from './pages/ManagersPage';
import RepresentativesPage from './pages/RepresentativesPage';

import { X, Bell, CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);

  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerPosition, setNewPlayerPosition] = useState('Forward (ST)');
  const [newPlayerTeam, setNewPlayerTeam] = useState('');

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;
    alert(`Success: Registered player "${newPlayerName}" (${newPlayerPosition}) into KORA Central Database.`);
    setNewPlayerName('');
    setNewPlayerTeam('');
    setShowAddPlayerModal(false);
  };

  return (
    <div className="app-container">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenNotifications={() => setShowNotifications(!showNotifications)}
      />

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <>
            <HeroBanner />
            <EcosystemGrid onNavigate={(tabId) => setActiveTab(tabId)} />
            <PlatformGlance />
          </>
        )}

        {activeTab === 'players' && (
          <PlayersPage onOpenPlayerModal={() => setShowAddPlayerModal(true)} />
        )}

        {activeTab === 'stadiums' && (
          <StadiumsPage />
        )}

        {activeTab === 'managers' && (
          <ManagersPage />
        )}

        {activeTab === 'representatives' && (
          <RepresentativesPage />
        )}
      </main>

      <Footer />

      {/* Notifications Drawer */}
      {showNotifications && (
        <div className="modal-overlay" onClick={() => setShowNotifications(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bell size={20} className="text-green" />
                <h3 className="modal-title" style={{ fontSize: '1.15rem' }}>Platform System Alerts</h3>
              </div>
              <button className="modal-close" onClick={() => setShowNotifications(false)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ background: '#f0fdf4', padding: '0.85rem', borderRadius: '12px', border: '1px solid #bbf7d0', display: 'flex', gap: '0.6rem' }}>
                <CheckCircle2 size={18} style={{ color: '#16a34a', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>14 Stadium Approvals Processed</div>
                  <div style={{ fontSize: '0.775rem', color: '#4b5563' }}>King Fahd & Lusail arenas synchronized successfully.</div>
                </div>
              </div>

              <div style={{ background: '#fffbe8', padding: '0.85rem', borderRadius: '12px', border: '1px solid #fde68a', display: 'flex', gap: '0.6rem' }}>
                <AlertCircle size={18} style={{ color: '#d97706', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>38 Pending Inspection Logs</div>
                  <div style={{ fontSize: '0.775rem', color: '#4b5563' }}>Field Representatives submitted 12 new logs in Zone A.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Player Modal */}
      {showAddPlayerModal && (
        <div className="modal-overlay" onClick={() => setShowAddPlayerModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Register New Player</h3>
              <button className="modal-close" onClick={() => setShowAddPlayerModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddPlayer} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Full Player Name
                </label>
                <input 
                  type="text" 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '1rem' }} 
                  placeholder="e.g. Cristiano Ronaldo"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Position
                </label>
                <select 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '1rem' }}
                  value={newPlayerPosition}
                  onChange={(e) => setNewPlayerPosition(e.target.value)}
                >
                  <option value="Forward (ST)">Forward (ST)</option>
                  <option value="Winger (LW/RW)">Winger (LW/RW)</option>
                  <option value="Midfielder (CAM/CM)">Midfielder (CAM/CM)</option>
                  <option value="Defender (CB/LB/RB)">Defender (CB/LB/RB)</option>
                  <option value="Goalkeeper (GK)">Goalkeeper (GK)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Team / Organization
                </label>
                <input 
                  type="text" 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '1rem' }} 
                  placeholder="e.g. Al-Nassr / KORA Academy"
                  value={newPlayerTeam}
                  onChange={(e) => setNewPlayerTeam(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button 
                  type="button" 
                  className="btn-secondary-outline" 
                  onClick={() => setShowAddPlayerModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save & Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
