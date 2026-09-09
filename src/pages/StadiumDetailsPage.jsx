import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Globe, 
  Edit3, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Zap,
  Car,
  Bath,
  Sun
} from 'lucide-react';

export default function StadiumDetailsPage({ stadium, onBack, onOpenEdit }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const stadiumName = stadium?.name || 'Al Salam Premium Arena';
  const stadiumId = stadium?.id || 'STAD-8924';
  const stadiumLoc = stadium?.location || 'Riyadh, KSA';
  const stadiumImage = '/assets/stadiums/hero_stadium_render.png';
  const stadiumRate = stadium?.hourlyRate || '300 EGP/hr';
  const stadiumFormat = stadium?.type || '11 vs 11 Grass';

  const matches = [
    {
      id: '#89-2830',
      type: '7v7',
      status: 'Processing',
      teamName: 'Cairo United',
      captain: 'Ahmed Hassan (C)',
      date: 'Oct 24, 2024',
      time: '20:00 - 21:00 (60 min)',
      arena: stadiumName,
      price: '850 EGP',
      paymentMethod: 'VISA'
    },
    {
      id: '#89-2841',
      type: '5v5',
      status: 'Upcoming',
      teamName: 'Zamalek Kings',
      captain: 'Mahmoud Fathy (C)',
      date: 'Oct 25, 2024',
      time: '17:00 - 18:30 (90 min)',
      arena: stadiumName,
      price: '1,200 EGP',
      paymentMethod: 'CASH'
    },
    {
      id: '#89-2856',
      type: '11v11',
      status: 'Completed',
      teamName: 'Maadi FC',
      captain: 'Tarek Ziad (C)',
      date: 'Oct 23, 2024',
      time: '16:00 - 18:00 (120 min)',
      arena: 'Al Salam Main Pitch',
      price: '2,500 EGP',
      paymentMethod: 'BANK TX'
    }
  ];

  const filteredMatches = matches.filter(m => {
    const matchesSearch = m.teamName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatusFilter === 'All' || m.status === selectedStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Top Header Title Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onBack && (
            <button className="icon-button" onClick={onBack} title="Back to Stadiums List" style={{ background: 'white' }}>
              <ArrowLeft size={18} />
            </button>
          )}

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#111827' }}>
                {stadiumName}
              </h1>
              <span className="summary-pill pill-green" style={{ fontSize: '0.7rem', padding: '0.2rem 0.65rem' }}>
                Active
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <MapPin size={13} className="text-green" />
              <span>{stadiumLoc} • ID: {stadiumId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Large Hero Banner */}
      <div style={{ 
        position: 'relative', 
        height: '320px', 
        borderRadius: '20px', 
        overflow: 'hidden', 
        marginBottom: '1.5rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
        background: 'linear-gradient(135deg, #0d131f 0%, #1f2937 100%)'
      }}>
        <img src={stadiumImage} alt={stadiumName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: '16px', right: '16px', cursor: 'pointer' }}>
          <img src="/assets/stadiums/camera_button.png" alt="Camera Button" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
        </div>
      </div>

      {/* Gallery Section */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827' }}>Gallery</h3>
          <button style={{ fontSize: '0.825rem', fontWeight: 700, color: '#15A036' }}>View All →</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          <div style={{ height: '100px', borderRadius: '12px', overflow: 'hidden' }}>
            <img src="/assets/landing/hero_stadium.png" alt="Pitch" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ height: '100px', borderRadius: '12px', overflow: 'hidden' }}>
            <img src="/assets/stadiums/stadium_zayed.png" alt="Locker Room" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ height: '100px', borderRadius: '12px', overflow: 'hidden' }}>
            <img src="/assets/stadiums/stadium_maadi.png" alt="Floodlights" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ 
            height: '100px', 
            borderRadius: '12px', 
            border: '2px dashed #d1d5db', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: '#fafafa',
            color: '#6b7280',
            cursor: 'pointer'
          }}>
            <Plus size={24} />
          </div>
        </div>
      </div>

      {/* 2-Column Info Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem', marginBottom: '2.5rem' }}>
        {/* Left Column: Basic Info & Ownership */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Basic Info */}
          <div className="table-card-container" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1rem', fontWeight: 800 }}>
              <img src="/assets/stadiums/basic_info_icon.png" alt="Basic Info Icon" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
              <span>Basic Information</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Type</span>
                <span style={{ fontWeight: 700, color: '#111827' }}>{stadiumFormat}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Price</span>
                <span style={{ fontWeight: 700, color: '#111827' }}>{stadiumRate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#6b7280' }}>Assigned Rep</span>
                <span style={{ fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <User size={13} className="text-green" /> Omar Ibrahim
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#6b7280' }}>Managed Rep</span>
                <span style={{ fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <User size={13} className="text-green" /> Ahmed Mazen
                </span>
              </div>
            </div>
          </div>

          {/* Ownership Card */}
          <div className="table-card-container" style={{ padding: '1.5rem', background: '#fafafa' }}>
            <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#6b7280', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              OWNERSHIP
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e6f4ea', color: '#15A036', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                AH
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#111827' }}>Ahmed Hassan</div>
                <span className="summary-pill pill-green" style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem' }}>VENUE OWNER</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.825rem', color: '#4b5563' }}>
              <div><strong style={{ color: '#6b7280' }}>Email:</strong> ahmed.h@sportinvest.sa</div>
              <div><strong style={{ color: '#6b7280' }}>Password:</strong> 1234*&amp;*&amp;*$%^126</div>
              <div><strong style={{ color: '#6b7280' }}>Phone:</strong> +201254987656</div>
            </div>
          </div>
        </div>

        {/* Right Column: Location & Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Location Card */}
          <div className="table-card-container" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1rem', fontWeight: 800 }}>
              <MapPin size={16} className="text-green" /> Location
            </div>

            <div style={{ height: '140px', borderRadius: '12px', background: '#e5e7eb', marginBottom: '0.85rem', overflow: 'hidden', position: 'relative' }}>
              <img src="/assets/stadiums/location_map.png" alt="Location Map" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <img src="/assets/stadiums/map_pin_icon.png" alt="Map Pin Icon" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginBottom: '0.75rem' }}>
              King Fahd Road, Al Olaya District, Riyadh 12211, Saudi Arabia
            </div>

            <button className="btn-secondary-light" style={{ width: '100%', justifyContent: 'center', borderRadius: '8px', fontSize: '0.8rem' }} onClick={() => window.open('https://maps.google.com')}>
              🗺 View on Google Maps
            </button>
          </div>

          {/* Features & About Card */}
          <div className="table-card-container" style={{ padding: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>Features</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.825rem', color: '#374151', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <img src="/assets/stadiums/feature_floodlights.png" alt="Floodlights" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                <span>Floodlights</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <img src="/assets/stadiums/feature_parking.png" alt="Parking" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                <span>Parking</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <img src="/assets/stadiums/feature_restrooms.png" alt="Restrooms" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                <span>Restrooms</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <img src="/assets/stadiums/feature_grass.png" alt="Artificial grass" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
                <span>Artificial grass</span>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#111827', marginBottom: '0.35rem' }}>About</div>
            <p style={{ fontSize: '0.825rem', color: '#6b7280', lineHeight: 1.5 }}>
              Premium football facility equipped with modern LED floodlights, professional synthetic turf, changing rooms, and spectator seating.
            </p>
          </div>
        </div>
      </div>

      {/* Edit Banner Button */}
      <div style={{ marginBottom: '3rem' }}>
        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#15A036', borderRadius: '30px', padding: '0.75rem' }} onClick={onOpenEdit}>
          <Edit3 size={16} /> Edit
        </button>
      </div>

      {/* Bottom Analytics & Matches Section */}
      <div>
        {/* 6 Summary Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
          <div className="summary-card">
            <div className="summary-card-top">
              <div className="summary-label">TOTAL MATCHES</div>
              <Building2 size={16} style={{ color: '#15A036' }} />
            </div>
            <div className="summary-value" style={{ fontSize: '1.8rem' }}>1,248</div>
            <div style={{ fontSize: '0.7rem', color: '#15A036', fontWeight: 700, marginTop: '0.2rem' }}>📈 +12% this month</div>
          </div>

          <div className="summary-card">
            <div className="summary-card-top">
              <div className="summary-label">PROCESSING</div>
              <Zap size={16} style={{ color: '#15A036' }} />
            </div>
            <div className="summary-value" style={{ fontSize: '1.8rem' }}>4</div>
            <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '0.2rem' }}>Currently active matches</div>
          </div>

          <div className="summary-card">
            <div className="summary-card-top">
              <div className="summary-label">UPCOMING</div>
              <Calendar size={16} style={{ color: '#d97706' }} />
            </div>
            <div className="summary-value" style={{ fontSize: '1.8rem' }}>32</div>
            <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '0.2rem' }}>Scheduled next 7 days</div>
          </div>

          <div className="summary-card">
            <div className="summary-card-top">
              <div className="summary-label">COMPLETED</div>
              <CheckCircle2 size={16} style={{ color: '#2563eb' }} />
            </div>
            <div className="summary-value" style={{ fontSize: '1.8rem' }}>1,180</div>
            <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '0.2rem' }}>Successfully finished</div>
          </div>

          <div className="summary-card">
            <div className="summary-card-top">
              <div className="summary-label">CANCELLED</div>
              <XCircle size={16} style={{ color: '#dc2626' }} />
            </div>
            <div className="summary-value" style={{ fontSize: '1.8rem' }}>32</div>
            <div style={{ fontSize: '0.7rem', color: '#dc2626', fontWeight: 700, marginTop: '0.2rem' }}>-2.5% vs last month</div>
          </div>

          <div className="summary-card">
            <div className="summary-card-top">
              <div className="summary-label">STADIUM REVENUE</div>
              <img src="/assets/stadiums/revenue_card_icon.png" alt="Revenue Icon" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
            </div>
            <div className="summary-value" style={{ fontSize: '1.8rem' }}>1.2M <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>EGP</span></div>
            <div style={{ fontSize: '0.7rem', color: '#15A036', fontWeight: 700, marginTop: '0.2rem' }}>75% of monthly target</div>
          </div>
        </div>

        {/* Matches Search & Filter Bar */}
        <div className="table-card-container" style={{ padding: '0.85rem 1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="search-input-wrap" style={{ maxWidth: '320px' }}>
              <Search size={15} />
              <input 
                type="text"
                className="search-input"
                placeholder="Search by Team Name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <select 
                className="btn-secondary-light" 
                style={{ paddingRight: '2rem', appearance: 'none', background: '#fafafa', borderRadius: '8px' }}
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses ∨</option>
                <option value="Processing">Processing</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.825rem', color: '#4b5563' }}>
                <Calendar size={14} /> <span>10/01/2024</span> - <span>10/31/2024</span>
              </div>

              <button className="btn-primary" style={{ background: '#15A036', borderRadius: '8px', padding: '0.45rem 1.2rem', fontSize: '0.825rem' }}>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* 3 Matches List Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {filteredMatches.map(match => (
            <div key={match.id} className="table-card-container" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 700 }}>{match.id}</span>
                  <span className="pos-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <img src="/assets/stadiums/pitch_format_icon.png" alt="Format" style={{ width: '12px', height: '12px', objectFit: 'contain' }} />
                    {match.type}
                  </span>
                  <span className={`summary-pill ${match.status === 'Processing' ? 'pill-green' : match.status === 'Upcoming' ? 'pill-purple' : 'pill-green'}`} style={{
                    background: match.status === 'Processing' ? '#e6f4ea' : match.status === 'Upcoming' ? '#fffbe8' : '#e8f0fe',
                    color: match.status === 'Processing' ? '#137333' : match.status === 'Upcoming' ? '#d97706' : '#1a73e8',
                    fontSize: '0.65rem'
                  }}>
                    {match.status}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', marginBottom: '0.15rem' }}>{match.teamName}</h4>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>👤 {match.captain}</div>
              </div>

              <div style={{ fontSize: '0.825rem', color: '#374151', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <img src="/assets/stadiums/match_date_icon.png" alt="Date Icon" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                  <span>{match.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <img src="/assets/stadiums/match_time_icon.png" alt="Time Icon" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                  <span>{match.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <img src="/assets/stadiums/match_arena_icon.png" alt="Arena Icon" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                  <span>{match.arena}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827' }}>{match.price}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.35rem', fontSize: '0.75rem', color: '#6b7280', marginTop: '0.1rem' }}>
                  {match.paymentMethod === 'VISA' && <img src="/assets/stadiums/payment_visa.png" alt="VISA" style={{ width: '15px', height: '15px', objectFit: 'contain' }} />}
                  {(match.paymentMethod === 'CASH' || match.paymentMethod === 'Vodafone Cash') && <img src="/assets/stadiums/vodafone_cash_icon.png" alt="Vodafone Cash" style={{ width: '15px', height: '15px', objectFit: 'contain' }} />}
                  {match.paymentMethod === 'BANK TX' && <img src="/assets/stadiums/payment_bank.png" alt="BANK TX" style={{ width: '15px', height: '15px', objectFit: 'contain' }} />}
                  <span>{match.paymentMethod}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Bar */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="pagination-controls">
            <button 
              className="page-btn arrow"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              style={{ cursor: 'pointer' }}
            >
              <ChevronLeft size={14} />
            </button>
            {[1, 2, 3].map(p => (
              <button 
                key={p} 
                className={`page-btn ${currentPage === p ? 'active' : ''}`}
                onClick={() => setCurrentPage(p)}
                style={{
                  background: currentPage === p ? '#15A036' : 'transparent',
                  color: currentPage === p ? 'white' : '#111827',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {p}
              </button>
            ))}
            <span style={{ margin: '0 0.2rem', color: '#9ca3af' }}>...</span>
            <button 
              className={`page-btn ${currentPage === 12 ? 'active' : ''}`}
              onClick={() => setCurrentPage(12)}
              style={{
                background: currentPage === 12 ? '#15A036' : 'transparent',
                color: currentPage === 12 ? 'white' : '#111827',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              12
            </button>
            <button 
              className="page-btn arrow"
              onClick={() => setCurrentPage(p => Math.min(12, p + 1))}
              style={{ cursor: 'pointer' }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
