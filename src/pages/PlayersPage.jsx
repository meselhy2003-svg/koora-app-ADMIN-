import React, { useState } from 'react';
import PlayerDetailsPage from './PlayerDetailsPage';
import PlayerBookingHistoryPage from './PlayerBookingHistoryPage';
import EditPlayerFormPage from './EditPlayerFormPage';

import { 
  Users, 
  Radio, 
  TrendingUp, 
  Gavel, 
  Search, 
  SlidersHorizontal, 
  Download, 
  Plus, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  X,
  Check
} from 'lucide-react';

export default function PlayersPage({ onOpenPlayerModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'details' | 'booking-history' | 'edit'

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterPosition, setFilterPosition] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const [playersData, setPlayersData] = useState([
    {
      id: '#KRA-92831',
      name: 'Ahmed El-Sayed',
      governorate: 'Cairo',
      position: 'FWD',
      skillRating: 4,
      status: 'ACTIVE',
      regDate: 'Oct 12, 2023',
      avatar: '/assets/players/player_ahmed.png'
    },
    {
      id: '#KRA-44210',
      name: 'Layla Hassan',
      governorate: 'Alexandria',
      position: 'MID',
      skillRating: 3,
      status: 'ACTIVE',
      regDate: 'Nov 05, 2023',
      avatar: '/assets/players/player_layla.png'
    },
    {
      id: '#KRA-10294',
      name: 'Omar Ibrahim',
      governorate: 'Giza',
      position: 'GK',
      skillRating: 5,
      status: 'ACTIVE',
      regDate: 'Jan 20, 2024',
      avatar: '/assets/players/player_omar.png'
    },
    {
      id: '#KRA-88273',
      name: 'Mostafa Khalil',
      governorate: 'Mansoura',
      position: 'DEF',
      skillRating: 2,
      status: 'SUSPENDED',
      regDate: 'Dec 15, 2023',
      avatar: '/assets/players/player_mostafa.png'
    }
  ]);

  // Real CSV Export Handler
  const handleExportCSV = () => {
    const headers = ['Player ID', 'Name', 'Governorate', 'Position', 'Skill Rating', 'Status', 'Registration Date'];
    const rows = playersData.map(p => [
      p.id,
      `"${p.name}"`,
      `"${p.governorate}"`,
      p.position,
      p.skillRating,
      p.status,
      `"${p.regDate}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kora_players_registry_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeletePlayer = (playerId) => {
    setPlayersData(prev => prev.filter(p => p.id !== playerId));
    setViewMode('list');
  };

  if (viewMode === 'edit') {
    return (
      <EditPlayerFormPage 
        player={selectedPlayer}
        onBack={() => setViewMode(selectedPlayer ? 'details' : 'list')}
        onSave={() => setViewMode(selectedPlayer ? 'details' : 'list')}
      />
    );
  }

  if (viewMode === 'booking-history') {
    return (
      <PlayerBookingHistoryPage 
        player={selectedPlayer}
        onBack={() => setViewMode('details')}
      />
    );
  }

  if (viewMode === 'details' && selectedPlayer) {
    return (
      <PlayerDetailsPage 
        player={selectedPlayer} 
        onBack={() => setViewMode('list')} 
        onOpenBookingHistory={() => setViewMode('booking-history')}
        onOpenEdit={() => setViewMode('edit')}
        onDeletePlayer={() => handleDeletePlayer(selectedPlayer.id)}
      />
    );
  }

  const filteredPlayers = playersData.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.governorate.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPos = filterPosition === 'All' || p.position === filterPosition;
    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchesSearch && matchesPos && matchesStatus;
  });

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          style={{ 
            color: i <= rating ? '#15A036' : '#D1D5DB',
            fontSize: '1.1rem',
            marginRight: '2px' 
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      {/* Title Header Bar */}
      <div className="module-header">
        <div className="module-title-area">
          <h1>Players</h1>
          <p>Manage all registered players across the KORA platform.</p>
        </div>

        <div className="module-controls">
          <button className="btn-secondary-light" onClick={handleExportCSV}>
            <Download size={15} /> Export CSV
          </button>
          <button 
            className="btn-primary" 
            onClick={() => {
              setSelectedPlayer(null);
              setViewMode('edit');
            }}
          >
            <Plus size={16} /> Register Player
          </button>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="players-summary-grid">
        <div className="summary-card">
          <div className="summary-card-top">
            <div className="summary-icon-box">
              <Users size={18} />
            </div>
            <span className="summary-pill pill-green">TOTAL</span>
          </div>
          <div className="summary-card-bottom">
            <div className="summary-label">TOTAL PLAYERS</div>
            <div className="summary-value">124,802</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-top">
            <div className="summary-icon-box">
              <Radio size={18} />
            </div>
            <span className="summary-pill pill-green">LIVE</span>
          </div>
          <div className="summary-card-bottom">
            <div className="summary-label">ACTIVE PLAYERS</div>
            <div className="summary-value">98,450</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-top">
            <div className="summary-icon-box">
              <TrendingUp size={18} />
            </div>
            <span className="summary-pill pill-green">+12%</span>
          </div>
          <div className="summary-card-bottom">
            <div className="summary-label">NEW THIS MONTH</div>
            <div className="summary-value">+1,240</div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-top">
            <div className="summary-icon-box">
              <Gavel size={18} />
            </div>
            <span className="summary-pill pill-red">ACTION REQ</span>
          </div>
          <div className="summary-card-bottom">
            <div className="summary-label">SUSPENDED</div>
            <div className="summary-value">125</div>
          </div>
        </div>
      </div>

      {/* Table Container Card */}
      <div className="table-card-container">
        {/* Search & Filter Bar */}
        <div className="table-filter-bar">
          <div className="search-input-wrap">
            <Search size={16} />
            <input 
              type="text"
              className="search-input"
              placeholder="Search by name, ID, or governorate..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="btn-secondary-light" onClick={() => setShowFilterModal(true)}>
            <SlidersHorizontal size={15} /> Filter {(filterPosition !== 'All' || filterStatus !== 'All') && '(Active)'}
          </button>
        </div>

        {/* Data Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th>PLAYER</th>
              <th>PLAYER ID</th>
              <th>GOVERNORATE</th>
              <th>POSITION</th>
              <th>SKILL</th>
              <th>STATUS</th>
              <th>REG. DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player) => (
              <tr key={player.id}>
                <td>
                  <div className="player-cell">
                    <img 
                      src={player.avatar} 
                      alt={player.name} 
                      className="player-avatar-circle"
                      onError={(e) => { e.target.src = '/assets/landing/card_players.png'; }}
                    />
                    <span className="font-bold">{player.name}</span>
                  </div>
                </td>
                <td>
                  <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>{player.id}</span>
                </td>
                <td>{player.governorate}</td>
                <td>
                  <span className="pos-badge">{player.position}</span>
                </td>
                <td>{renderStars(player.skillRating)}</td>
                <td>
                  <span className={`status-capsule ${player.status === 'ACTIVE' ? 'active' : 'suspended'}`}>
                    {player.status}
                  </span>
                </td>
                <td>
                  <span style={{ color: '#4b5563', fontSize: '0.85rem' }}>{player.regDate}</span>
                </td>
                <td>
                  <button 
                    className="action-eye-btn" 
                    onClick={() => {
                      setSelectedPlayer(player);
                      setViewMode('details');
                    }}
                    title="View Full Profile Dossier"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="table-pagination">
          <div>Showing 1 - {filteredPlayers.length} of 124,802 players</div>

          <div className="pagination-controls">
            <button className="page-btn arrow" onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
              <ChevronLeft size={14} />
            </button>
            <button className={`page-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>1</button>
            <button className={`page-btn ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>2</button>
            <button className={`page-btn ${currentPage === 3 ? 'active' : ''}`} onClick={() => setCurrentPage(3)}>3</button>
            <span style={{ margin: '0 0.2rem', color: '#9ca3af' }}>...</span>
            <button className={`page-btn ${currentPage === 12 ? 'active' : ''}`} onClick={() => setCurrentPage(12)}>12</button>
            <button className="page-btn arrow" onClick={() => setCurrentPage(p => Math.min(12, p + 1))}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="modal-overlay" onClick={() => setShowFilterModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ fontSize: '1.2rem' }}>Filter Players</h3>
              <button className="modal-close" onClick={() => setShowFilterModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Position
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['All', 'FWD', 'MID', 'GK', 'DEF'].map(pos => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setFilterPosition(pos)}
                      style={{
                        padding: '0.35rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        border: filterPosition === pos ? 'none' : '1px solid #e5e7eb',
                        background: filterPosition === pos ? '#15A036' : '#f9fafb',
                        color: filterPosition === pos ? 'white' : '#4b5563',
                        cursor: 'pointer'
                      }}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  Account Status
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['All', 'ACTIVE', 'SUSPENDED'].map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setFilterStatus(st)}
                      style={{
                        flex: 1,
                        padding: '0.35rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        border: filterStatus === st ? 'none' : '1px solid #e5e7eb',
                        background: filterStatus === st ? '#15A036' : '#f9fafb',
                        color: filterStatus === st ? 'white' : '#4b5563',
                        cursor: 'pointer'
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button 
                  className="btn-secondary-light" 
                  onClick={() => {
                    setFilterPosition('All');
                    setFilterStatus('All');
                  }}
                >
                  Reset Filters
                </button>
                <button className="btn-primary" onClick={() => setShowFilterModal(false)}>
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Geographic Distribution Dark Chart Section */}
      <div className="dark-chart-card">
        <h2 className="chart-title">Geographic Distribution</h2>
        <p className="chart-subtitle">Concentration of talent across all governorates</p>

        <div className="bars-container">
          <div className="bar-item">
            <div className="bar-fill" style={{ height: '85%' }}></div>
            <span className="bar-label">CAIRO</span>
          </div>
          <div className="bar-item">
            <div className="bar-fill" style={{ height: '55%' }}></div>
            <span className="bar-label">ALEX</span>
          </div>
          <div className="bar-item">
            <div className="bar-fill" style={{ height: '42%' }}></div>
            <span className="bar-label">GIZA</span>
          </div>
          <div className="bar-item">
            <div className="bar-fill" style={{ height: '65%' }}></div>
            <span className="bar-label">DAKHLIA</span>
          </div>
          <div className="bar-item">
            <div className="bar-fill" style={{ height: '32%' }}></div>
            <span className="bar-label">MINYA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
