import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, UserCheck, ClipboardCheck, Building2, CheckCircle2 } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState('admin'); // 'admin' | 'manager' | 'representative' | 'stadium_owner'
  const [email, setEmail] = useState('admin@kora.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRoleSwitch = (role) => {
    setSelectedRole(role);
    if (role === 'admin') setEmail('admin@kora.com');
    else if (role === 'manager') setEmail('manager@kora.com');
    else if (role === 'representative') setEmail('representative@kora.com');
    else setEmail('stadium_owner@kora.com');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both your email address and password.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      onLogin(selectedRole);
    }, 500);
  };

  const handleInstantLogin = (role) => {
    setSelectedRole(role);
    if (role === 'admin') setEmail('admin@kora.com');
    else if (role === 'manager') setEmail('manager@kora.com');
    else if (role === 'representative') setEmail('representative@kora.com');
    else setEmail('stadium_owner@kora.com');
    
    setPassword('kora2026password');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(role);
    }, 400);
  };

  const getRoleBadge = () => {
    if (selectedRole === 'stadium_owner') {
      return <><Building2 size={14} className="text-green" /> Stadium Owner Portal System</>;
    }
    if (selectedRole === 'representative') {
      return <><ClipboardCheck size={14} className="text-green" /> Representative Portal System</>;
    }
    if (selectedRole === 'manager') {
      return <><UserCheck size={14} className="text-green" /> Manager Portal System</>;
    }
    return <><ShieldCheck size={14} className="text-green" /> Admin Portal System</>;
  };

  const getRoleTitle = () => {
    if (selectedRole === 'stadium_owner') return 'Sign in to Stadium Owner Dashboard';
    if (selectedRole === 'representative') return 'Sign in to Representative Dashboard';
    if (selectedRole === 'manager') return 'Sign in to Manager Dashboard';
    return 'Sign in to Admin Dashboard';
  };

  const getRoleSubtitle = () => {
    if (selectedRole === 'stadium_owner') {
      return 'Enter your stadium owner credentials to manage your venue, track match bookings, revenue analytics, and facility features.';
    }
    if (selectedRole === 'representative') {
      return 'Enter your field representative credentials to inspect stadium venues, manage facilities, and log reports.';
    }
    if (selectedRole === 'manager') {
      return 'Enter your manager credentials to supervise regional players, stadiums, field representatives, and operational logs.';
    }
    return 'Enter your administrative credentials to manage players, stadiums, representatives, and central controls.';
  };

  const getButtonText = () => {
    if (selectedRole === 'stadium_owner') return 'Stadium Owner';
    if (selectedRole === 'representative') return 'Representative';
    if (selectedRole === 'manager') return 'Manager';
    return 'Admin';
  };

  return (
    <div className="login-page-container">
      <div className="login-card-wrapper" style={{ maxWidth: '500px' }}>
        {/* Header Branding */}
        <div className="login-header">
          <div className="login-logo-box">
            <img 
              src="/assets/landing/logo.png" 
              alt="KORA Logo" 
              className="login-logo-img" 
            />
          </div>

          {/* 4 Role Selection Tabs */}
          <div className="login-role-tabs" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.2rem' }}>
            <button
              type="button"
              className={`login-role-tab ${selectedRole === 'admin' ? 'active' : ''}`}
              onClick={() => handleRoleSwitch('admin')}
              style={{ fontSize: '0.75rem', padding: '0.5rem 0.2rem' }}
            >
              <ShieldCheck size={13} />
              <span>Admin</span>
            </button>
            <button
              type="button"
              className={`login-role-tab ${selectedRole === 'manager' ? 'active' : ''}`}
              onClick={() => handleRoleSwitch('manager')}
              style={{ fontSize: '0.75rem', padding: '0.5rem 0.2rem' }}
            >
              <UserCheck size={13} />
              <span>Manager</span>
            </button>
            <button
              type="button"
              className={`login-role-tab ${selectedRole === 'representative' ? 'active' : ''}`}
              onClick={() => handleRoleSwitch('representative')}
              style={{ fontSize: '0.75rem', padding: '0.5rem 0.2rem' }}
            >
              <ClipboardCheck size={13} />
              <span>Rep</span>
            </button>
            <button
              type="button"
              className={`login-role-tab ${selectedRole === 'stadium_owner' ? 'active' : ''}`}
              onClick={() => handleRoleSwitch('stadium_owner')}
              style={{ fontSize: '0.75rem', padding: '0.5rem 0.2rem' }}
            >
              <Building2 size={13} />
              <span>Owner</span>
            </button>
          </div>

          <span className="login-portal-badge">
            {getRoleBadge()}
          </span>

          <h1 className="login-title">
            {getRoleTitle()}
          </h1>
          <p className="login-subtitle">
            {getRoleSubtitle()}
          </p>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div className="login-error-banner">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field-group">
            <label className="login-field-label">Email Address</label>
            <div className="login-input-wrapper">
              <Mail className="login-input-icon" size={18} />
              <input
                type="email"
                className="login-input"
                placeholder={selectedRole === 'stadium_owner' ? 'stadium_owner@kora.com' : selectedRole === 'representative' ? 'representative@kora.com' : selectedRole === 'manager' ? 'manager@kora.com' : 'admin@kora.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-field-group">
            <div className="login-label-row">
              <label className="login-field-label">Password</label>
              <button 
                type="button" 
                className="login-forgot-link"
                onClick={() => alert(`Password recovery link sent to your ${selectedRole} email address.`)}
              >
                Forgot Password?
              </button>
            </div>
            <div className="login-input-wrapper">
              <Lock className="login-input-icon" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="login-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="login-options-row">
            <label className="login-checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="login-checkbox"
              />
              <span>Remember me for 30 days</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="login-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="login-spinner-text">Authenticating...</span>
            ) : (
              <>
                <span>Sign In to {getButtonText()} Dashboard</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* 4 Quick Demo Access Buttons */}
        <div className="login-dual-demo-container">
          <div className="login-demo-info" style={{ marginBottom: '0.6rem' }}>
            <CheckCircle2 size={16} className="text-green" />
            <span>Select Instant Demo Access:</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            <button 
              type="button" 
              className={`login-demo-role-btn ${selectedRole === 'admin' ? 'primary-demo' : ''}`}
              onClick={() => handleInstantLogin('admin')}
            >
              <ShieldCheck size={14} />
              Admin
            </button>
            <button 
              type="button" 
              className={`login-demo-role-btn ${selectedRole === 'manager' ? 'primary-demo' : ''}`}
              onClick={() => handleInstantLogin('manager')}
            >
              <UserCheck size={14} />
              Manager
            </button>
            <button 
              type="button" 
              className={`login-demo-role-btn ${selectedRole === 'representative' ? 'primary-demo' : ''}`}
              onClick={() => handleInstantLogin('representative')}
            >
              <ClipboardCheck size={14} />
              Representative
            </button>
            <button 
              type="button" 
              className={`login-demo-role-btn ${selectedRole === 'stadium_owner' ? 'primary-demo' : ''}`}
              onClick={() => handleInstantLogin('stadium_owner')}
            >
              <Building2 size={14} />
              Stadium Owner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
