import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge'; // Assuming StatusBadge is in common components folder
import './MyOrders.css';

const MyOrders = ({ orders }) => {
  return (
    <div className="my-orders-container">
      <h2>My Orders</h2>
      <ul className="orders-list">
        {orders.map((order) => (
          <li key={order.id} className="order-item">
            <p>Order ID: {order.id}</p>
            <p>Pickup Location: {order.pickupLocation}</p>
            <p>Drop-off Location: {order.dropOffLocation}</p>
            <p>
              Status: <StatusBadge status={order.status} /> {/* Display status with StatusBadge */}
            </p>
            <Link to={`/order-details/${order.id}`} className="view-details-link">
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;
