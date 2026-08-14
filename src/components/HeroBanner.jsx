import React from 'react';
import { Activity } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-pill">
          <span>ADMIN PORTAL v2.4</span>
        </div>
        <h1 className="hero-title">
          Welcome to <span className="text-green">KORA</span> Admin Portal
        </h1>
        <p className="hero-description">
          Manage players, stadiums, representatives and the entire KORA ecosystem from one centralized, high-performance platform engineered for elite precision.
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
