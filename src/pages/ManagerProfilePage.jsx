import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Edit3, 
  Download, 
  PauseCircle, 
  Plus, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Search, 
  ChevronDown, 
  MessageSquare, 
  Eye,
  Star,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';

export default function ManagerProfilePage({ manager, onBack, onOpenStadiumDetails }) {
  const [repSearch, setRepSearch] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [stadiumSearch, setStadiumSearch] = useState('');
  const [pitchTypeFilter, setPitchTypeFilter] = useState('All');
  const [stadiumPage, setStadiumPage] = useState(1);

  const managerName = manager?.name || 'Ahmed Youssef';
  const managerId = manager?.id || 'KRM-001';
  const managerGov = manager?.governorate || 'Cairo';
  const managerAvatar = manager?.avatar || '/assets/players/player_ahmed.png';

  const reps = [
    {
      id: 'REP-101',
      name: 'Tarek Mansour',
      district: 'New Cairo & Rehab',
      phone: '+20 191 234 5678',
      stadiumsCount: 7,
      avatar: '/assets/players/player_ahmed.png'
    },
    {
      id: 'REP-104',
      name: 'Karim El-Shazly',
      district: 'Nasr City Sector',
      phone: '+20 114 567 8901',
      stadiumsCount: 9,
      avatar: '/assets/players/player_omar.png'
    },
    {
      id: 'REP-109',
      name: 'Omar Khaled',
      district: 'Maadi & Degla',
      phone: '+20 122 345 6789',
      stadiumsCount: 10,
      avatar: '/assets/landing/card_managers.png'
    },
    {
      id: 'REP-112',
      name: 'Hany Mostafa',
      district: 'Heliopolis & Sheraton',
      phone: '+20 100 700 0123',
      stadiumsCount: 5,
      avatar: '/assets/players/player_mostafa.png'
    },
    {
      id: 'REP-115',
      name: 'Mahmoud Zaki',
      district: 'Mokattam & Zahraa',
      phone: '+20 115 890 1234',
      stadiumsCount: 6,
      statusBadge: 'On Field Visit',
      avatar: '/assets/landing/card_players.png'
    }
  ];

  const managedStadiums = [
    {
      id: 'STAD-8924',
      name: 'Al Salam Premium Arena',
      status: 'Active',
      district: 'New Cairo',
      type: '11v11 Grass',
      owner: 'Ahmed Hassan',
      rating: '4.9',
      assignedRep: 'Tarek Mansour (REP-101)',
      monthlyRev: '42,500 EGP',
      image: '/assets/stadiums/hero_stadium_render.png'
    },
    {
      id: 'STAD-8841',
      name: 'Champions Camp Arena',
      status: 'Active',
      district: 'Nasr City',
      type: '7v7 Turf',
      owner: 'Mahmoud Samir',
      rating: '4.8',
      assignedRep: 'Karim El-Shazly (REP-104)',
      monthlyRev: '34,200 EGP',
      image: '/assets/stadiums/stadium_zayed.png'
    },
    {
      id: 'STAD-8759',
      name: 'Wadi Degla Sports Hub',
      status: 'Active',
      district: 'Maadi',
      type: '5v5 Turf',
      owner: 'Sherif Kamel',
      rating: '4.7',
      assignedRep: 'Omar Khaled (REP-109)',
      monthlyRev: '28,900 EGP',
      image: '/assets/stadiums/stadium_maadi.png'
    },
    {
      id: 'STAD-8692',
      name: 'Heliopolis Stars Pitch',
      status: 'Active',
      district: 'Heliopolis',
      type: '5v5 & 7v7 Dual',
      owner: 'Essam Abdel-Fattah',
      rating: '4.6',
      assignedRep: 'Hany Mostafa (REP-112)',
      monthlyRev: '31,000 EGP',
      image: '/assets/landing/card_stadiums.png'
    },
    {
      id: 'STAD-8511',
      name: 'Golden Boot Complex',
      status: 'Under Inspection',
      district: 'New Cairo',
      type: '7v7 Turf',
      owner: 'Hossam Shaly',
      rating: 'Awaiting Final Audit',
      assignedRep: 'Tarek Mansour (REP-101)',
      monthlyRev: 'STAGE 2/3 Audit in Progress',
      image: '/assets/landing/hero_stadium.png'
    }
  ];

  const filteredReps = reps.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(repSearch.toLowerCase()) || 
                          r.district.toLowerCase().includes(repSearch.toLowerCase()) ||
                          r.id.toLowerCase().includes(repSearch.toLowerCase());
    const matchesDist = districtFilter === 'All' || r.district.includes(districtFilter);
    return matchesSearch && matchesDist;
  });

  const filteredStadiums = managedStadiums.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(stadiumSearch.toLowerCase()) ||
                          s.owner.toLowerCase().includes(stadiumSearch.toLowerCase()) ||
                          s.district.toLowerCase().includes(stadiumSearch.toLowerCase());
    const matchesType = pitchTypeFilter === 'All' || s.type.includes(pitchTypeFilter);
    return matchesSearch && matchesType;
  });

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Top Back Link */}
      <button 
        onClick={onBack} 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.4rem', 
          fontSize: '0.85rem', 
          fontWeight: 700, 
          color: '#4b5563', 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer',
          marginBottom: '1rem'
        }}
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* Main Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.01em' }}>
          Manager Profile: {managerName}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="btn-secondary-light" style={{ borderRadius: '8px' }} onClick={() => alert('Edit Manager Info')}>
            <Edit3 size={15} /> Edit Info
          </button>
          <button className="btn-secondary-light" style={{ borderRadius: '8px' }} onClick={() => alert('Exporting Manager Report CSV...')}>
            <Download size={15} /> Export Report
          </button>
          <button className="btn-secondary-light" style={{ borderRadius: '8px', color: '#dc2626', borderColor: '#fee2e2', background: '#fef2f2' }} onClick={() => alert('Suspend Manager')}>
            <PauseCircle size={15} /> Suspend
          </button>
          <button className="btn-primary" style={{ borderRadius: '8px', background: '#15A036' }} onClick={() => alert('Assign Field Representative workflow')}>
            <Plus size={16} /> + Assign Representative
          </button>
        </div>
      </div>

      {/* Badges Sub-Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
        <span className="btn-primary" style={{ background: '#15A036', padding: '0.3rem 0.85rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
          Active Manager
        </span>
        <span className="btn-secondary-light" style={{ borderRadius: '20px', padding: '0.3rem 0.85rem', fontSize: '0.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <img src="/assets/managers/location_pin_green.png" alt="Location" style={{ width: '13px', height: '13px', objectFit: 'contain' }} />
          <span>{managerGov} Governorate •</span>
        </span>
        <span style={{ background: '#1f2937', color: 'white', padding: '0.3rem 0.85rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
          ID: {managerId}
        </span>
      </div>

      {/* 6 Top KPI Stat Cards Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(6, 1fr)', 
        gap: '1rem', 
        marginBottom: '2.5rem' 
      }}>
        {/* Card 1: TERRITORY HUB */}
        <div className="summary-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.65rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', lineHeight: 1.25 }}>
              <span>TERRITORY</span>
              <span>HUB</span>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src="/assets/managers/Icon (1).png" alt="Hub Icon" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827' }}>{managerGov}</div>
        </div>

        {/* Card 2: SUPERVISED REPS */}
        <div className="summary-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.65rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', lineHeight: 1.25 }}>
              <span>SUPERVISED</span>
              <span>REPS</span>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src="/assets/managers/Icon (2).png" alt="Reps Icon" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827' }}>12</div>
        </div>

        {/* Card 3: STADIUMS NETWORK */}
        <div className="summary-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.65rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', lineHeight: 1.25 }}>
              <span>STADIUMS</span>
              <span>NETWORK</span>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src="/assets/managers/Icon (3).png" alt="Stadiums Icon" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827' }}>48 <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>Venues</span></div>
        </div>

        {/* Card 4: ACTIVE PLAYERS */}
        <div className="summary-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.65rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', lineHeight: 1.25 }}>
              <span>ACTIVE</span>
              <span>PLAYERS</span>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src="/assets/managers/Icon (4).png" alt="Players Icon" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827' }}>1,240</div>
        </div>

        {/* Card 5: MONTHLY MATCHES */}
        <div className="summary-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.65rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', lineHeight: 1.25 }}>
              <span>MONTHLY</span>
              <span>MATCHES</span>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src="/assets/managers/Icon (5).png" alt="Matches Icon" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827' }}>3,820</div>
        </div>

        {/* Card 6: REGIONAL GROSS */}
        <div className="summary-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.65rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', lineHeight: 1.25 }}>
              <span>REGIONAL</span>
              <span>GROSS</span>
            </div>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src="/assets/managers/Icon (6).png" alt="Gross Icon" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
            </div>
          </div>
          <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#111827' }}>485,000</div>
        </div>
      </div>

      {/* 2-Column Main Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2rem', marginBottom: '3rem' }}>
        {/* Left Column: Manager Dossier Card */}
        <div className="table-card-container" style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '110px', height: '110px', margin: '0 auto 1.25rem auto' }}>
            <img src={managerAvatar} alt={managerName} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid #15A036' }} />
            <div style={{ position: 'absolute', bottom: '4px', right: '4px', width: '18px', height: '18px', borderRadius: '50%', background: '#15A036', border: '2px solid white' }}></div>
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111827', marginBottom: '0.15rem' }}>{managerName}</h2>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.75rem' }}>• General Manager</div>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ background: '#f3f4f6', color: '#374151', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
              38 Years Old
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.75rem' }}>
            <button 
              className="btn-secondary-light" 
              style={{ 
                padding: '0.5rem 0.6rem', 
                borderRadius: '10px', 
                fontSize: '0.8rem', 
                fontWeight: 700, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.45rem',
                border: '1px solid #e2e8f0',
                background: 'white'
              }} 
              onClick={() => window.open('https://wa.me/201001234567')}
            >
              <MessageSquare size={15} style={{ color: '#a855f7', fill: '#ede9fe' }} />
              <span>WhatsApp</span>
            </button>
            <button 
              className="btn-secondary-light" 
              style={{ 
                padding: '0.5rem 0.6rem', 
                borderRadius: '10px', 
                fontSize: '0.8rem', 
                fontWeight: 700, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.45rem',
                border: '1px solid #e2e8f0',
                background: 'white'
              }} 
              onClick={() => window.open('tel:+201001234567')}
            >
              <Phone size={14} style={{ color: '#db2777', fill: '#fbcfe8' }} />
              <span>Direct Call</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.825rem', textAlign: 'left', borderTop: '1px solid #f3f4f6', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.775rem' }}>
                <img src="/assets/managers/contact_primary_phone.png" alt="Primary Phone" style={{ width: '13px', height: '14px', objectFit: 'contain' }} />
                <span>Primary Phone</span>
              </span>
              <span style={{ fontWeight: 800, color: '#111827', fontSize: '0.825rem', letterSpacing: '0.02em' }}>+20 100 123 4567</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.775rem' }}>
                <img src="/assets/managers/contact_secondary_phone.png" alt="Secondary" style={{ width: '14px', height: '13px', objectFit: 'contain' }} />
                <span>Secondary</span>
              </span>
              <span style={{ fontWeight: 800, color: '#111827', fontSize: '0.825rem', letterSpacing: '0.02em' }}>+20 112 987 6543</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ color: '#6b7280', display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.775rem', lineHeight: 1.15 }}>
                <img src="/assets/managers/contact_email.png" alt="Official Email" style={{ width: '14px', height: '14px', objectFit: 'contain', marginTop: '2px' }} />
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>Official</span>
                  <span>Email</span>
                </span>
              </span>
              <span style={{ fontWeight: 800, color: '#111827', fontSize: '0.825rem', paddingTop: '2px' }}>ahmed.youssef@kora.eg</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.775rem' }}>
                <img src="/assets/managers/contact_national_id.png" alt="National ID" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                <span>National ID</span>
              </span>
              <span style={{ fontWeight: 800, color: '#111827', fontSize: '0.825rem', letterSpacing: '0.02em' }}>28604150102934</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.775rem' }}>
                <img src="/assets/managers/contact_appointed.png" alt="Appointed" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                <span>Appointed</span>
              </span>
              <span style={{ fontWeight: 800, color: '#111827', fontSize: '0.825rem' }}>March 15, 2023</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.775rem' }}>
                <img src="/assets/managers/contact_territory.png" alt="Territory Span" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                <span>Territory Span</span>
              </span>
              <span style={{ fontWeight: 800, color: '#15A036', fontSize: '0.825rem' }}>Cairo Zones (Full)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Supervised Field Representatives */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827' }}>Supervised Field Representatives</h2>
              <span style={{ background: '#f3f4f6', color: '#4b5563', padding: '0.2rem 0.55rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>12</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="search-input-wrap" style={{ maxWidth: '240px' }}>
                <Search size={14} />
                <input 
                  type="text"
                  className="search-input"
                  placeholder="Search representative..."
                  value={repSearch}
                  onChange={(e) => setRepSearch(e.target.value)}
                  style={{ background: '#f8fafc', padding: '0.4rem 0.75rem 0.4rem 2.2rem', fontSize: '0.8rem' }}
                />
              </div>

              <select 
                className="btn-secondary-light" 
                style={{ paddingRight: '1.75rem', appearance: 'none', background: '#fafafa', borderRadius: '8px', fontSize: '0.775rem' }}
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
              >
                <option value="All">All Cairo Districts ∨</option>
                <option value="New Cairo">New Cairo</option>
                <option value="Nasr City">Nasr City</option>
                <option value="Maadi">Maadi</option>
              </select>
            </div>
          </div>

          {/* Reps Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredReps.map(rep => (
              <div key={rep.id} className="table-card-container" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={rep.avatar} alt={rep.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827' }}>{rep.name}</h4>
                      <span style={{ background: '#f3f4f6', color: '#6b7280', padding: '0.15rem 0.45rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 700 }}>
                        {rep.id}
                      </span>
                      {rep.statusBadge && (
                        <span style={{ background: '#fffbe8', color: '#d97706', padding: '0.15rem 0.45rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 700 }}>
                          {rep.statusBadge}
                        </span>
                      )}
                    </div>
                    
                    <div style={{ marginTop: '0.2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#374151', fontSize: '0.775rem', fontWeight: 600 }}>
                        <img src="/assets/managers/location_pin_green_alt.png" alt="District" style={{ width: '11px', height: '13px', objectFit: 'contain' }} />
                        <span>{rep.district}</span>
                        <span style={{ color: '#4b5563', margin: '0 0.15rem' }}>•</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.1rem', letterSpacing: '0.02em' }}>
                        {rep.phone}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>{rep.stadiumsCount}</div>
                    <div style={{ fontSize: '0.65rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>Stadiums</div>
                  </div>

                  <button className="btn-secondary-light" style={{ borderRadius: '8px', padding: '0.4rem 0.85rem', fontSize: '0.75rem' }} onClick={() => alert(`View details for ${rep.name}`)}>
                    View Profile &gt;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Managed Stadiums in Cairo Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827' }}>Managed Stadiums in Cairo</h2>
            <span style={{ background: '#f3f4f6', color: '#4b5563', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>12</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="search-input-wrap" style={{ maxWidth: '280px' }}>
              <Search size={14} />
              <input 
                type="text"
                className="search-input"
                placeholder="Search stadium / owner..."
                value={stadiumSearch}
                onChange={(e) => setStadiumSearch(e.target.value)}
                style={{ background: '#f8fafc', padding: '0.4rem 0.75rem 0.4rem 2.2rem', fontSize: '0.8rem' }}
              />
            </div>

            <select 
              className="btn-secondary-light" 
              style={{ paddingRight: '1.75rem', appearance: 'none', background: '#fafafa', borderRadius: '8px', fontSize: '0.775rem' }}
              value={pitchTypeFilter}
              onChange={(e) => setPitchTypeFilter(e.target.value)}
            >
              <option value="All">All Pitches (5v5, 7v7, 11v11) ∨</option>
              <option value="5v5">5v5 Turf</option>
              <option value="7v7">7v7 Turf</option>
              <option value="11v11">11v11 Grass</option>
            </select>
          </div>
        </div>

        {/* Stadiums List Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {filteredStadiums.slice((stadiumPage - 1) * 2, stadiumPage * 2).map(std => (
            <div key={std.id} className="table-card-container" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ width: '100px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={std.image} alt={std.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginBottom: '0.35rem' }}>{std.name}</h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <span style={{ background: '#f3f4f6', color: '#6b7280', padding: '0.15rem 0.55rem', borderRadius: '6px', fontSize: '0.675rem', fontWeight: 700 }}>
                      {std.id}
                    </span>
                    <span className={`summary-pill ${std.status === 'Active' ? 'pill-green' : 'pill-red'}`} style={{
                      background: std.status === 'Active' ? '#137333' : '#f3f4f6',
                      color: std.status === 'Active' ? 'white' : '#4b5563',
                      fontSize: '0.675rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.65rem'
                    }}>
                      {std.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#4b5563', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#137333', fontWeight: 600 }}>
                      <img src="/assets/managers/location_pin_green_alt.png" alt="District" style={{ width: '11px', height: '13px', objectFit: 'contain' }} />
                      <span>{std.district}</span>
                    </span>
                    <span style={{ color: '#9ca3af' }}>•</span>
                    <span>Type: {std.type}</span>
                    <span style={{ color: '#9ca3af' }}>•</span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#4b5563', marginBottom: '0.3rem' }}>
                    Owner: {std.owner} <span style={{ color: '#9ca3af', margin: '0 0.3rem' }}>•</span> <span style={{ color: '#15A036', fontWeight: 700 }}>☆ {std.rating}</span>
                  </div>

                  <div style={{ fontSize: '0.775rem', color: '#6b7280' }}>
                    Assigned Rep: <span style={{ fontWeight: 800, color: '#111827' }}>{std.assignedRep}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#111827', lineHeight: 1 }}>
                    {std.monthlyRev.split(' ')[0]}
                  </div>
                  <div style={{ fontSize: '0.675rem', color: '#6b7280', fontWeight: 600, marginTop: '0.2rem' }}>EGP</div>
                  <div style={{ fontSize: '0.675rem', color: '#15A036', fontWeight: 700 }}>Monthly</div>
                  <div style={{ fontSize: '0.675rem', color: '#15A036', fontWeight: 700 }}>Rev</div>
                </div>

                <button 
                  className="btn-secondary-light" 
                  style={{ 
                    borderRadius: '12px', 
                    padding: '0.65rem 0.95rem', 
                    fontSize: '0.75rem', 
                    fontWeight: 800, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: '#f1f5f9',
                    border: 'none',
                    cursor: 'pointer',
                    minWidth: '85px'
                  }} 
                  onClick={() => onOpenStadiumDetails && onOpenStadiumDetails(std)}
                >
                  <span>View</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <span>Details</span>
                    <span style={{ fontSize: '0.9rem' }}>→</span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Pagination Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'white', borderRadius: '30px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
            Showing {filteredStadiums.length > 0 ? (stadiumPage - 1) * 2 + 1 : 0} - {Math.min(stadiumPage * 2, filteredStadiums.length)} of {filteredStadiums.length} registered Cairo stadiums
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button 
              className="btn-secondary-light" 
              style={{ border: 'none', background: 'transparent', fontSize: '0.8rem', cursor: 'pointer' }}
              onClick={() => setStadiumPage(p => Math.max(1, p - 1))}
            >
              Previous
            </button>

            {[1, 2, 3].map(p => (
              <button 
                key={p} 
                className={`page-btn ${stadiumPage === p ? 'active' : ''}`}
                onClick={() => setStadiumPage(p)}
                style={{
                  background: stadiumPage === p ? '#15A036' : 'transparent',
                  color: stadiumPage === p ? 'white' : '#111827',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {p}
              </button>
            ))}

            <button 
              className="btn-secondary-light" 
              style={{ border: 'none', background: 'transparent', fontSize: '0.8rem', cursor: 'pointer' }}
              onClick={() => setStadiumPage(p => Math.min(3, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
