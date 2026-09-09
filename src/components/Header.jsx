import React, { useState } from 'react';
import { Bell, User, ChevronDown, LogOut, ShieldCheck, UserCheck, ClipboardCheck, Building2 } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenNotifications, onLogout, userRole = 'admin' }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const isManager = userRole === 'manager';
  const isRepresentative = userRole === 'representative';
  const isStadiumOwner = userRole === 'stadium_owner';

  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'players', label: 'Players' },
    { id: 'stadiums', label: 'Stadiums' },
    { id: 'managers', label: 'Managers' },
    { id: 'representatives', label: 'Representatives' }
  ];

  const managerNavItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'players', label: 'Players' },
    { id: 'stadiums', label: 'Stadiums' },
    { id: 'representatives', label: 'Representatives' }
  ];

  const representativeNavItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'stadiums', label: 'Stadiums' }
  ];

  const stadiumOwnerNavItems = [
    { id: 'dashboard', label: 'Dashboard' }
  ];

  let navItems = adminNavItems;
  if (isStadiumOwner) navItems = stadiumOwnerNavItems;
  else if (isRepresentative) navItems = representativeNavItems;
  else if (isManager) navItems = managerNavItems;

  const getUserTitle = () => {
    if (isStadiumOwner) return 'Admin Profile';
    if (isRepresentative) return 'Representative Profile';
    if (isManager) return 'Manager Profile';
    return 'Admin Profile';
  };

  const getUserSubtitle = () => {
    if (isStadiumOwner) return 'Stadium Owner';
    if (isRepresentative) return 'Field Representative';
    if (isManager) return 'Operations Manager';
    return 'Super Administrator';
  };

  const getUserEmail = () => {
    if (isStadiumOwner) return 'stadium_owner@kora.com';
    if (isRepresentative) return 'representative@kora.com';
    if (isManager) return 'manager@kora.com';
    return 'admin@kora.com';
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand" onClick={() => setActiveTab('dashboard')}>
          <img 
            src="/assets/landing/logo.png" 
            alt="KORA Logo" 
            className="navbar-logo" 
          />
        </div>

        <nav className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="icon-button" onClick={onOpenNotifications} title="Notifications">
            <Bell size={18} />
            <span className="notification-badge"></span>
          </button>

          <div 
            className="user-profile" 
            style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar" style={{ background: isStadiumOwner ? '#f0fdf4' : isRepresentative ? '#ecfdf5' : isManager ? '#f0fdf4' : '#eaf7ec', color: '#15A036' }}>
              {isStadiumOwner ? <Building2 size={18} /> : isRepresentative ? <ClipboardCheck size={18} /> : isManager ? <UserCheck size={18} /> : <User size={18} />}
            </div>
            <div className="user-info">
              <span className="user-name">
                {getUserTitle()}
              </span>
              <span className="user-role">
                {getUserSubtitle()}
              </span>
            </div>
            <ChevronDown size={14} style={{ color: '#9ca3af', marginLeft: '0.2rem' }} />

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div 
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: '240px',
                  background: '#ffffff',
                  borderRadius: '14px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                  border: '1px solid #eef2f6',
                  padding: '0.75rem',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ padding: '0.5rem 0.6rem', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>
                    {getUserSubtitle()}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {getUserEmail()}
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', color: '#15A036', background: '#f0fdf4', border: '1px solid #dcfce7', padding: '0.2rem 0.5rem', borderRadius: '10px', marginTop: '0.4rem', fontWeight: 700 }}>
                    <ShieldCheck size={12} /> {isStadiumOwner ? 'Stadium Owner Rights' : isRepresentative ? 'Representative Rights Active' : isManager ? 'Manager Rights Active' : 'Root Access Active'}
                  </div>
                </div>

                <button
                  type="button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    fontSize: '0.825rem',
                    fontWeight: 700,
                    color: '#ef4444',
                    background: '#fef2f2',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onClick={() => {
                    setShowUserMenu(false);
                    if (onLogout) onLogout();
                  }}
                >
                  <LogOut size={16} />
                  <span>Sign Out / Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
