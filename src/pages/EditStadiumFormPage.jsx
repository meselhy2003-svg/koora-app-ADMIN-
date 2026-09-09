import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Camera, 
  Upload, 
  Plus, 
  ChevronDown, 
  ArrowRight, 
  Trash2, 
  MapPin,
  Check
} from 'lucide-react';

export default function EditStadiumFormPage({ stadium, onBack, onSave }) {
  const isEditing = Boolean(stadium);

  const ownerPhotoRef = useRef(null);
  const coverPhotoRef = useRef(null);
  const galleryPhotoRef = useRef(null);

  const [ownerPhotoPreview, setOwnerPhotoPreview] = useState(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(stadium?.image || null);
  const [galleryPhotos, setGalleryPhotos] = useState(['/assets/landing/hero_stadium.png']);

  // Form Fields State
  const [firstName, setFirstName] = useState(stadium?.owner ? stadium.owner.split(' ')[0] : '');
  const [lastName, setLastName] = useState(stadium?.owner ? stadium.owner.split(' ')[1] || '' : '');
  const [ownerPhone, setOwnerPhone] = useState('+971 50 123 4567');
  const [ownerEmail, setOwnerEmail] = useState('owner@domain.com');
  const [ownerPassword, setOwnerPassword] = useState('••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••');

  const [stadiumName, setStadiumName] = useState(stadium?.name || '');
  const [stadiumType, setStadiumType] = useState(stadium?.type || '5v5');
  const [aboutText, setAboutText] = useState('Provide details about the stadium...');

  const [features, setFeatures] = useState({
    floodlights: true,
    restrooms: true,
    parking: false,
    grass: false
  });

  const [governorate, setGovernorate] = useState(stadium?.location ? stadium.location.split(',')[0] : 'Riyadh Region');
  const [city, setCity] = useState(stadium?.location ? stadium.location.split(',')[1] || 'Riyadh' : 'Riyadh');
  const [district, setDistrict] = useState('Al Olaya');
  const [fullAddress, setFullAddress] = useState('King Fahd Road, Building 12');

  const [hourlyPrice, setHourlyPrice] = useState(stadium?.hourlyRate ? stadium.hourlyRate.replace(/[^0-9.]/g, '') : '300.00');
  const [openingTime, setOpeningTime] = useState('08:00');
  const [closingTime, setClosingTime] = useState('23:00');

  const handleOwnerPhotoSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setOwnerPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverPhotoSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setCoverPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryPhotoSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newUrls = files.map(file => URL.createObjectURL(file));
      setGalleryPhotos(prev => [...prev, ...newUrls]);
    }
  };

  const removeGalleryPhoto = (indexToRemove) => {
    setGalleryPhotos(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Success: ${isEditing ? 'Updated' : 'Registered'} stadium "${stadiumName || 'New Stadium'}" in KORA platform!`);
    if (onSave) onSave();
    else if (onBack) onBack();
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Hidden File Inputs */}
      <input type="file" ref={ownerPhotoRef} accept="image/*" style={{ display: 'none' }} onChange={handleOwnerPhotoSelect} />
      <input type="file" ref={coverPhotoRef} accept="image/*,video/*" style={{ display: 'none' }} onChange={handleCoverPhotoSelect} />
      <input type="file" ref={galleryPhotoRef} accept="image/*" multiple style={{ display: 'none' }} onChange={handleGalleryPhotoSelect} />

      {/* Top Navigation / Title Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
        <button className="icon-button" onClick={onBack} title="Back" style={{ background: 'white' }}>
          <ArrowLeft size={18} />
        </button>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#111827' }}>
            {isEditing ? 'Edit Stadium Profile' : 'Register New Stadium'}
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.2rem' }}>
            {isEditing ? 'Update stadium details and owner information.' : 'Add a new stadium and its owner to the KORA platform.'}
          </p>
        </div>

        <div style={{ width: '40px' }}></div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* Card 1: Owner Information */}
        <div className="table-card-container" style={{ padding: '1.75rem' }}>
          <div style={{ 
            fontSize: '1.05rem', 
            fontWeight: 800, 
            color: '#111827', 
            paddingBottom: '0.75rem', 
            borderBottom: '1px solid #f3f4f6',
            marginBottom: '1.25rem' 
          }}>
            Owner Information
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1.75rem', alignItems: 'start' }}>
            {/* Left Photo Upload */}
            <div style={{ textAlign: 'center' }}>
              {ownerPhotoPreview ? (
                <div style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 0.5rem auto' }}>
                  <img src={ownerPhotoPreview} alt="Owner Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid #15A036' }} />
                  <button 
                    type="button" 
                    onClick={() => setOwnerPhotoPreview(null)}
                    style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#dc2626', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => ownerPhotoRef.current && ownerPhotoRef.current.click()}
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    border: '2px dashed #d1d5db',
                    margin: '0 auto 0.5rem auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f9fafb',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >
                  <Camera size={24} />
                </div>
              )}
              <span 
                style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', cursor: 'pointer' }}
                onClick={() => ownerPhotoRef.current && ownerPhotoRef.current.click()}
              >
                Profile Photo
              </span>
            </div>

            {/* Right Fields Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>First Name</label>
                <input 
                  type="text" 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                  placeholder="Enter first name" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  required 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>Last Name</label>
                <input 
                  type="text" 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                  placeholder="Enter last name" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  required 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>Phone Number</label>
                <input 
                  type="text" 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                  placeholder="+971 50 123 4567" 
                  value={ownerPhone} 
                  onChange={(e) => setOwnerPhone(e.target.value)} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>Email Address</label>
                <input 
                  type="email" 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                  placeholder="owner@domain.com" 
                  value={ownerEmail} 
                  onChange={(e) => setOwnerEmail(e.target.value)} 
                  required 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>Password</label>
                <input 
                  type="password" 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                  value={ownerPassword} 
                  onChange={(e) => setOwnerPassword(e.target.value)} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.775rem', fontWeight: 700, color: '#374151', marginBottom: '0.35rem' }}>Confirm Password</label>
                <input 
                  type="password" 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Stadium Information */}
        <div className="table-card-container" style={{ padding: '1.75rem' }}>
          <div style={{ 
            fontSize: '1.05rem', 
            fontWeight: 800, 
            color: '#111827', 
            paddingBottom: '0.75rem', 
            borderBottom: '1px solid #f3f4f6',
            marginBottom: '1.25rem' 
          }}>
            Stadium Information
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#374151', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                STADIUM NAME
              </label>
              <input 
                type="text" 
                className="search-input" 
                style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                placeholder="e.g. King Fahd International Stadium" 
                value={stadiumName} 
                onChange={(e) => setStadiumName(e.target.value)} 
                required 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#374151', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                TYPE
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <select 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '0.9rem', paddingRight: '2rem', borderRadius: '8px', appearance: 'none' }}
                  value={stadiumType}
                  onChange={(e) => setStadiumType(e.target.value)}
                >
                  <option value="5v5">5v5</option>
                  <option value="7v7">7v7</option>
                  <option value="11v11">11v11</option>
                  <option value="11 vs 11 Grass">11 vs 11 Grass</option>
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', pointerEvents: 'none', color: '#6b7280' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#374151', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                FEATURES
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', cursor: 'pointer' }}>
                  <img src="/assets/stadiums/feature_floodlights.png" alt="Floodlights" style={{ width: '16px', height: '16px' }} />
                  <input type="checkbox" checked={features.floodlights} onChange={(e) => setFeatures({...features, floodlights: e.target.checked})} />
                  <span>Floodlights</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', cursor: 'pointer' }}>
                  <img src="/assets/stadiums/feature_restrooms.png" alt="Restrooms" style={{ width: '16px', height: '16px' }} />
                  <input type="checkbox" checked={features.restrooms} onChange={(e) => setFeatures({...features, restrooms: e.target.checked})} />
                  <span>Restrooms</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', cursor: 'pointer' }}>
                  <img src="/assets/stadiums/feature_parking.png" alt="Parking" style={{ width: '16px', height: '16px' }} />
                  <input type="checkbox" checked={features.parking} onChange={(e) => setFeatures({...features, parking: e.target.checked})} />
                  <span>Parking</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', cursor: 'pointer' }}>
                  <img src="/assets/stadiums/feature_grass.png" alt="Artificial grass" style={{ width: '16px', height: '16px' }} />
                  <input type="checkbox" checked={features.grass} onChange={(e) => setFeatures({...features, grass: e.target.checked})} />
                  <span>Artificial grass</span>
                </label>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#374151', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                ABOUT
              </label>
              <textarea 
                rows={3} 
                className="search-input" 
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', lineHeight: 1.5 }} 
                placeholder="Provide details about the stadium..." 
                value={aboutText} 
                onChange={(e) => setAboutText(e.target.value)} 
              />
            </div>
          </div>
        </div>

        {/* Card 3: Stadium Photos */}
        <div className="table-card-container" style={{ padding: '1.75rem' }}>
          <div style={{ 
            fontSize: '1.05rem', 
            fontWeight: 800, 
            color: '#111827', 
            paddingBottom: '0.75rem', 
            borderBottom: '1px solid #f3f4f6',
            marginBottom: '1.25rem' 
          }}>
            Stadium Photos
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {coverPhotoPreview ? (
              <div style={{ position: 'relative', width: '100%', height: '160px', borderRadius: '12px', overflow: 'hidden' }}>
                <img src={coverPhotoPreview} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button 
                  type="button" 
                  onClick={() => setCoverPhotoPreview(null)} 
                  style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: 'white', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => coverPhotoRef.current && coverPhotoRef.current.click()}
                style={{
                  border: '2px dashed #84cc16',
                  borderRadius: '12px',
                  padding: '1.75rem',
                  textAlign: 'center',
                  background: '#fcfdfa',
                  cursor: 'pointer'
                }}
              >
                <Upload size={24} style={{ color: '#6b7280', margin: '0 auto 0.4rem auto' }} />
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>Upload Cover Photo</div>
                <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '0.1rem' }}>High resolution, min 1920x1080px</div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '1.25rem' }}>
              {galleryPhotos.map((imgSrc, idx) => (
                <div key={idx} style={{ position: 'relative', height: '160px', borderRadius: '14px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 4px 10px rgba(0,0,0,0.04)' }}>
                  <img src={imgSrc} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button 
                    type="button" 
                    onClick={() => removeGalleryPhoto(idx)}
                    style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(220, 38, 38, 0.9)', color: 'white', borderRadius: '50%', border: 'none', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    title="Remove image"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              
              <div 
                onClick={() => galleryPhotoRef.current && galleryPhotoRef.current.click()}
                title="Click to add stadium photos"
                style={{
                  height: '160px',
                  borderRadius: '14px',
                  border: '2px dashed #cbd5e1',
                  background: '#f8fafc',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#6b7280',
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
                <Plus size={30} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, marginTop: '0.35rem' }}>Add Photo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Stadium Location */}
        <div className="table-card-container" style={{ padding: '1.75rem' }}>
          <div style={{ 
            fontSize: '1.05rem', 
            fontWeight: 800, 
            color: '#111827', 
            paddingBottom: '0.75rem', 
            borderBottom: '1px solid #f3f4f6',
            marginBottom: '1.25rem' 
          }}>
            Stadium Location
          </div>

          <div style={{ height: '150px', borderRadius: '12px', overflow: 'hidden', background: '#e5e7eb', marginBottom: '1.25rem', position: 'relative' }}>
            <img src="/assets/stadiums/location_map.png" alt="Radar Location Map" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <img src="/assets/stadiums/map_pin_icon.png" alt="Pin Icon" style={{ width: '36px', height: '36px' }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#374151', textTransform: 'uppercase', marginBottom: '0.35rem' }}>GOVERNORATE</label>
                <input 
                  type="text" 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                  placeholder="e.g. Riyadh Region" 
                  value={governorate} 
                  onChange={(e) => setGovernorate(e.target.value)} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#374151', textTransform: 'uppercase', marginBottom: '0.35rem' }}>CITY</label>
                <input 
                  type="text" 
                  className="search-input" 
                  style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                  placeholder="e.g. Riyadh" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#374151', textTransform: 'uppercase', marginBottom: '0.35rem' }}>DISTRICT</label>
              <input 
                type="text" 
                className="search-input" 
                style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                placeholder="e.g. Al Olaya" 
                value={district} 
                onChange={(e) => setDistrict(e.target.value)} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#374151', textTransform: 'uppercase', marginBottom: '0.35rem' }}>FULL ADDRESS</label>
              <input 
                type="text" 
                className="search-input" 
                style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                placeholder="Street name, building number" 
                value={fullAddress} 
                onChange={(e) => setFullAddress(e.target.value)} 
              />
            </div>
          </div>
        </div>

        {/* Card 5: Pricing & Availability */}
        <div className="table-card-container" style={{ padding: '1.75rem' }}>
          <div style={{ 
            fontSize: '1.05rem', 
            fontWeight: 800, 
            color: '#111827', 
            paddingBottom: '0.75rem', 
            borderBottom: '1px solid #f3f4f6',
            marginBottom: '1.25rem' 
          }}>
            Pricing & Availability
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#374151', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                STANDARD HOURLY (EGP)
              </label>
              <input 
                type="number" 
                className="search-input" 
                style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                placeholder="0.00" 
                value={hourlyPrice} 
                onChange={(e) => setHourlyPrice(e.target.value)} 
                required 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: '#374151', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                OPERATING HOURS
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.2rem' }}>Opening Time</span>
                  <input 
                    type="time" 
                    className="search-input" 
                    style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                    value={openingTime} 
                    onChange={(e) => setOpeningTime(e.target.value)} 
                  />
                </div>

                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.2rem' }}>Closing Time</span>
                  <input 
                    type="time" 
                    className="search-input" 
                    style={{ width: '100%', paddingLeft: '0.9rem', borderRadius: '8px' }} 
                    value={closingTime} 
                    onChange={(e) => setClosingTime(e.target.value)} 
                  />
                </div>
              </div>
            </div>
          </div>
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
            onClick={() => alert('Draft saved.')}
          >
            Save as Draft
          </button>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ padding: '0.6rem 1.75rem', borderRadius: '30px', background: '#0e5c21' }}
          >
            {isEditing ? 'Save Changes' : 'Create Stadium'} <ArrowRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
