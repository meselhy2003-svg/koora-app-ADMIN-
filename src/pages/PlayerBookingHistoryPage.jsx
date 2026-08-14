import React, { useState } from 'react';
import { 
  ArrowLeft, 
  PauseCircle, 
  CheckCircle2, 
  Trash2, 
  FileText, 
  CheckCircle, 
  Calendar, 
  XCircle, 
  Search, 
  ChevronDown, 
  SlidersHorizontal, 
  MapPin, 
  CreditCard, 
  ChevronLeft, 
  ChevronRight,
  Users
} from 'lucide-react';

export default function PlayerBookingHistoryPage({ player, onBack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStadium, setSelectedStadium] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const playerName = player?.name || 'Ahmed El-Sayed';
  const playerId = player?.id || '#KRA-92831';

  const bookings = [
    {
      id: 'BK-101',
      stadiumName: 'Al Salam Stadium',
      location: 'Cairo, Nasr City',
      status: 'UPCOMING',
      date: 'Oct 24, 2024',
      time: '20:00 - 22:00',
      matchType: '5v5 Match',
      teamBadge: 'FC',
      teamName: 'Nasr City FC',
      financials: '850 EGP',
      paymentMethod: 'Visa',
      bookedBy: 'Player',
      playersCount: 10,
      stadiumImage: '/assets/players/Stadium Visual.png'
    },
    {
      id: 'BK-102',
      stadiumName: 'Cairo International',
      location: 'Cairo, Heliopolis',
      status: 'COMPLETED',
      date: 'Oct 18, 2024',
      time: '18:00 - 19:30',
      matchType: '7v7 Match',
      teamBadge: 'RE',
      teamName: 'Red Eagles',
      financials: '1,200 EGP',
      paymentMethod: 'Vodafone Cash',
      bookedBy: 'Captain',
      playersCount: 14,
      stadiumImage: '/assets/players/Stadium Visual.png'
    },
    {
      id: 'BK-103',
      stadiumName: 'Zayed Sports Complex',
      location: 'Giza, Sheikh Zayed',
      status: 'CANCELLED',
      date: 'Oct 15, 2024',
      time: '21:00 - 23:00',
      matchType: '11v11 Match',
      teamBadge: 'ZA',
      teamName: 'Zayed Allstars',
      financials: 'Refunded',
      paymentMethod: 'Visa',
      bookedBy: 'Player',
      playersCount: 22,
      stadiumImage: '/assets/players/Stadium Visual.png'
    }
  ];

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.stadiumName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.teamName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStadium = selectedStadium === 'All' || b.stadiumName.includes(selectedStadium);
    const matchesStatus = selectedStatus === 'All' || b.status === selectedStatus;
    return matchesSearch && matchesStadium && matchesStatus;
  });

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Top Title & Control Header Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="icon-button" 
            onClick={onBack} 
            title="Back to Player Profile"
            style={{ background: 'white' }}
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#111827' }}>
                {playerName}
              </h1>
              <span className="status-capsule active" style={{ fontSize: '0.7rem', padding: '0.2rem 0.65rem' }}>
                ACTIVE
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.1rem' }}>
              ID: {playerId}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="btn-secondary-light" style={{ borderRadius: '30px' }} onClick={() => alert('Suspend account')}>
            <PauseCircle size={15} /> Suspend
          </button>
          
          <button className="btn-primary" style={{ borderRadius: '30px', background: '#15A036' }} onClick={() => alert('Activate account')}>
            <CheckCircle2 size={16} /> Activate
          </button>

          <button 
            className="icon-button" 
            style={{ color: '#dc2626', borderColor: '#fee2e2', background: '#fef2f2' }}
            title="Delete Record"
            onClick={() => alert('Delete record')}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Page Title & Subtitle */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827' }}>Player Booking History</h2>
        <p style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.2rem' }}>
          View all bookings made by this player.
        </p>
      </div>

      {/* 4 Summary Cards Row */}
      <div className="players-summary-grid" style={{ marginBottom: '2rem' }}>
        {/* Card 1: Total Bookings */}
        <div className="summary-card">
          <div className="summary-card-top">
            <div className="summary-icon-box">
              <FileText size={18} />
            </div>
          </div>
          <div className="summary-card-bottom">
            <div className="summary-label">Total Bookings</div>
            <div className="summary-value">142</div>
          </div>
        </div>

        {/* Card 2: Completed */}
        <div className="summary-card">
          <div className="summary-card-top">
            <div className="summary-icon-box" style={{ color: '#15A036', background: '#e6f4ea' }}>
              <CheckCircle size={18} />
            </div>
          </div>
          <div className="summary-card-bottom">
            <div className="summary-label">Completed</div>
            <div className="summary-value">128</div>
          </div>
        </div>

        {/* Card 3: Upcoming */}
        <div className="summary-card">
          <div className="summary-card-top">
            <div className="summary-icon-box">
              <Calendar size={18} />
            </div>
          </div>
          <div className="summary-card-bottom">
            <div className="summary-label">Upcoming</div>
            <div className="summary-value">4</div>
          </div>
        </div>

        {/* Card 4: Cancelled */}
        <div className="summary-card">
          <div className="summary-card-top">
            <div className="summary-icon-box" style={{ color: '#dc2626', background: '#fce8e6' }}>
              <XCircle size={18} />
            </div>
          </div>
          <div className="summary-card-bottom">
            <div className="summary-label">Cancelled</div>
            <div className="summary-value">10</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar Container */}
      <div className="table-card-container" style={{ padding: '1rem 1.25rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="search-input-wrap" style={{ maxWidth: '320px' }}>
            <Search size={16} />
            <input 
              type="text"
              className="search-input"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <select 
                className="btn-secondary-light" 
                style={{ paddingRight: '2rem', appearance: 'none', background: '#fafafa' }}
                value={selectedStadium}
                onChange={(e) => setSelectedStadium(e.target.value)}
              >
                <option value="All">All Dates</option>
                <option value="This Month">This Month</option>
                <option value="Last Month">Last Month</option>
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', pointerEvents: 'none', color: '#6b7280' }} />
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <select 
                className="btn-secondary-light" 
                style={{ paddingRight: '2rem', appearance: 'none', background: '#fafafa' }}
                value={selectedStadium}
                onChange={(e) => setSelectedStadium(e.target.value)}
              >
                <option value="All">All Stadiums</option>
                <option value="Al Salam">Al Salam Stadium</option>
                <option value="Cairo International">Cairo International</option>
                <option value="Zayed Sports">Zayed Sports Complex</option>
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', pointerEvents: 'none', color: '#6b7280' }} />
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <select 
                className="btn-secondary-light" 
                style={{ paddingRight: '2rem', appearance: 'none', background: '#fafafa' }}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="UPCOMING">UPCOMING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', pointerEvents: 'none', color: '#6b7280' }} />
            </div>

            <button className="icon-button" style={{ background: 'white' }} title="More Filters">
              <SlidersHorizontal size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* 3 Booking Cards Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '1.5rem',
        marginBottom: '2.5rem' 
      }}>
        {filteredBookings.map((bk) => (
          <div key={bk.id} className="table-card-container" style={{ padding: '1.25rem' }}>
            {/* Card Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img 
                  src={bk.stadiumImage} 
                  alt={bk.stadiumName} 
                  style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover' }}
                />
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', lineHeight: 1.2 }}>{bk.stadiumName}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.775rem', color: '#6b7280', marginTop: '0.15rem' }}>
                    <MapPin size={12} className="text-green" />
                    <span>{bk.location}</span>
                  </div>
                </div>
              </div>

              <span className={`summary-pill ${
                bk.status === 'UPCOMING' ? 'pill-purple' : bk.status === 'COMPLETED' ? 'pill-green' : 'pill-red'
              }`} style={{
                background: bk.status === 'UPCOMING' ? '#f3e8ff' : bk.status === 'COMPLETED' ? '#e6f4ea' : '#fce8e6',
                color: bk.status === 'UPCOMING' ? '#7e22ce' : bk.status === 'COMPLETED' ? '#137333' : '#c5221f',
                padding: '0.25rem 0.6rem',
                fontSize: '0.65rem'
              }}>
                {bk.status}
              </span>
            </div>

            {/* Row 1: Date & Match Type */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '1rem', 
              paddingTop: '1rem', 
              borderTop: '1px solid #f3f4f6',
              marginBottom: '1rem'
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>Date & Time</div>
                <div style={{ 
                  fontSize: '0.85rem', 
                  fontWeight: 800, 
                  color: bk.status === 'CANCELLED' ? '#9ca3af' : '#111827',
                  textDecoration: bk.status === 'CANCELLED' ? 'line-through' : 'none',
                  marginTop: '0.2rem' 
                }}>
                  {bk.date}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{bk.time}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>Match Type</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginTop: '0.2rem' }}>
                  <span>⚽</span>
                  <span>{bk.matchType}</span>
                </div>
              </div>
            </div>

            {/* Row 2: Team */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Team</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  background: '#f3f4f6', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  color: '#4b5563',
                  border: '1px solid #e5e7eb'
                }}>
                  {bk.teamBadge}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>{bk.teamName}</span>
              </div>
            </div>

            {/* Row 3: Financials & Metadata */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '1rem', 
              paddingTop: '1rem', 
              borderTop: '1px solid #f3f4f6'
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>Financials</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827', marginTop: '0.15rem' }}>{bk.financials}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: '#6b7280', marginTop: '0.1rem' }}>
                  <CreditCard size={12} />
                  <span>{bk.paymentMethod}</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>Metadata</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginTop: '0.15rem' }}>
                  Booked by: {bk.bookedBy}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.1rem' }}>
                  {bk.playersCount} Players
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Bar */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
        <div className="pagination-controls">
          <button className="page-btn arrow">
            <ChevronLeft size={14} />
          </button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <span style={{ margin: '0 0.2rem', color: '#9ca3af' }}>...</span>
          <button className="page-btn">12</button>
          <button className="page-btn arrow">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
