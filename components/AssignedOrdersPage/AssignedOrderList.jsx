import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AssignedOrderList.css';
import StatusBadge from '../common/StatusBadge';

const AssignedOrderList = ({ orders = [] }) => {  // default to empty array

  AssignedOrderList.propTypes = {
    orders: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        pickupLocation: PropTypes.string.isRequired,
        dropOffLocation: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        // Include other relevant fields
      })
    ),
  };
  // Initialize orderStatuses state outside of conditional logic
  const [orderStatuses, setOrderStatuses] = useState([]);

  useEffect(() => {
    setOrderStatuses(
      orders.map(order => ({ ...order, accepted: false }))
    );
  }, [orders]);

  // Now, add the early return below the hook initialization
  if (!orders || orders.length === 0) {
    return <div>No assigned orders available.</div>;
  }

  const handleAccept = async (orderId) => {
    // Optionally, show a loading state
    try {
      // Make an API call to accept the order
      await acceptOrderAPI(orderId);
      setOrderStatuses(
        orderStatuses.map(order =>
          order.id === orderId ? { ...order, accepted: true } : order
        )
      );
    } catch (error) {
      // Handle error (e.g., show a notification)
    }
  };
  

  const handleDecline = async (orderId) => {
    try {
      await declineOrderAPI(orderId);
      setOrderStatuses(
        orderStatuses.filter(order => order.id !== orderId)
      );
    } catch (error) {
      // Handle error
    }
  };
  

  // Status Indicator function
  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return { color: 'orange', label: 'Pending' };
      case 'in transit':
        return { color: 'blue', label: 'In Transit' };
      case 'delivered':
        return { color: 'green', label: 'Delivered' };
      default:
        return { color: 'gray', label: 'Unknown' };
    }
  };

  const acceptOrderAPI = async (orderId) => {
  const response = await fetch(`/api/orders/accept/${orderId}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to accept order');
  }
  return response.json();
};

const declineOrderAPI = async (orderId) => {
  const response = await fetch(`/api/orders/decline/${orderId}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to decline order');
  }
  return response.json();
};


  return (
    <div className="assigned-orders-container">
      <h2 className="assigned-orders-header">Assigned Orders</h2>
      <ul>
        {orderStatuses.map(order => {
          const { color, label } = getStatusStyle(order.status);
          return (
            <li key={order.id} className="order-card">
              <h3>Order ID: {order.id}</h3>
              <p>Pickup Location: {order.pickupLocation}</p>
              <p>Drop-off Location: {order.dropOffLocation}</p>
              <div className="order-status-indicator" style={{ color }}>
              Status: {label}
              </div>
              <div className="button-container">
                {!order.accepted ? (
                  <>
                    <button className="accept-button" onClick={() => handleAccept(order.id)}>Accept</button>
                    <button className="decline-button" onClick={() => handleDecline(order.id)}>Decline</button>
                  </>
                ) : (
                  <p>Order Accepted</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AssignedOrderList;
