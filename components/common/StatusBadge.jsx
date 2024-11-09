import React from 'react';
import './StatusBadge.css';

const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'delivered':
        return 'status-badge delivered';
      case 'pending':
        return 'status-badge pending';
      case 'in transit':
        return 'status-badge in-transit';
      default:
        return 'status-badge unknown';
    }
  };

  return <span className={getStatusClass()}>{status}</span>;
};

export default StatusBadge;
 