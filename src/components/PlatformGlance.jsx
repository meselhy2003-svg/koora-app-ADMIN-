import React from 'react';
import { TrendingUp, Minus, AlertCircle, Clock } from 'lucide-react';

export default function PlatformGlance() {
  const metrics = [
    {
      label: 'TOTAL PLAYERS',
      value: '124,802',
      change: '+4.2%',
      type: 'positive',
      icon: TrendingUp
    },
    {
      label: 'TOTAL STADIUMS',
      value: '1,450',
      change: 'Stable',
      type: 'neutral',
      icon: Minus
    },
    {
      label: "TODAY'S BOOKINGS",
      value: '892',
      change: '+12%',
      type: 'positive',
      icon: TrendingUp
    },
    {
      label: "TODAY'S REVENUE",
      value: '$42.1k',
      change: '+8.4%',
      type: 'positive',
      icon: TrendingUp
    },
    {
      label: 'STADIUM APPROVALS',
      value: '14',
      change: 'Pending Action',
      type: 'warning',
      icon: AlertCircle
    },
    {
      label: 'PENDING REPORTS',
      value: '38',
      change: 'Due Today',
      type: 'danger',
      icon: Clock
    }
  ];

  return (
    <section className="glance-section">
      <div className="glance-header">
        <h2 className="glance-title">Platform at a Glance</h2>
        <p className="glance-subtitle">
          Real-time performance metrics synchronized across the entire KORA global infrastructure.
        </p>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, idx) => {
          const IconComp = metric.icon;
          return (
            <div key={idx} className="metric-card">
              <div className="metric-label">{metric.label}</div>
              <div className="metric-value">{metric.value}</div>
              <div className={`metric-change ${metric.type}`}>
                <IconComp size={12} />
                <span>{metric.change}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
