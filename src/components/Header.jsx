import React from 'react';
import { Bell, User, ChevronDown } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenNotifications }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'players', label: 'Players' },
    { id: 'stadiums', label: 'Stadiums' },
    { id: 'managers', label: 'Managers' },
    { id: 'representatives', label: 'Representatives' }
  ];

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

          <div className="user-profile">
            <div className="user-avatar">
              <User size={18} />
            </div>
            <div className="user-info">
              <span className="user-name">Admin Profile</span>
              <span className="user-role">Super Administrator</span>
            </div>
            <ChevronDown size={14} style={{ color: '#9ca3af', marginLeft: '0.2rem' }} />
          </div>
        </div>
      </div>
    </header>
  );
}
