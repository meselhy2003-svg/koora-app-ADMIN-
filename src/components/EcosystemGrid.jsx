import React from 'react';
import { User, Building2, Users, ClipboardCheck, ArrowRight } from 'lucide-react';

export default function EcosystemGrid({ onNavigate }) {
  const cards = [
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
      description: 'Manage stadium owners, approval workflows and venue information across multiple regions and jurisdictions.',
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
      image: '/assets/landing/card_managers.png'
    },
    {
      id: 'representatives',
      tag: 'FIELD OPERATIONS',
      icon: ClipboardCheck,
      title: 'Representatives',
      description: 'Manage field representatives, real-time inspection logs, field visits and dynamic task assignments globally.',
      buttonText: 'Manage Representatives',
      image: '/assets/landing/card_representatives.png'
    }
  ];

  return (
    <section style={{ marginBottom: '3.5rem' }}>
      <div className="section-header">
        <div>
          <h2 className="section-title">Core Management Ecosystem</h2>
          <p className="section-subtitle">
            Advanced administrative control for every segment of the platform.
          </p>
        </div>
        <button 
          className="section-action"
          onClick={() => onNavigate('players')}
        >
          Explore All Modules <ArrowRight size={16} />
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
                  onClick={() => onNavigate(card.id)}
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
