import React from 'react';
import { Globe, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-brand">KORA Admin Portal</span>
          <span>© 2028 KORA Performance. Version 2.4.0</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="footer-links">
            <a href="#privacy" className="footer-link">Privacy Policy</a>
            <a href="#terms" className="footer-link">Terms of Service</a>
            <a href="#compliance" className="footer-link">Compliance</a>
            <a href="#security" className="footer-link">Security</a>
            <a href="#support" className="footer-link">Support</a>
          </div>

          <div className="footer-controls">
            <button className="control-btn" title="Language / Locale">
              <Globe size={14} />
            </button>
            <button className="control-btn" title="Security Compliance">
              <Shield size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
