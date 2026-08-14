import React, { useState, useRef } from 'react';
import { Camera, Upload, Plus, ChevronDown, ArrowRight, ArrowLeft, Trash2, CheckCircle2, Film } from 'lucide-react';

export default function EditPlayerFormPage({ player, onBack, onSave }) {
  const isEditing = Boolean(player);

  const photoInputRef = useRef(null);
  const mediaInputRef = useRef(null);

  const [photoPreview, setPhotoPreview] = useState(player?.avatar || null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  const [username, setUsername] = useState(player?.name ? player.name.toLowerCase().replace(/\s+/g, '') : 'ahmed_sayed');
  const [email, setEmail] = useState(player?.email || 'ahmed.elsayed@kora.pro');
  const [phone, setPhone] = useState(player?.phone || '+20 102 938 4756');
  const [dob, setDob] = useState('1999-05-12');
  const [governorate, setGovernorate] = useState(player?.governorate || 'Cairo');
  const [address, setAddress] = useState('14 El-Tahrir Street, Nasr City, Cairo');
  const [password, setPassword] = useState('••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••');

  const [playingPosition, setPlayingPosition] = useState(player?.position || 'RW');
  const [preferredFoot, setPreferredFoot] = useState('Left');
  const [aboutMe, setAboutMe] = useState(
    'Dynamic forward known for explosive speed and technical precision. Currently playing for FC Cairo, El-Sayed has become a core asset in offensive maneuvers.'
  );

  const positionsList = ['GK', 'DF', 'RB', 'LB', 'CB', 'DM', 'CM', 'AM', 'RW', 'LW', 'ST'];
  const feetList = ['Right', 'Left', 'Both'];

  // Handle Photo File Selection
  const handlePhotoSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhotoPreview(imageUrl);
    }
  };

  // Handle Media (Photo / Video) Selection
  const handleMediaSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const mediaUrl = URL.createObjectURL(file);
      setMediaPreview(mediaUrl);
      setMediaType(file.type.startsWith('video') ? 'video' : 'image');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Success: ${isEditing ? 'Updated' : 'Registered'} player profile for "${username}"!`);
    if (onSave) onSave();
    else if (onBack) onBack();
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Hidden File Inputs */}
      <input 
        type="file" 
        ref={photoInputRef} 
        accept="image/*" 
        style={{ display: 'none' }} 
        onChange={handlePhotoSelect} 
      />
      <input 
        type="file" 
        ref={mediaInputRef} 
        accept="image/*,video/*" 
        style={{ display: 'none' }} 
        onChange={handleMediaSelect} 
      />

      {/* Top Header / Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <button className="icon-button" onClick={onBack} title="Back" style={{ background: 'white' }}>
          <ArrowLeft size={18} />
        </button>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#111827' }}>
            {isEditing ? 'Edit Player Profile' : 'Register New Player'}
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.2rem' }}>
            {isEditing ? 'Update complete player profile and KORA account.' : 'Create a complete player profile and KORA account.'}
          </p>
        </div>

        <div style={{ width: '40px' }}></div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Upload Photo Card */}
        <div className="table-card-container" style={{ padding: '2rem', textAlign: 'center' }}>
          {photoPreview ? (
            <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 0.75rem auto' }}>
              <img 
                src={photoPreview} 
                alt="Uploaded Profile" 
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid #15A036' }} 
              />
              <button 
                type="button" 
                onClick={() => setPhotoPreview(null)}
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#dc2626',
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                }}
                title="Remove photo"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ) : (
            <div 
              onClick={() => photoInputRef.current && photoInputRef.current.click()}
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                border: '2px dashed #9ca3af',
                margin: '0 auto 0.75rem auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f9fafb',
                cursor: 'pointer',
                color: '#6b7280',
                transition: 'all 0.2s ease'
              }}
            >
              <Camera size={26} />
            </div>
          )}

          <div 
            style={{ fontSize: '0.8rem', color: '#15A036', fontWeight: 700, cursor: 'pointer' }}
            onClick={() => photoInputRef.current && photoInputRef.current.click()}
          >
            {photoPreview ? 'Change Photo' : 'Upload Photo'}
          </div>
        </div>

        {/* KORA Account Section Card */}
        <div className="table-card-container" style={{ padding: '1.75rem' }}>
          <div style={{ 
            fontSize: '1.05rem', 
            fontWeight: 800, 
            color: '#111827', 
            paddingBottom: '0.75rem', 
            borderBottom: '1px solid #f3f4f6',
            marginBottom: '1.25rem' 
          }}>
            KORA Account
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>Username</label>
                <input 
                  type="text" 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                  placeholder="Choose a unique username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>Phone Number</label>
                <input 
                  type="text" 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>Date of Birth</label>
                <input 
                  type="date" 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>Governorate</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <select 
                    className="search-input" 
                    style={{ width: '100%', paddingLeft: '0.9rem', paddingRight: '2rem', borderRadius: '8px', appearance: 'none' }}
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                  >
                    <option value="Cairo">Cairo</option>
                    <option value="Alexandria">Alexandria</option>
                    <option value="Giza">Giza</option>
                    <option value="Dakahlia">Dakahlia</option>
                    <option value="Minya">Minya</option>
                  </select>
                  <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', pointerEvents: 'none', color: '#6b7280' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>Full Residential Address</label>
                <input 
                  type="text" 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                  placeholder="Street address, building, apartment..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>Email Address</label>
                <input 
                  type="email" 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                  placeholder="player@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>Password</label>
                <input 
                  type="password" 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>Confirm Password</label>
                <input 
                  type="password" 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Football Information Section Card */}
        <div className="table-card-container" style={{ padding: '1.75rem' }}>
          <div style={{ 
            fontSize: '1.05rem', 
            fontWeight: 800, 
            color: '#111827', 
            paddingBottom: '0.75rem', 
            borderBottom: '1px solid #f3f4f6',
            marginBottom: '1.25rem' 
          }}>
            Football Information
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem', marginBottom: '1.75rem' }}>
            {/* Playing Position Pills */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>
                Playing Position
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {positionsList.map(pos => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => setPlayingPosition(pos)}
                    style={{
                      padding: '0.4rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.775rem',
                      fontWeight: 700,
                      border: playingPosition === pos ? 'none' : '1px solid #e5e7eb',
                      background: playingPosition === pos ? '#15A036' : '#f9fafb',
                      color: playingPosition === pos ? 'white' : '#4b5563',
                      cursor: 'pointer'
                    }}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Foot Pills */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '0.5rem' }}>
                Preferred Foot
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {feetList.map(foot => (
                  <button
                    key={foot}
                    type="button"
                    onClick={() => setPreferredFoot(foot)}
                    style={{
                      flex: 1,
                      padding: '0.4rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.775rem',
                      fontWeight: 700,
                      border: preferredFoot === foot ? 'none' : '1px solid #e5e7eb',
                      background: preferredFoot === foot ? '#15A036' : '#f9fafb',
                      color: preferredFoot === foot ? 'white' : '#4b5563',
                      cursor: 'pointer'
                    }}
                  >
                    {foot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Player Media Sub-Card */}
          <div style={{ background: '#fafafa', border: '1px solid #f3f4f6', borderRadius: '12px', padding: '1.25rem' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>
              Player media
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '1rem' }}>
              {mediaPreview ? (
                <div style={{ position: 'relative', width: '100%', height: '140px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                  {mediaType === 'video' ? (
                    <video src={mediaPreview} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <img src={mediaPreview} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                  <button 
                    type="button" 
                    onClick={() => { setMediaPreview(null); setMediaType(null); }}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      borderRadius: '50%',
                      width: '26px',
                      height: '26px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Remove media"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => mediaInputRef.current && mediaInputRef.current.click()}
                  style={{
                    border: '2px dashed #d1d5db',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Upload size={22} style={{ color: '#6b7280', margin: '0 auto 0.4rem auto' }} />
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151' }}>Upload Cover Photo, video</div>
                  <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '0.1rem' }}>High resolution, min 1920x1080px</div>
                </div>
              )}

              <div 
                onClick={() => mediaInputRef.current && mediaInputRef.current.click()}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  background: '#f3f4f6',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
                title="Add cover file"
              >
                <Plus size={24} />
                <span style={{ fontSize: '0.65rem', fontWeight: 700, marginTop: '0.2rem' }}>Add Media</span>
              </div>
            </div>
          </div>
        </div>

        {/* About Me Section Card */}
        <div className="table-card-container" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827' }}>About Me</span>
            <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{aboutMe.length}/500</span>
          </div>

          <textarea 
            rows={4}
            className="search-input"
            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', lineHeight: 1.5 }}
            placeholder="Write a short personal introduction..."
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            maxLength={500}
          />
        </div>

        {/* Action Buttons Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          <button 
            type="button" 
            className="btn-secondary-light" 
            style={{ padding: '0.6rem 1.5rem', borderRadius: '30px' }}
            onClick={onBack}
          >
            Cancel
          </button>

          <button 
            type="button" 
            className="btn-secondary-light" 
            style={{ padding: '0.6rem 1.5rem', borderRadius: '30px' }}
            onClick={() => alert('Draft saved successfully!')}
          >
            Save as Draft
          </button>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ padding: '0.6rem 1.75rem', borderRadius: '30px', background: '#0e5c21' }}
          >
            {isEditing ? 'Save Changes' : 'Create Player'} <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
