import React, { useState } from 'react';
import StadiumDetailsPage from './StadiumDetailsPage';
import EditStadiumFormPage from './EditStadiumFormPage';
import { 
  Building2, 
  CheckCircle, 
  Ban, 
  Calendar, 
  Banknote, 
  Search, 
  ChevronDown, 
  SlidersHorizontal, 
  Plus, 
  MapPin, 
  User, 
  ChevronLeft, 
  ChevronRight,
  X,
  Star
} from 'lucide-react';

export default function StadiumsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const [selectedStadium, setSelectedStadium] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'details' | 'edit'
  const [currentPage, setCurrentPage] = useState(1);

  const stadiumsList = [
    {
      id: 'STAD-8924',
      name: 'Al Salam Premium Arena',
      owner: 'Ahmed Hassan',
      status: 'Active',
      rating: '4.8',
      hourlyRate: '300 EGP/hr',
      location: 'Riyadh, KSA',
      type: '11 vs 11 Grass',
      totalBookings: '1,248',
      image: '/assets/stadiums/hero_stadium_render.png'
    },
    {
      id: 'STD-201',
      name: 'Zayed Sports Complex',
      owner: 'KORA Group',
      status: 'Suspending',
      rating: '4.2',
      hourlyRate: '600 EGP/hr',
      location: 'Giza, Sheikh Zayed',
      type: '5v5',
      totalBookings: '0',
      image: '/assets/stadiums/stadium_zayed.png'
    },
    {
      id: 'STD-202',
      name: 'Maadi Elite Pitches',
      owner: 'Elite Sports Co.',
      status: 'Active',
      rating: '4.9',
      hourlyRate: '1200 EGP/hr',
      location: 'Cairo, Maadi',
      type: '11v11',
      totalBookings: '4,892',
      image: '/assets/stadiums/stadium_maadi.png'
    }
  ];

  if (viewMode === 'edit') {
    return (
      <EditStadiumFormPage 
        stadium={selectedStadium}
        onBack={() => setViewMode(selectedStadium ? 'details' : 'list')}
        onSave={() => setViewMode(selectedStadium ? 'details' : 'list')}
      />
    );
  }

  if (viewMode === 'details' && selectedStadium) {
    return (
      <StadiumDetailsPage 
        stadium={selectedStadium}
        onBack={() => setViewMode('list')}
        onOpenEdit={() => setViewMode('edit')}
      />
    );
  }

  const filteredStadiums = stadiumsList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGov = selectedGovernorate === 'All' || s.location.includes(selectedGovernorate);
    const matchesType = selectedType === 'All' || s.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || s.status === selectedStatus;
    return matchesSearch && matchesGov && matchesType && matchesStatus;
  });

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Title Header & Action */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.01em' }}>
          Stadium Management
        </h1>
        <p style={{ fontSize: '0.925rem', color: '#6b7280', marginTop: '0.25rem', marginBottom: '1.25rem' }}>
          Manage all football stadiums registered on the KORA platform.
        </p>

        <button 
          className="btn-primary" 
          style={{ background: '#15A036', borderRadius: '30px', padding: '0.6rem 1.35rem' }}
          onClick={() => {
            setSelectedStadium(null);
            setViewMode('edit');
          }}
        >
          <Plus size={16} /> Register staduim
        </button>
      </div>

      {/* 5 Top Summary Stat Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)', 
        gap: '1.25rem', 
        marginBottom: '2rem' 
      }}>
        {/* Card 1: TOTAL STADIUMS */}
        <div className="summary-card">
          <div className="summary-card-top">
            <div className="summary-label" style={{ fontSize: '0.675rem' }}>TOTAL STADIUMS</div>
            <Building2 size={18} style={{ color: '#15A036' }} />
          </div>
          <div className="summary-card-bottom">
            <div className="summary-value" style={{ fontSize: '2.1rem' }}>1,248</div>
          </div>
        </div>

        {/* Card 2: ACTIVE */}
        <div className="summary-card">
          <div className="summary-card-top">
            <div className="summary-label" style={{ fontSize: '0.675rem' }}>ACTIVE</div>
            <CheckCircle size={18} style={{ color: '#15A036' }} />
          </div>
          <div className="summary-card-bottom">
            <div className="summary-value" style={{ fontSize: '2.1rem' }}>1,102</div>
          </div>
        </div>

        {/* Card 3: SUSPENDED */}
        <div className="summary-card">
          <div className="summary-card-top">
            <div className="summary-label" style={{ fontSize: '0.675rem' }}>SUSPENDED</div>
            <Ban size={18} style={{ color: '#dc2626' }} />
          </div>
          <div className="summary-card-bottom">
            <div className="summary-value" style={{ fontSize: '2.1rem' }}>22</div>
          </div>
        </div>

        {/* Card 4: TODAY'S BOOKINGS */}
        <div className="summary-card">
          <div className="summary-card-top">
            <div className="summary-label" style={{ fontSize: '0.675rem' }}>TODAY'S BOOKINGS</div>
            <Calendar size={18} style={{ color: '#15A036' }} />
          </div>
          <div className="summary-card-bottom">
            <div className="summary-value" style={{ fontSize: '2.1rem' }}>3,491</div>
          </div>
        </div>

        {/* Card 5: REVENUE TODAY */}
        <div className="summary-card">
          <div className="summary-card-top">
            <div className="summary-label" style={{ fontSize: '0.675rem' }}>REVENUE TODAY</div>
            <Banknote size={18} style={{ color: '#15A036' }} />
          </div>
          <div className="summary-card-bottom">
            <div className="summary-value" style={{ fontSize: '1.85rem' }}>2.4M <span style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600 }}>EGP</span></div>
          </div>
        </div>
      </div>

      {/* Filters & Search Control Bar */}
      <div className="table-card-container" style={{ padding: '0.85rem 1.25rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#4b5563', marginRight: '0.2rem' }}>Filters:</span>
            
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <select 
                className="btn-secondary-light" 
                style={{ paddingRight: '2rem', appearance: 'none', background: '#fafafa', borderRadius: '20px', fontSize: '0.8rem' }}
                value={selectedGovernorate}
                onChange={(e) => setSelectedGovernorate(e.target.value)}
              >
                <option value="All">Governorate ∨</option>
                <option value="Cairo">Cairo</option>
                <option value="Giza">Giza</option>
                <option value="Riyadh">Riyadh</option>
              </select>
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <select 
                className="btn-secondary-light" 
                style={{ paddingRight: '2rem', appearance: 'none', background: '#fafafa', borderRadius: '20px', fontSize: '0.8rem' }}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="All">City ∨</option>
                <option value="Sheikh Zayed">Sheikh Zayed</option>
                <option value="Maadi">Maadi</option>
                <option value="Riyadh">Riyadh</option>
              </select>
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <select 
                className="btn-secondary-light" 
                style={{ paddingRight: '2rem', appearance: 'none', background: '#fafafa', borderRadius: '20px', fontSize: '0.8rem' }}
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">Stadium Type ∨</option>
                <option value="5v5">5v5</option>
                <option value="7v7">7v7</option>
                <option value="11v11">11v11</option>
              </select>
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <select 
                className="btn-secondary-light" 
                style={{ paddingRight: '2rem', appearance: 'none', background: '#fafafa', borderRadius: '20px', fontSize: '0.8rem' }}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">Status ∨</option>
                <option value="Active">Active</option>
                <option value="Suspending">Suspending</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, justifyContent: 'flex-end', maxWidth: '480px' }}>
            <div className="search-input-wrap" style={{ width: '100%' }}>
              <Search size={15} />
              <input 
                type="text"
                className="search-input"
                placeholder="Search stadiums, owners, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ background: '#f8fafc' }}
              />
            </div>

            <button className="btn-secondary-light" style={{ borderRadius: '20px' }}>
              <SlidersHorizontal size={14} /> Filter
            </button>
          </div>
        </div>
      </div>

      {/* Stadium Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {filteredStadiums.slice((currentPage - 1) * 2, currentPage * 2).map(stadium => (
          <div key={stadium.id} className="table-card-container" style={{ padding: '1.25rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {/* Left Photo Thumbnail */}
            <div style={{ position: 'relative', width: '250px', height: '145px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
              <img src={stadium.image} alt={stadium.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              
              {/* Rating Badge */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(4px)',
                color: 'white',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <Star size={12} style={{ color: '#4ade80', fill: '#4ade80' }} />
                <span>{stadium.rating}</span>
              </div>
            </div>

            {/* Right Card Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '145px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827' }}>{stadium.name}</h3>
                    <span className={`summary-pill ${stadium.status === 'Active' ? 'pill-green' : 'pill-red'}`} style={{
                      background: stadium.status === 'Active' ? '#e6f4ea' : '#fce8e6',
                      color: stadium.status === 'Active' ? '#137333' : '#c5221f',
                      padding: '0.2rem 0.6rem'
                    }}>
                      {stadium.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>
                    {stadium.hourlyRate.split(' ')[0]} <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280' }}>EGP/hr</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.825rem', color: '#6b7280', marginBottom: '1rem' }}>
                  <User size={13} />
                  <span>Owned by: {stadium.owner}</span>
                </div>
              </div>

              {/* Sub-grid Specs */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                paddingTop: '0.85rem',
                borderTop: '1px solid #f3f4f6'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                  <div>
                    <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>Location</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginTop: '0.15rem' }}>
                      <MapPin size={13} className="text-green" />
                      <span>{stadium.location}</span>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>Type</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginTop: '0.15rem' }}>
                      <img src="/assets/stadiums/pitch_format_icon.png" alt="Pitch Format Icon" style={{ width: '15px', height: '15px', objectFit: 'contain' }} />
                      <span>{stadium.type}</span>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>Total Bookings</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827', marginTop: '0.15rem' }}>
                      {stadium.totalBookings}
                    </div>
                  </div>
                </div>

                <button 
                  className="btn-primary" 
                  style={{ background: '#15A036', borderRadius: '30px', padding: '0.45rem 1.4rem', fontSize: '0.8rem' }}
                  onClick={() => {
                    setSelectedStadium(stadium);
                    setViewMode('details');
                  }}
                >
                  VIEW
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'white', borderRadius: '30px', border: '1px solid #e5e7eb' }}>
        <button 
          className="btn-secondary-light" 
          style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        >
          <ChevronLeft size={14} /> Previous
        </button>

        <div className="pagination-controls">
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
        </div>

        <button 
          className="btn-secondary-light" 
          style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
          onClick={() => setCurrentPage(p => Math.min(12, p + 1))}
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
