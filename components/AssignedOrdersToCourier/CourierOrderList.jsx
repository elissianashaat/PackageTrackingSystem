import React from 'react';
import PropTypes from 'prop-types';
import StatusBadge from '../common/StatusBadge';

import './CourierOrderList.css';

const CourierOrderList = ({ assignedOrders, onReassignOrder }) => {

  CourierOrderList.propTypes = {
    assignedOrders: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        pickupLocation: PropTypes.string.isRequired,
        dropOffLocation: PropTypes.string.isRequired,
        courierName: PropTypes.string.isRequired,
      })
    ),
    onReassignOrder: PropTypes.func.isRequired,
  };

  if (!assignedOrders || assignedOrders.length === 0) {
    return <div>No orders assigned to couriers.</div>;
  }

  const handleReassignOrder = (orderId) => {
    // Make API call or dispatch action here
    onReassignOrder(orderId);
  };

  
  
  return (
    <div className="assigned-orders-to-courier-container">
      <h2>Assigned Orders to Courier</h2>
      <ul className="assigned-orders-list">
        {assignedOrders.map(order => (
          <li key={order.id} className="assigned-order-card">
            <h3>Order ID: {order.id}</h3>
            <p>Pickup Location: {order.pickupLocation}</p>
            <p>Drop-off Location: {order.dropOffLocation}</p>
            <p>Assigned Courier: {order.courierName}</p>

            <StatusBadge status={order.status} />
            <button 
              className="reassign-button" 
              onClick={() => onReassignOrder(order.id)}
            >
              Reassign Order
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourierOrderList;
