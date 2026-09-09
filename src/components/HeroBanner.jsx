import React from 'react';

export default function HeroBanner({ userRole = 'admin' }) {
  const isManager = userRole === 'manager';
  const isRepresentative = userRole === 'representative';

  const getPillText = () => {
    if (isRepresentative) return 'REPRESENTATIVE PORTAL v2.4';
    if (isManager) return 'MANAGER PORTAL v2.4';
    return 'ADMIN PORTAL v2.4';
  };

  const getTitleText = () => {
    if (isRepresentative) return 'Representative Portal';
    if (isManager) return 'Manager Portal';
    return 'Admin Portal';
  };

  const getDescriptionText = () => {
    if (isRepresentative) {
      return 'Manage stadium facilities, venue inspections, field logs and operational tasks from one centralized, high-performance platform engineered for field excellence.';
    }
    if (isManager) {
      return 'Manage players, stadiums, field representatives and regional operational workflows from one centralized, high-performance platform engineered for elite precision.';
    }
    return 'Manage players, stadiums, representatives and the entire KORA ecosystem from one centralized, high-performance platform engineered for elite precision.';
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-pill">
          <span>{getPillText()}</span>
        </div>
        <h1 className="hero-title">
          Welcome to <span className="text-green">KORA</span> {getTitleText()}
        </h1>
        <p className="hero-description">
          {getDescriptionText()}
        </p>
      </div>

      <div className="hero-visuals">
        <div className="visual-column-left">
          <div className="hero-img-card">
            <img src="/assets/landing/hero_action.png" alt="Live match action" />
          </div>
          <div className="hero-img-card">
            <img src="/assets/landing/hero_stadium.png" alt="KORA Stadium facility" />
          </div>
        </div>

        <div className="hero-img-card hero-img-tall">
          <img src="/assets/landing/hero_analytics.png" alt="KORA Global analytics" />
          
          <div className="live-pulse-widget">
            <div className="pulse-header">
              <span className="pulse-dot"></span>
              <span>LIVE PULSE</span>
            </div>
            <div className="pulse-value">+12.4%</div>
            <div className="pulse-sub">Engagement Growth</div>
          </div>
        </div>
      </div>
    </section>
  );
}
