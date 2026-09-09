import React from 'react';
import { User, Building2, Users, ClipboardCheck, ArrowRight } from 'lucide-react';

export default function EcosystemGrid({ onNavigate, userRole = 'admin' }) {
  const isManager = userRole === 'manager';
  const isRepresentative = userRole === 'representative';

  const allCards = [
    {
      id: 'players',
      tag: 'GLOBAL DATABASE',
      icon: User,
      title: 'Players',
      description: 'Manage player accounts, profiles, verification and reports with advanced filtering and identity resolution.',
      buttonText: 'Manage Players',
      image: '/assets/landing/card_stadiums.png'
    },
    {
      id: 'stadiums',
      tag: 'FACILITY OPERATIONS',
      icon: Building2,
      title: 'Stadium Owners',
      description: 'Manage stadium owners, approval workflows and venue information across assigned operational districts.',
      buttonText: 'Manage Stadiums',
      image: '/assets/landing/card_players.png'
    },
    {
      id: 'managers',
      tag: 'HIERARCHICAL CONTROL',
      icon: Users,
      title: 'Representatives Managers',
      description: 'Manage regional managers, granular permissions and assigned representative teams for operational excellence.',
      buttonText: 'Manage Managers',
      image: '/assets/landing/card_managers.png',
      adminOnly: true
    },
    {
      id: 'representatives',
      tag: 'FIELD OPERATIONS',
      icon: ClipboardCheck,
      title: 'Field Inspections',
      description: 'Log stadium inspection reports, pitch condition verifications, venue visits and operational task statuses.',
      buttonText: 'Inspect Venues',
      image: '/assets/landing/card_representatives.png'
    }
  ];

  let cards = allCards;
  if (isManager) {
    cards = allCards.filter(c => !c.adminOnly);
  } else if (isRepresentative) {
    cards = allCards.filter(c => c.id === 'stadiums');
  }

  const getSectionTitle = () => {
    if (isRepresentative) return 'Representative Stadium Operations';
    if (isManager) return 'Manager Operations Ecosystem';
    return 'Core Management Ecosystem';
  };

  const getSectionSubtitle = () => {
    if (isRepresentative) return 'Stadium owners management, pitch monitoring and venue operational tools for field representatives.';
    if (isManager) return 'Operational management and monitoring tools for your assigned manager environment.';
    return 'Advanced administrative control for every segment of the platform.';
  };

  return (
    <section style={{ marginBottom: '3.5rem' }}>
      <div className="section-header">
        <div>
          <h2 className="section-title">{getSectionTitle()}</h2>
          <p className="section-subtitle">{getSectionSubtitle()}</p>
        </div>
        <button 
          className="section-action"
          onClick={() => onNavigate('stadiums')}
        >
          Explore Module <ArrowRight size={16} />
        </button>
      </div>

      <div className="ecosystem-grid">
        {cards.map((card) => {
          const IconComp = card.icon;
          return (
            <div key={card.id} className="ecosystem-card">
              <div className="card-image-wrap">
                <img src={card.image} alt={card.title} />
              </div>
              <div className="card-content">
                <div>
                  <div className="card-tag">
                    <IconComp size={14} className="card-tag-icon" />
                    <span>{card.tag}</span>
                  </div>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                </div>
                <button 
                  className="btn-secondary-outline"
                  onClick={() => onNavigate('stadiums')}
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
