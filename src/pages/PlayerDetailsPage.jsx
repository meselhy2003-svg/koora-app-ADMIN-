import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  PauseCircle, 
  CheckCircle2, 
  Trash2, 
  Mail, 
  Phone, 
  Trophy, 
  XCircle, 
  TrendingUp, 
  Calendar, 
  Edit3, 
  Play, 
  CheckCircle,
  Building2,
  X,
  Plus
} from 'lucide-react';

export default function PlayerDetailsPage({ player, onBack, onOpenBookingHistory, onOpenEdit, onDeletePlayer }) {
  const [activeStatus, setActiveStatus] = useState(player?.status || 'ACTIVE');
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  
  const [mediaList, setMediaList] = useState([
    { id: 1, title: 'Match Highlights 2023', duration: '04:22', image: '/assets/landing/hero_action.png' },
    { id: 2, title: 'Skill Drills: Shooting', duration: '02:15', image: '/assets/landing/card_players.png' }
  ]);

  const playerMediaInputRef = useRef(null);

  const handleUploadPlayerMedia = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newItems = files.map((file, idx) => ({
        id: Date.now() + idx,
        title: file.name.replace(/\.[^/.]+$/, ""),
        duration: file.type.startsWith('video') ? 'Video' : 'Photo',
        image: URL.createObjectURL(file)
      }));
      setMediaList(prev => [...prev, ...newItems]);
    }
  };

  const playerName = player?.name || 'Ahmed El-Sayed';
  const playerId = player?.id || '#KRA-92831';
  const playerAvatar = player?.avatar || '/assets/players/player_ahmed.png';
  const playerGov = player?.governorate || 'Cairo';
  const playerPos = player?.position === 'FWD' ? 'FWD / Winger' : (player?.position || 'FWD / Winger');

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Top Header Title & Actions Bar */}
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
            title="Back to Players List"
            style={{ background: 'white' }}
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#111827' }}>
                {playerName}
              </h1>
              <span className={`status-capsule ${activeStatus === 'ACTIVE' ? 'active' : 'suspended'}`} style={{ fontSize: '0.7rem', padding: '0.2rem 0.65rem' }}>
                {activeStatus}
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.1rem' }}>
              ID: {playerId}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            className="btn-secondary-light" 
            onClick={() => setActiveStatus(prev => prev === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE')}
            style={{ borderRadius: '30px' }}
          >
            <PauseCircle size={15} /> {activeStatus === 'ACTIVE' ? 'Suspend' : 'Unsuspend'}
          </button>
          
          <button 
            className="btn-primary" 
            onClick={() => setActiveStatus('ACTIVE')}
            style={{ borderRadius: '30px', background: '#15A036' }}
          >
            <CheckCircle2 size={16} /> Activate
          </button>

          <button 
            className="icon-button" 
            style={{ color: '#dc2626', borderColor: '#fee2e2', background: '#fef2f2' }}
            onClick={() => {
              if (window.confirm(`Are you sure you want to remove ${playerName} from the central registry?`)) {
                if (onDeletePlayer) onDeletePlayer();
                else onBack();
              }
            }}
            title="Delete Player"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid Layout */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '340px 1fr', 
        gap: '1.75rem',
        alignItems: 'start'
      }}>
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Main Card: Avatar + Contact Info */}
          <div className="table-card-container" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ 
              position: 'relative', 
              height: '140px', 
              background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src="/assets/landing/hero_action.png" 
                alt="Banner Graphic" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
              />
              <div style={{
                position: 'absolute',
                bottom: '-25px',
                left: '1.5rem',
                width: '75px',
                height: '75px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '3px solid white',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                background: 'white'
              }}>
                <img src={playerAvatar} alt={playerName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            <div style={{ padding: '2.5rem 1.5rem 1.5rem 1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: '#374151' }}>
                  <Mail size={15} style={{ color: '#15A036' }} />
                  <span>ahmed.elsayed@kora.pro</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem', color: '#374151' }}>
                  <Phone size={15} style={{ color: '#15A036' }} />
                  <span>+20 102 938 4756</span>
                </div>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #f3f4f6'
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>AGE</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#15A036', marginTop: '0.1rem' }}>24</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>GOVERNORATE</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginTop: '0.1rem' }}>{playerGov}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Card */}
          <div className="table-card-container" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img src="/assets/players/Icon (9).png" alt="Performance Icon" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>Performance</h3>
              </div>
              <span className="summary-pill pill-green" style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}>
                ★ 4.8
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>POSITION</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827', marginTop: '0.15rem' }}>{playerPos}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>SKILL LEVEL</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', marginTop: '0.15rem' }}>Advanced</div>
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>PREFERRED FOOT</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', marginTop: '0.15rem' }}>Right</div>
            </div>

            <div>
              <div style={{ fontSize: '0.675rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.35rem' }}>ABOUT</div>
              <p style={{ fontSize: '0.825rem', color: '#4b5563', lineHeight: 1.55 }}>
                Dynamic forward known for explosive speed and technical precision. Currently playing for FC Cairo, El-Sayed has become a core asset in offensive maneuvers with a strong tactical understanding of modern press-heavy systems.
              </p>
            </div>
          </div>

          {/* Account Details Card */}
          <div className="table-card-container" style={{ padding: '1.5rem' }}>
            <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#6b7280', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              ACCOUNT DETAILS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Registered</span>
                <span style={{ fontWeight: 700, color: '#111827' }}>May 12, 2021</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Last Login</span>
                <span style={{ fontWeight: 700, color: '#111827' }}>2 hours ago</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Last Booking</span>
                <span style={{ fontWeight: 700, color: '#111827' }}>Oct 24, 2023</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6b7280' }}>Current Team</span>
                <span style={{ fontWeight: 800, color: '#15A036' }}>FC Cairo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Top 4 Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
            {/* Card 1: Matches (Dark Green) */}
            <div style={{ 
              background: '#0e5c21', 
              color: 'white', 
              borderRadius: '14px', 
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyKey: 'space-between'
            }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <Building2 size={20} style={{ color: 'white' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.675rem', fontWeight: 800, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>MATCHES</div>
                <div style={{ fontSize: '2.1rem', fontWeight: 800, lineHeight: 1.1, marginTop: '0.2rem' }}>142</div>
              </div>
            </div>

            {/* Card 2: Wins */}
            <div className="table-card-container" style={{ padding: '1.25rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <Trophy size={20} style={{ color: '#15A036' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.675rem', fontWeight: 800, letterSpacing: '0.05em', color: '#6b7280', textTransform: 'uppercase' }}>WINS</div>
                <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#111827', lineHeight: 1.1, marginTop: '0.2rem' }}>94</div>
              </div>
            </div>

            {/* Card 3: Losses */}
            <div className="table-card-container" style={{ padding: '1.25rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <XCircle size={20} style={{ color: '#dc2626' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.675rem', fontWeight: 800, letterSpacing: '0.05em', color: '#6b7280', textTransform: 'uppercase' }}>LOSSES</div>
                <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#111827', lineHeight: 1.1, marginTop: '0.2rem' }}>28</div>
              </div>
            </div>

            {/* Card 4: Avg Rating */}
            <div className="table-card-container" style={{ padding: '1.25rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <TrendingUp size={20} style={{ color: '#15A036' }} />
              </div>
              <div>
                <div style={{ fontSize: '0.675rem', fontWeight: 800, letterSpacing: '0.05em', color: '#6b7280', textTransform: 'uppercase' }}>AVG RATING</div>
                <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#111827', lineHeight: 1.1, marginTop: '0.2rem' }}>8.4</div>
              </div>
            </div>
          </div>

          {/* Player Media Section */}
          <div>
            <input 
              type="file" 
              ref={playerMediaInputRef} 
              accept="image/*,video/*" 
              multiple 
              style={{ display: 'none' }} 
              onChange={handleUploadPlayerMedia} 
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827' }}>Player Media</h3>
              <button 
                style={{ fontSize: '0.85rem', fontWeight: 700, color: '#15A036', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => playerMediaInputRef.current && playerMediaInputRef.current.click()}
              >
                + Add Media
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem' }}>
              {mediaList.map(item => (
                <div 
                  key={item.id}
                  onClick={() => setActiveVideoModal(item)}
                  style={{ 
                    position: 'relative', 
                    height: '170px', 
                    borderRadius: '14px', 
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    cursor: 'pointer'
                  }}
                >
                  <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)' }}></div>
                  
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(21, 160, 54, 0.85)', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <Play size={20} style={{ marginLeft: '3px' }} />
                  </div>

                  <div style={{ position: 'absolute', top: '10px', left: '12px', fontSize: '0.75rem', fontWeight: 800, color: 'white' }}>
                    KORA
                  </div>

                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', color: 'white' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                    <div style={{ fontSize: '0.7rem', color: '#d1d5db', marginTop: '0.1rem' }}>{item.duration}</div>
                  </div>
                </div>
              ))}

              {/* Interactive Dashed Add Box */}
              <div 
                onClick={() => playerMediaInputRef.current && playerMediaInputRef.current.click()}
                title="Click to upload media files"
                style={{ 
                  height: '170px', 
                  borderRadius: '14px', 
                  border: '2px dashed #cbd5e1', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center',
                  background: '#f8fafc',
                  color: '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#15A036';
                  e.currentTarget.style.color = '#15A036';
                  e.currentTarget.style.background = '#f0fdf4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.color = '#6b7280';
                  e.currentTarget.style.background = '#f8fafc';
                }}
              >
                <Plus size={28} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, marginTop: '0.35rem' }}>Upload Media</span>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="table-card-container" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', marginBottom: '1.5rem' }}>
              Recent Activity
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
              {/* Vertical timeline line */}
              <div style={{ 
                position: 'absolute', 
                top: '8px', 
                bottom: '8px', 
                left: '7px', 
                width: '2px', 
                background: '#e5e7eb' 
              }}></div>

              {/* Event 1 */}
              <div style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                <div style={{ 
                  width: '16px', 
                  height: '16px', 
                  borderRadius: '50%', 
                  background: '#15A036', 
                  flexShrink: 0,
                  marginTop: '3px'
                }}></div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.925rem', color: '#111827' }}>Joined Team Alpha</div>
                  <div style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '0.2rem' }}>
                    Registration finalized for the upcoming Cairo Winter League.
                  </div>
                  <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#9ca3af', marginTop: '0.35rem' }}>
                    OCT 28, 2023 • 14:30
                  </div>
                </div>
              </div>

              {/* Event 2 */}
              <div style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                <div style={{ 
                  width: '16px', 
                  height: '16px', 
                  borderRadius: '50%', 
                  background: '#e5e7eb', 
                  flexShrink: 0,
                  marginTop: '3px'
                }}></div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.925rem', color: '#111827' }}>Booked Stadium X</div>
                  <div style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '0.2rem' }}>
                    Solo practice session booked for pitch 4.
                  </div>
                  <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#9ca3af', marginTop: '0.35rem' }}>
                    OCT 24, 2023 • 09:15
                  </div>
                </div>
              </div>

              {/* Event 3 */}
              <div style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                <div style={{ 
                  width: '16px', 
                  height: '16px', 
                  borderRadius: '50%', 
                  background: '#15A036', 
                  flexShrink: 0,
                  marginTop: '3px'
                }}></div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.925rem', color: '#111827' }}>Match Completed</div>
                  <div style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '0.2rem' }}>
                    Cairo Cup Round 2: 3 Goals, 1 Assist. Man of the Match.
                  </div>
                  <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#9ca3af', marginTop: '0.35rem' }}>
                    OCT 21, 2023 • 21:00
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking History Banner */}
          <div 
            style={{ 
              background: '#0e5c21', 
              borderRadius: '14px', 
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              color: 'white',
              fontWeight: 800,
              cursor: 'pointer'
            }}
            onClick={onOpenBookingHistory}
          >
            <Calendar size={20} />
            <span>Booking History</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Edit Bar */}
      <div style={{ 
        position: 'fixed', 
        bottom: '0', 
        left: '0', 
        right: '0', 
        background: 'rgba(255,255,255,0.9)', 
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid #e5e7eb',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 50
      }}>
        <button 
          className="btn-primary" 
          style={{ width: '100%', maxWidth: '1280px', justifyContent: 'center', borderRadius: '30px', background: '#0e5c21' }}
          onClick={onOpenEdit}
        >
          <Edit3 size={16} /> Edit
        </button>
      </div>

      {/* Video Player Modal */}
      {activeVideoModal && (
        <div className="modal-overlay" onClick={() => setActiveVideoModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', padding: '0', overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: '320px', background: '#000' }}>
              <img src={activeVideoModal.image} alt={activeVideoModal.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
              <button 
                className="modal-close" 
                onClick={() => setActiveVideoModal(null)}
                style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', color: 'white' }}
              >
                <X size={18} />
              </button>
              
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#15A036', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 0 20px rgba(21,160,54,0.6)' }}>
                <Play size={28} style={{ marginLeft: '4px' }} />
              </div>
            </div>

            <div style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>{activeVideoModal.title}</h3>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Duration: {activeVideoModal.duration}</span>
              </div>
              <span className="summary-pill pill-green">HD 1080p</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
